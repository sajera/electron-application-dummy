// outsource dependencies
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../../../component/toast'
import { FormData } from '../../../component/form'
import { delayResolve } from '../../../../service'
import { SQLLightPageLS } from '../../local-storage'

const initial = {
  query: 'SELECT * from ',
}

class SQLLightPageStore {
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
    this.form.initialize(SQLLightPageLS.get() || initial)
    // NOTE record query on page out
    return () => SQLLightPageLS.set(this.form.value)
  }

  clear = () => this.form.initialize(initial)

  submit = data => {
    // NOTE setup as initial
    this.form.initialize(data)
    this.disabled.set('sql', true)
    // NOTE returns toastId
    return delayResolve(3e3)
      .then(response => runInAction(() => {
        console.log(`%c SQLLightPageStore ${'submit'} `, 'color: #FF6766; font-weight: bolder;'
          , '\n response:', response
          , '\n data:', data
        )
      }))
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

export const sqlLightPageStore = new SQLLightPageStore()
export default sqlLightPageStore
