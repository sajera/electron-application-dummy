// outsource dependencies
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import { FormData } from '../form'

class PromptStore {
  options = {
    silence: true,
    destructive: false,
    closeOnEscape: true,
  }

  isOpen = false

  constructor () {
    makeAutoObservable(this)
    this.form = new FormData({ width: 100, height: 100 }, this.validate, this.submit)
  }

  rejectPrompt = () => {
    const { reject, onReject } = this.options
    typeof reject === 'function' && reject(Object.assign({}, this.options))
    typeof onReject === 'function' && onReject(Object.assign({}, this.options))
    this.isOpen = false
  }

  submit = values => {
    this.isOpen = false
    const { resolve, onResolve } = this.options
    typeof resolve === 'function' && resolve(Object.assign({}, this.options, values))
    typeof onResolve === 'function' && onResolve(Object.assign({}, this.options, values))
  }

  validate = values => typeof this.options.validate === 'function' && this.options.validate(values)

  /**
   * {
   *     silence: true,
   *     destructive: true,
   *     closeOnEscape: false,
   *     closeOnBackdrop: false,
   *     title: 'Confirm',
   *     mark: safeRegExp(this.selected?.name || 'current', 'gi', true),
   *     message: `The ${this.selected?.name || 'current'} domain will be removed. Please make sure the action is mandatory.`,
   *   }
   * @param options
   * @returns {Promise<unknown>}
   */
  promptAction = options => {
    if (this.isOpen) {
      console.error('Detected opening the confirmation twice at same moment', this.options, options)
      this.rejectPrompt()
    }
    // IMPORTANT will remove component and trigger exit from use effect of modal
    return new Promise((resolve, reject) => runInAction(() => {
      this.isOpen = true
      this.form.initialize(options?.initial || {})
      // NOTE simulate "deferred" object using promise
      this.options = { ...options, resolve, reject: options.silence ? null : reject }
    }))
  }

}

export const store = new PromptStore()
export default store
