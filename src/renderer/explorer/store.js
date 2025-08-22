// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../component/toast'
import { delayResolve } from '../../service'

class ExplorerStore {
  errorMessage = null
  initialized = false
  disabled = new Map()

  id = null
  logs = []
  details = null

  constructor () {
    makeAutoObservable(this)
  }

  clearError = () => this.errorMessage = null

  errorHandler = header => ({ message = 'Something went wrong here' }) => {
    toast.error(message, header)
    // NOTE provide error into page
    runInAction(() => this.errorMessage = `${header}: ${message}`)
  }

  // NOTE pretty unsafe but simple to use
  selfAct = (...args) => preload.windowExplorer('act-self', ...args)
    .catch(this.errorHandler('Get Debug Info'))

  close = () => {
    this.disabled.set('close', true)
    return preload.windowExplorer('act-self', 'close')
      .catch(this.errorHandler('Closing window'))
      .finally(() => runInAction(() => this.disabled.set('close', false)))
  }

  refreshDetails = () => {
    this.disabled.set('details', true)
    return preload.windowExplorer('get-window-details-by-id', this.id)
      .then(data => runInAction(() => this.details = data))
      .catch(this.errorHandler('Get window state'))
      .finally(() => runInAction(() => this.disabled.set('details', false)))
  }

  getSelfId = () => preload.windowExplorer('get-self-runtime-id')
    .then(id => runInAction(() => this.id = id))
    .catch(this.errorHandler('Get self ID'))

  initialize = () => {
    this.initialized = false
    // TODO get self id
    console.info(`%c ExplorerStore.initialize ${this.id} `, 'color: #FF6766; font-weight: bolder;'
      , '\n sid:', process.env.SID
      , '\n preload:', preload
    )
    Promise.all([
      this.getSelfId(),
      delayResolve(3e2),
    ])
      .then(this.refreshDetails)
      .then(() => {
        // NOTE infinity loop with checking state each 5min
        clearInterval(this.interval)
        this.interval = setInterval(this.refreshDetails, 3e5)
      })
      .catch(this.errorHandler('Layout initialization'))
      .finally(() => runInAction(() => this.initialized = true))

    // NOTE unmount
    return () => clearInterval(this.interval)
  }

  // TODO get "logs" from "main"
}

export const explorerStore = new ExplorerStore()
export default explorerStore
