// outsource dependencies
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../component/toast'
import { delayResolve } from '../../service'
import { ToggleStore } from './local-storage'
import { navigationMenu } from './navigation'

class LayoutStore {
  menu = navigationMenu

  isDarkModeEnabled = false
  isSidebarHidden = false
  initialized = false

  constructor () {
    makeAutoObservable(this)
  }

  toggleSideBar = () => ToggleStore.update({ nav: this.isSidebarHidden = !this.isSidebarHidden })

  setDarkMode = isDarkTheme => {
    ToggleStore.update({ dark: this.isDarkModeEnabled = Boolean(isDarkTheme) })
    const html = document.getElementsByTagName('html')[0].classList
    isDarkTheme ? html?.add('dark') : html?.remove('dark')
  }

  errorHandler = header => ({ message }) => toast.error(message, header)

  initialize = () => {
    this.initialized = false
    this.setDarkMode(ToggleStore.get()?.dark)
    this.isSidebarHidden = Boolean(ToggleStore.get()?.nav)

    const toastId = toast.info('test')
    process.env.DEBUG && console.info('%c LayoutStore.initialize ', 'color: #FF6766; font-weight: bolder;'
      , '\n ToggleStore:', ToggleStore.get()
      , '\n toastId:', toastId
      , '\n sid:', process.env.SID
      , '\n preload:', preload
      , '\n menu:', navigationMenu
    )

    // TODO get read stored data and apply to menu
    this.menu = navigationMenu

    // TODO do async things
    Promise.all([
      delayResolve(300),
      // API('/something-important'),
    ])
      .then(([a]) => runInAction(() => {
    //     console.log('%c LayoutStore.initialize ', 'color: #FF6766; font-weight: bolder;'
    //       , '\n environment:', environment
    //     )
    //     // NOTE infinity loop with checking session state each 5min
    //     clearInterval(this.interval)
    //     this.interval = setInterval(this.checkAuth, 3e5)
      }))
      .catch(this.errorHandler('CDT Layout initialization'))
      .finally(() => runInAction(() => this.initialized = true))
    // NOTE unmount
    return () => runInAction(() => { })
  }
}

export const layoutStore = new LayoutStore()
export default layoutStore
