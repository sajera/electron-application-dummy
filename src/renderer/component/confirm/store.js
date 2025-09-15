// outsource dependencies
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies


class ConfirmationStore {
  confirm = {
    silence: true,
    isOpen: false,
    closeOnEscape: true,
    destructive: false,
  }

  constructor () {
    makeAutoObservable(this)
  }

  rejectConfirm = () => {
    const { reject, onReject } = this.confirm
    typeof reject === 'function' && reject(Object.assign({}, this.confirm))
    typeof onReject === 'function' && onReject(Object.assign({}, this.confirm))
    this.confirm.isOpen = false
  }

  resolveConfirm = data => {
    const { resolve, onResolve } = this.confirm
    typeof resolve === 'function' && resolve(Object.assign({}, this.confirm, data))
    typeof onResolve === 'function' && onResolve(Object.assign({}, this.confirm, data))
    this.confirm.isOpen = false
  }

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
  confirmAction = options => {
    if (this.confirm.isOpen) {
      console.error('Detected opening the confirmation twice at same moment', this.confirm, options)
      this.rejectConfirm()
    }
    // IMPORTANT will remove component and trigger exit from use effect of modal
    return new Promise((resolve, reject) => runInAction(() => {
      // NOTE simulate "deferred" object using promise
      this.confirm = { ...options, isOpen: true, resolve, reject: options.silence ? null : reject }
    }))
  }

}

export const store = new ConfirmationStore()
export default store
