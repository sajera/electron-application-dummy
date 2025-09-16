// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import layoutStore from '../../store'
import { WINDOW } from '../../navigation'
import toast from '../../../component/toast'
import { FormData } from '../../../component/form'
import { delayResolve } from '../../../../service'
import { confirm } from '../../../component/confirm'

// configure
export const TAB = {
  FORM: 'Options',
  TEACH: 'Teach',
  USE: 'Use',
}
const initial = {
  name: 'AI Model ',

}

class AIDetailsStore {
  errorMessage = null
  initialized = false
  disabled = new Map()

  selectedTab = null

  id = null
  details = null

  constructor () {
    this.form = new FormData(initial, this.validate, this.submit)
    makeAutoObservable(this)
  }

  clearError = () => this.errorMessage = null

  errorHandler = header => ({ message = 'Something went wrong here' }) => {
    toast.error(message, header)
    // NOTE provide error into page
    runInAction(() => this.errorMessage = `${header}: ${message}`)
  }

  setTab = tab => this.selectedTab = tab

  initialize = id => {
    this.id = id
    // NOTE cleanup
    this.clearError()
    this.details = null
    this.initialized = !id
    this.form.initialize(initial)
    this.setTab(id ? TAB.TEACH : TAB.FORM)
    if (!id) return
    // console.log(`%c AIDetailsStore.initialize ${id}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n isNew:', !id
    //   , '\n details:', this.details
    // )
    // NOTE load
    Promise.all([
      delayResolve(6e2),
      this.refreshForm(),
      // this.refreshDetails(),
    ])
      .then(() => {
        // NOTE infinity loop with checking state each 6s
        clearInterval(this.interval)
        // this.interval = setInterval(this.refreshDetails, 6e3)
      })
      .catch(this.errorHandler('Initialization'))
      .finally(() => runInAction(() => this.initialized = true))

    // NOTE unmount
    return () => {
      clearInterval(this.interval)
    }
  }

  remove = () => confirm({
    silence: true,
    destructive: true,
    mark: this.details?.options?.title,
    title: `Confirm the deletion of the window ${this.details?.options?.title || ''}`,
    message: `Please confirm the deletion of the window "${this.details?.options?.title || ''}". This action cannot be undone, and the window will no longer be available. Make sure this action is necessary before proceeding.`,
  }).then(() => runInAction(() => {
    this.disabled.set('remove', true)

    return preload.windowExplorer('remove-window-by-id', this.id)
      .then(() => WINDOW.DETAILS.PUSH())
      .then(layoutStore.refineNavigation)
      .catch(this.errorHandler('Removing window'))
      .finally(() => runInAction(() => this.disabled.set('remove', false)))
  }))

  // refreshDetails = () => {
  //   this.disabled.set('details', true)
  //   return preload.ai('get-details-by-id', this.id)
  //     .then(data => runInAction(() => this.details = data))
  //     .catch(this.errorHandler('Get window state'))
  //     .finally(() => runInAction(() => this.disabled.set('details', false)))
  // }

  refreshForm = () => {
    this.disabled.set('form', true)
    return preload.windowExplorer('get-details-by-id', this.id)
      .then(data => this.form.initialize(data))
      .catch(this.errorHandler('Get window details'))
      .finally(() => runInAction(() => this.disabled.set('form', false)))
  }

  submit = values => {
    this.clearError()
    const isNew = !this.id
    this.disabled.set('form', true)
    console.log(`%c AIDetailsStore.submit ${this.id} `, 'color: #FF6766; font-weight: bolder;'
      , '\n values:', values
    )

    return preload.ai(isNew ? 'create-model' : 'update-model', { id: this.id, ...values })
      .then(data => delayResolve(6e2, data))
      .then(data => {
        console.log(`%c AIDetailsStore.submit.then ${this.id} `, 'color: #FF6766; font-weight: bolder;'
          , '\n data:', data
        )
        // NOTE reload the page
        if (isNew) {
          WINDOW.DETAILS.REPLACE({ id: data.id })
          return layoutStore.refineNavigation()
        }
        return Promise.all([
          this.refreshForm(),
          // this.refreshDetails(),
        ])
      })
      .catch(this.errorHandler('Updating window'))
      .finally(() => runInAction(() => this.disabled.set('form', false)))
  }

  validate = values => {
    const errors = {}

    if (!values.name) {
      errors.name = 'The Title of the window is mandatory'
    }

    // console.log('%c validate ', 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', errors
    // )

    return errors
  }
}

export const aiDetailsStore = new AIDetailsStore()
export default aiDetailsStore
