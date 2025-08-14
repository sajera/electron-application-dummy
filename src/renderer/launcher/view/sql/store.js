// outsource dependencies
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../../../component/toast'
import { SQLPageLS } from '../../local-storage'
import { FormData } from '../../../component/form'

const initial = {
  query: 'SELECT * from users',
}

class SQLPageStore {
  data = null
  errorMessage = null
  disabled = new Map()

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

  initialize = () => {
    // NOTE restore latest query
    this.form.initialize(SQLPageLS.get() || initial)
    // NOTE record query on page out
    return () => SQLPageLS.set(this.form.value)
  }

  clear = () => this.form.initialize(initial)

  submit = data => {
    this.clearError()
    this.disabled.set('sql', true)

    // console.log(`%c SQLPageStore ${'submit'} `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n data.query:', data.query
    // )

    return preload.sqlite(data.query, {})
      .then(data => runInAction(() => this.data = data))
      .catch(this.errorHandler('SQL Lite query execution'))
      .finally(() => runInAction(() => this.disabled.set('sql', false)))
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

export const sqlPageStore = new SQLPageStore()
export default sqlPageStore
