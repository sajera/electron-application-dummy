// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import layoutStore from '../../store'
import { WINDOW } from '../../navigation'
import toast from '../../../component/toast'
import { FormData } from '../../../component/form'
import { delayResolve } from '../../../../service'


const initial = {
  title: 'Window',
  height: '',
  width: '',
  frame: true,
  show: true,
  closable: true,
  fullscreenable: true,
  resizable: true,
  minimizable: true,
  maximizable: true
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
    this.form.initialize(initial)
    console.info(`%c WindowDetailsStore.initialize ${id}`, 'color: #FF6766; font-weight: bolder;'
      , '\n initialized:', this.initialized
      , '\n id:', id
    )

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
    return preload.windowExplorer('get-window-state-by-id', this.id)
      .then(details => runInAction(() => this.details = details))
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

    return Promise.all([
      delayResolve(4e2),
      preload.windowExplorer(isNew ? 'create-window' : 'update-window', { id: this.id, ...values })
    ])
      .then(([, data]) => {
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


    console.log(`%c validate `, 'color: #FF6766; font-weight: bolder;'
      , '\n values:', values
      , '\n errors:', errors
    )

    return errors
  }
}

export const windowDetailsStore = new WindowDetailsStore()
export default windowDetailsStore


class WindowModel {
  execute = null

  constructor (execute) {
    this.execute = execute
  }

  getById = $id => this.execute('SELECT * FROM windows where id = $id', { $id })

  insert = () => this.execute(`
    INSERT INTO table_name (column1, column2, ...)
    VALUES (value1, value2, ...)
  `)

  update = () => this.execute(`
    UPDATE table_name
    SET email = 'alice_new@example.com'
    WHERE id = 1
  `)

}
