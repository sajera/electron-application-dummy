// outsource dependencies
import _ from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import layoutStore from '../../store'
import { WINDOW } from '../../navigation'
import toast from '../../../component/toast'
import { FormData } from '../../../component/form'
import { delayResolve } from '../../../../service'

// configure
export const TAB = {
  FORM: 'Options',
  WINDOW: 'Window',
  RUNTIME: 'Runtime',
}
const initial = {
  title: 'Window',
  // TODO icon

  backgroundColor: '',
  opacity: '',
  paintWhenInitiallyHidden: true,

  useContentSize: false,
  x: '',
  y: '',
  center: false,

  frame: true,
  show: true,
  closable: true,
  kiosk: false,
  alwaysOnTop: false,
  fullscreen: false,
  skipTaskbar: false,
  movable: true,
  focusable: true,
  fullscreenable: true,
  resizable: true,
  minimizable: true,
  maximizable: true,

  width: '',
  defaultWidth: '',
  minWidth: '',
  maxWidth: '',

  height: '',
  defaultHeight: '',
  minHeight: '',
  maxHeight: '',

  // NOTE webPreferences
  transparent: false,
  devTools: true,
  nodeIntegration: false,
  nodeIntegrationInWorker: false,
  nodeIntegrationInSubFrames: false,
  // 'preload': '', // for now it will break window-explorer
  sandbox: false,
  // 'session': '', // require('electron').fromPartition('persist:name')
  // 'partition': 'persist:name',
  javascript: true,
  webSecurity: true,
  allowRunningInsecureContent: false,
  images: true,
  textAreasAreResizable: true,
  webgl: true,
  plugins: false,
  experimentalFeatures: false,
  scrollBounce: false,
  backgroundThrottling: true,
  offscreen: false,
  contextIsolation: true,
  webviewTag: false,
  safeDialogs: false,
  disableDialogs: false,
  navigateOnDragDrop: false,
  disableHtmlFullscreenWindowResize: false,
  spellcheck: true,
  enableWebSQL: true,
  enablePreferredSizeMode: false,
  safeDialogsMessage: '',
  accessibleTitle: '',
  zoomFactor: '',
  // @see https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/platform/runtime_enabled_features.json5
  enableBlinkFeatures: '', // A list of feature strings separated by "," like CSSVariables,KeyboardEventKey to enable
  disableBlinkFeatures: '', // ~~~  to disable
  // 'defaultFontFamily', // Object
  defaultFontSize: 16,
  defaultMonospaceFontSize: 13,
  minimumFontSize: 0,
  imageAnimationPolicy: 'animate', // animate, animateOnce, noAnimation
  additionalArguments: '', // string[]
  defaultEncoding: '', // UTF-8 default ISO-8859-1
  v8CacheOptions: 'code', // code, none, bypassHeatCheck, bypassHeatCheckAndEagerCompile
  autoplayPolicy: 'no-user-gesture-required', // no-user-gesture-required, user-gesture-required, document-user-activation-required
}

class WindowDetailsStore {
  errorMessage = null
  initialized = false
  disabled = new Map()

  selectedTab = null

  id = null
  details = null

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

  setTab = tab => this.selectedTab = tab

  initialize = id => {
    this.id = id
    // NOTE cleanup
    this.clearError()
    this.details = null
    this.initialized = !id
    this.form.initialize(initial)
    this.setTab(id ? TAB.WINDOW : TAB.FORM)
    const offWindowClosed = preload.on('window-closed', this.onWindowClosed)
    if (!id) return
    // console.log(`%c WindowDetailsStore.initialize ${id}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n isNew:', !id
    //   , '\n details:', this.details
    // )
    // NOTE load
    Promise.all([
      delayResolve(6e2),
      this.refreshForm(),
      this.refreshDetails(),
    ])
      .then(() => {
        // NOTE infinity loop with checking state each 6s
        clearInterval(this.interval)
        this.interval = setInterval(this.refreshDetails, 6e3)
      })
      .catch(this.errorHandler('Initialization'))
      .finally(() => runInAction(() => this.initialized = true))

    // NOTE unmount
    return () => {
      offWindowClosed()
      clearInterval(this.interval)
    }
  }

  onWindowClosed = id => {
    if (this.id !== id) return
    this.setTab(TAB.WINDOW)
    return this.refreshDetails()
  }

  act = (...args) => {
    this.disabled.set('act', true)
    return preload.windowExplorer('act-runtime-by-id', this.id, ...args)
      .then(this.refreshDetails)
      .catch(this.errorHandler('Act window'))
      .finally(() => runInAction(() => this.disabled.set('act', false)))
  }

  open = () => {
    this.disabled.set('open', true)
    return preload.windowExplorer('start-runtime-by-id', this.id)
      .then(() => this.setTab(TAB.RUNTIME))
      .then(this.refreshDetails)
      .catch(this.errorHandler('Open window'))
      .finally(() => runInAction(() => this.disabled.set('open', false)))
  }

  close = () => {
    this.disabled.set('close', true)
    return preload.windowExplorer('stop-runtime-by-id', this.id)
      .then(() => this.onWindowClosed(this.id))
      .catch(this.errorHandler('Close window'))
      .finally(() => runInAction(() => this.disabled.set('close', false)))
  }

  remove = () => {
    this.disabled.set('remove', true)
    return preload.windowExplorer('remove-window-by-id', this.id)
      .then(() => WINDOW.DETAILS.PUSH())
      .then(layoutStore.refineNavigation)
      .catch(this.errorHandler('Removing window'))
      .finally(() => runInAction(() => this.disabled.set('remove', false)))
  }

  refreshDetails = () => {
    this.disabled.set('details', true)
    return preload.windowExplorer('get-window-details-by-id', this.id)
      .then(data => runInAction(() => this.details = data))
      .catch(this.errorHandler('Get window state'))
      .finally(() => runInAction(() => this.disabled.set('details', false)))
  }

  refreshForm = () => {
    this.disabled.set('form', true)
    return preload.windowExplorer('get-window-by-id', this.id)
      .then(data => this.form.initialize(data))
      .catch(this.errorHandler('Get window details'))
      .finally(() => runInAction(() => this.disabled.set('form', false)))
  }

  submit = values => {
    this.clearError()
    const isNew = !this.id
    this.disabled.set('form', true)
    console.log(`%c WindowDetailsStore.submit ${this.id} `, 'color: #FF6766; font-weight: bolder;'
      , '\n values:', values
    )

    return preload.windowExplorer(isNew ? 'create-window' : 'update-window', { id: this.id, ...values })
      .then(data => delayResolve(6e2, data))
      .then(data => {
        console.log(`%c WindowDetailsStore.submit.then ${this.id} `, 'color: #FF6766; font-weight: bolder;'
          , '\n data:', data
        )
        // NOTE reload the page
        if (isNew) {
          WINDOW.DETAILS.REPLACE({ id: data.id })
          return layoutStore.refineNavigation()
        }
        return Promise.all([
          this.refreshForm(),
          this.refreshDetails(),
        ])
      })
      .catch(this.errorHandler('Updating window'))
      .finally(() => runInAction(() => this.disabled.set('form', false)))
  }

  validate = values => {
    const errors = {}

    if (!values.title) {
      errors.title = 'The Title of the window is mandatory'
    }

    if (values.width && values.width < 64) {
      errors.width = 'The "width" cant be less than 64'
    }

    if (values.defaultWidth && values.defaultWidth < 64) {
      errors.defaultWidth = 'The "defaultWidth" cant be less than 64'
    }
    if (values.maxWidth && values.maxWidth < 64) {
      errors.maxWidth = 'The "max-width" cant be less than 64'
    }

    if (values.minWidth && values.minWidth < 64) {
      errors.minWidth = 'The "min-width" cant be less than 64'
    }

    if (values.height && values.height < 48) {
      errors.height = 'The "height" cant be less than 48'
    }

    if (values.defaultHeight && values.defaultHeight < 48) {
      errors.defaultHeight = 'The "defaultHeight" cant be less than 48'
    }

    if (values.minHeight && values.minHeight < 48) {
      errors.minHeight = 'The "min-height" cant be less than 48'
    }

    if (values.maxHeight && values.maxHeight < 48) {
      errors.maxHeight = 'The "max-height" cant be less than 48'
    }

    if (values.additionalArguments && /([\\,/:*?<>|])/ig.test(values.additionalArguments)) {
      errors.additionalArguments = '`\\`, /, :, *, ?, ", <, >, | symbols are not allowed'
    }

    // console.log('%c validate ', 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', errors
    // )

    return errors
  }
}

export const windowDetailsStore = new WindowDetailsStore()
export default windowDetailsStore
