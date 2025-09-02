// outsource dependencies
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../../../component/toast'

class AIImagePageStore {
  initialized = true
  errorMessage = null
  disabled = new Map()

  data = null
  dataUrl = null

  constructor () {
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
    this.initialized = Boolean(this.dataUrl)

    !this.initialized && this.generate()
      // .then(() => runInAction(() => {
      //   console.info('%c WindowListStore.initialize ', 'color: #FF6766; font-weight: bolder;'
      //     , '\n list:', _.size(this.list)
      //     , '\n sample:', { ..._.sample(this.list) }
      //     , '\n filters:', { ...this.form.value }
      //   )
      // }))
      .catch(this.errorHandler('Initialization'))
      .finally(() => runInAction(() => this.initialized = true))

    // NOTE record query on page out
    return () => {

    }
  }

  generate = values => {
    this.clearError()
    this.disabled.set('generate', true)

    console.log(`%c AIImagePageStore ${'generate'} `, 'color: #FF6766; font-weight: bolder;'
      , '\n values:', { ...values }
    )
    // NOTE no parameters for now
    return preload.ai('get-random-image', {})
      .then(dataUrl => runInAction(() => {
        this.dataUrl = dataUrl
        console.log(`%c AIImagePageStore.generate ${'output'} `, 'color: #FF6766; font-weight: bolder;'
          , '\n dataUrl:', dataUrl
        )
      }))
      .catch(this.errorHandler('Image Generation'))
      .finally(() => runInAction(() => this.disabled.set('generate', false)))
  }

}

export const aiImagePageStore = new AIImagePageStore()
export default aiImagePageStore
