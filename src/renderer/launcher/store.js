// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../component/toast'
import { delayResolve } from '../../service'
import { navigationMenu } from './navigation'
import { ToggleStore, ThemeStore } from './local-storage'

class LayoutStore {
  menu = navigationMenu

  theme = null
  themes = [
    'default-theme',
    'cdt-theme',
    'wedgewood-theme',
    'vesuvius-theme',
    'mantis-theme',
    'wisteria-theme',
    'portage-theme',
    'contessa-theme',
    'amaranth-theme',
    'lne-theme',
  ]

  isDarkModeEnabled = false
  isSidebarHidden = false
  initialized = false

  constructor () {
    makeAutoObservable(this)
  }

  toggleSideBar = () => ToggleStore.update({ nav: this.isSidebarHidden = !this.isSidebarHidden })

  setTheme = theme => {
    if (!_.includes(this.themes, theme)) return this.errorHandler('Theme')(`Theme setup failed: '${theme}' is invalid.`)
    ThemeStore.set(theme)
    document.getElementsByTagName('html')[0].id = theme
  }

  setDarkMode = isDarkTheme => {
    ToggleStore.update({ dark: this.isDarkModeEnabled = Boolean(isDarkTheme) })
    const html = document.getElementsByTagName('html')[0].classList
    isDarkTheme ? html?.add('dark') : html?.remove('dark')
  }

  errorHandler = header => ({ message }) => toast.error(message, header)

  initialize = () => {
    this.initialized = false
    this.setTheme(ThemeStore.get())
    this.setDarkMode(ToggleStore.get()?.dark)
    this.isSidebarHidden = Boolean(ToggleStore.get()?.nav)
    const toastId = toast.info('test')
    process.env.DEBUG && console.info('%c LayoutStore.launcher ', 'color: #FF6766; font-weight: bolder;'
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
