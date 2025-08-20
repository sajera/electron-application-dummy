// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../component/toast'
import { delayResolve } from '../../service'
import { ToggleLS, ThemeLS } from './local-storage'
import { navigationMenu, createWindowMenuItem } from './navigation'

class LayoutStore {
  menu = _.cloneDeep(navigationMenu)

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

  refineNavigation = async () => {
    // NOTE load necessary things to expand menu dynamically
    const menu = _.cloneDeep(navigationMenu)
    const windowSection = _.find(menu, { name: 'WINDOWS' })
    const windows = await preload.windowExplorer('get-all')
    _.map(windows, item => windowSection.list.push(createWindowMenuItem(item)))
    // NOTE update menu
    runInAction(() => this.menu = menu)
  }

  getDebugInfo = () => preload.getDebugInfo()
    .then(data => runInAction(() => this.debugInfo = data))
    .catch(this.errorHandler('Get Debug Info'))

  initialize = () => {
    this.initialized = false
    this.setTheme(ThemeLS.get())
    this.setDarkMode(ToggleLS.get()?.dark)
    this.isSidebarHidden = Boolean(ToggleLS.get()?.nav)
    console.info('%c LayoutStore.launcher ', 'color: #FF6766; font-weight: bolder;'
      , '\n sid:', process.env.SID
      , '\n preload:', preload
    )

    this.listenMain()

    Promise.all([
      delayResolve(300),
      this.getDebugInfo(),
      this.refineNavigation(),
      // API('/something-important'),
    ])
      // .then(() => runInAction(() => {
      //   // NOTE infinity loop with checking session state each 5min
      //   clearInterval(this.interval)
      //   this.interval = setInterval(this.checkAuth, 3e5)
      // }))
      .catch(this.errorHandler('Layout initialization'))
      .finally(() => runInAction(() => this.initialized = true))

    // NOTE unmount
    // return () => { }
  }

  listenMain = () => {
    preload.on('fake', () => '')
    preload.on('events', () => '')
    preload.on('event-from-main', (...args) => {
      console.info('%c LayoutStore.listenMain => event-from-main ', 'color: #FF6766; font-weight: bolder;'
        , '\n args:', args
      )
    })
  }

  // TODO to think about events from "main"
}

export const layoutStore = new LayoutStore()
export default layoutStore
