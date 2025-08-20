// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import layoutStore from '../../store'
import { WINDOW } from '../../navigation'
import toast from '../../../component/toast'
import { FormData } from '../../../component/form'
import { delayResolve } from '../../../../service'

// configure
const initial = {
  title: 'Window',
  frame: true,
  show: true,
  closable: true,
  kiosk: false,

  backgroundColor: '',
  opacity: 0.01,
  transparent: false,
  zoomFactor: '',

  alwaysOnTop: false,
  x: '',
  y: '',
  center: false,

  fullscreen: false,
  fullscreenable: true,
  resizable: true,
  minimizable: true,
  maximizable: true,

  width: '',
  defaultWidth: '',
  minWidth: '',
  maxWidth: '',

  height: '',
  defaultHeight: '',
  minHeight: '',
  maxHeight: '',
}

class WindowDetailsStore {
  errorMessage = null
  initialized = false
  disabled = new Map()

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

  initialize = id => {
    this.id = id
    this.initialized = !id
    // NOTE cleanup
    this.clearError()
    this.details = null
    this.form.initialize(initial)
    // console.log(`%c WindowDetailsStore.initialize ${id}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n isNew:', !id
    //   , '\n details:', this.details
    // )

    if (id) {
      // NOTE load
      Promise.all([
        delayResolve(6e2),
        this.refreshForm(),
        this.refreshDetails(),
      ])
        .catch(this.errorHandler('Initialization'))
        .finally(() => runInAction(() => this.initialized = true))
    }

    // NOTE unmount
    // return () => {}
  }

  open = () => {
    this.disabled.set('open', true)
    return preload.windowExplorer('start-runtime-by-id', this.id)
      .then(this.refreshDetails)
      .catch(this.errorHandler('Open window'))
      .finally(() => runInAction(() => this.disabled.set('open', false)))
  }


  close = () => {
    this.disabled.set('close', true)
    return preload.windowExplorer('stop-runtime-by-id', this.id)
      .then(this.refreshDetails)
      .catch(this.errorHandler('Close window'))
      .finally(() => runInAction(() => this.disabled.set('close', false)))
  }

  remove = () => {
    this.disabled.set('remove', true)
    return preload.windowExplorer('remove-window-by-id', this.id)
      .then(() => WINDOW.DETAILS.PUSH())
      .then(layoutStore.refineNavigation)
      .catch(this.errorHandler('Removing window'))
      .finally(() => runInAction(() => this.disabled.set('remove', false)))
  }

  refreshDetails = () => {
    this.disabled.set('details', true)
    return preload.windowExplorer('get-window-details-by-id', this.id)
      .then(data => runInAction(() => this.details = data))
      .catch(this.errorHandler('Get window state'))
      .finally(() => runInAction(() => this.disabled.set('details', false)))
  }

  refreshForm = () => {
    this.disabled.set('form', true)
    return preload.windowExplorer('get-window-by-id', this.id)
      .then(data => this.form.initialize(data))
      .catch(this.errorHandler('Get window details'))
      .finally(() => runInAction(() => this.disabled.set('form', false)))
  }

  submit = values => {
    this.clearError()
    const isNew = !this.id
    this.disabled.set('form', true)
    console.log(`%c WindowDetailsStore.submit ${this.id} `, 'color: #FF6766; font-weight: bolder;'
      , '\n values:', values
    )

    return preload.windowExplorer(isNew ? 'create-window' : 'update-window', { id: this.id, ...values })
      .then(data => delayResolve(6e2, data))
      .then(data => {
        console.log(`%c WindowDetailsStore.submit.then ${this.id} `, 'color: #FF6766; font-weight: bolder;'
          , '\n data:', data
        )
        // NOTE reload the page
        if (isNew) {
          WINDOW.DETAILS.REPLACE({ id: data.id })
          return layoutStore.refineNavigation()
        }
        return Promise.all([
          this.refreshForm(),
          this.refreshDetails(),
        ])
      })
      .catch(this.errorHandler('Updating window'))
      .finally(() => runInAction(() => this.disabled.set('form', false)))
  }

  validate = values => {
    const errors = {}

    if (!values.title) {
      errors.title = 'The Title of the window is mandatory'
    }

    if (values.width && values.width < 64) {
      errors.width = 'The "width" cant be less than 64'
    }

    if (values.defaultWidth && values.defaultWidth < 64) {
      errors.defaultWidth = 'The "defaultWidth" cant be less than 64'
    }
    if (values.maxWidth && values.maxWidth < 64) {
      errors.maxWidth = 'The "max-width" cant be less than 64'
    }

    if (values.minWidth && values.minWidth < 64) {
      errors.minWidth = 'The "min-width" cant be less than 64'
    }

    if (values.height && values.height < 48) {
      errors.height = 'The "height" cant be less than 48'
    }

    if (values.defaultHeight && values.defaultHeight < 48) {
      errors.defaultHeight = 'The "defaultHeight" cant be less than 48'
    }

    if (values.minHeight && values.minHeight < 48) {
      errors.minHeight = 'The "min-height" cant be less than 48'
    }

    if (values.maxHeight && values.maxHeight < 48) {
      errors.maxHeight = 'The "max-height" cant be less than 48'
    }

    // console.log('%c validate ', 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', errors
    // )

    return errors
  }
}

export const windowDetailsStore = new WindowDetailsStore()
export default windowDetailsStore
