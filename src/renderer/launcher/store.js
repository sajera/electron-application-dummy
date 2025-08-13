// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../component/toast'
import { delayResolve } from '../../service'
import { navigationMenu } from './navigation'
import { ToggleLS, ThemeLS } from './local-storage'

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

  debugInfo = null

  constructor () {
    makeAutoObservable(this)
  }

  toggleSideBar = () => ToggleLS.update({ nav: this.isSidebarHidden = !this.isSidebarHidden })

  setTheme = theme => {
    if (!_.includes(this.themes, theme)) return this.errorHandler('Theme')(`Theme setup failed: '${theme}' is invalid.`)
    ThemeLS.set(theme)
    document.getElementsByTagName('html')[0].id = theme
  }

  setDarkMode = isDarkTheme => {
    ToggleLS.update({ dark: this.isDarkModeEnabled = Boolean(isDarkTheme) })
    const html = document.getElementsByTagName('html')[0].classList
    isDarkTheme ? html?.add('dark') : html?.remove('dark')
  }

  errorHandler = header => ({ message }) => toast.error(message, header)

  initialize = () => {
    this.initialized = false
    this.setTheme(ThemeLS.get())
    this.setDarkMode(ToggleLS.get()?.dark)
    this.isSidebarHidden = Boolean(ToggleLS.get()?.nav)
    process.env.DEBUG && console.info('%c LayoutStore.launcher ', 'color: #FF6766; font-weight: bolder;'
      , '\n ToggleLS:', ToggleLS.get()
      , '\n sid:', process.env.SID
      , '\n preload:', preload
      , '\n menu:', navigationMenu
    )

    // TODO get read stored data and apply to menu
    this.menu = navigationMenu

    // TODO do async things
    Promise.all([
      delayResolve(300),
      preload.getDebugInfo(),
      // API('/something-important'),
    ])
      .then(([, debugInfo]) => runInAction(() => {
        this.debugInfo = debugInfo
        console.log('%c LayoutStore.initialize', 'color: #FF6766; font-weight: bolder;'
          , '\n debugInfo:', debugInfo
        )
    //     // NOTE infinity loop with checking session state each 5min
    //     clearInterval(this.interval)
    //     this.interval = setInterval(this.checkAuth, 3e5)
      }))
      .catch(this.errorHandler('Layout initialization'))
      .finally(() => runInAction(() => this.initialized = true))
    // NOTE unmount
    return () => runInAction(() => { })
  }
}

export const layoutStore = new LayoutStore()
export default layoutStore
