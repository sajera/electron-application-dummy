// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../../../component/toast'
import { WindowListLS } from '../../local-storage'
import { FormData } from '../../../component/form'
import { delayResolve } from '../../../../service'

const initial = {
  $size: 10,
  // page: 0,
}

class WindowListStore {
  list = null
  errorMessage = null
  initialized = false
  disabled = new Map()

  constructor () {
    this.form = new FormData(initial, this.validate, this.refreshData)
    makeAutoObservable(this)
  }

  clearError = () => this.errorMessage = null

  errorHandler = header => ({ message = 'Something went wrong here' }) => {
    toast.error(message, header)
    // NOTE provide error into page
    runInAction(() => this.errorMessage = `${header}: ${message}`)
  }

  initialize = () => {
    this.initialized = _.isEmpty(this.list)
    // NOTE extract latest selected filters
    this.form.initialize(WindowListLS.get() || initial)

    Promise.all([
      delayResolve(3e3),
      this.refreshData()
    ])
      .then(() => runInAction(() => {
        console.info('%c WindowListStore.initialize ', 'color: #FF6766; font-weight: bolder;'
          , '\n list:', _.size(this.list)
          , '\n sample:', { ..._.sample(this.list) }
          , '\n filters:', { ...this.form.value }
        )
      }))
      .catch(this.errorHandler('Initialization'))
      .finally(() => runInAction(() => this.initialized = true))

    // NOTE save filters on page live
    return () => WindowListLS.set(this.form.value)
  }

  clear = () => this.form.initialize(initial)

  refreshData = () => {
    this.clearError()
    this.disabled.set('list', true)
    // const { page, size } = this.form.value
    const queryVars = { ...this.form.value }
    console.log(`%c WindowListStore ${'refreshData'} `, 'color: #FF6766; font-weight: bolder;'
      , '\n queryVars:', queryVars
    )
    // TODO
    return preload.sqlite(`SELECT * FROM windows
      LIMIT $size
    `, queryVars)
      .then(data => runInAction(() => this.list = data))
      .catch(this.errorHandler('Get windows'))
      .finally(() => runInAction(() => this.disabled.set('list', false)))
  }

  validate = values => {
    const errors = {}

    if (!values.query) {
      errors.query = 'The SQL query is mandatory.'
    }

    // console.log(`%c validate `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', values
    //   , '\n errors:', errors
    // )

    return errors
  }
}

export const windowListStore = new WindowListStore()
export default windowListStore
