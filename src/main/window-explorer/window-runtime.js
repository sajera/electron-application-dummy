// outsource dependencies
import _ from 'lodash'
import path from 'path'
import { BrowserWindow, nativeImage } from 'electron'
// local dependencies
import PATH from '../app-path'
import debugInfo from '../debug-info'
import { delayResolve } from '../../service'
import icon from '../../assets/app-icon/icon.png'

const options = {
  title: 'The title of the window',
  // icon: path.join(PATH.RESOURCES, icon),
  icon: nativeImage.createFromPath(path.join(PATH.RESOURCES, icon))
}

// TODO by default reduce ability of window to minimum
const webPreferences = {
  webgl: false,
  plugins: false,
  webSecurity: false,
  enableWebSQL: false,
  nodeIntegration: false,
  contextIsolation: true,
  additionalArguments: [],
  navigateOnDragDrop: false,
  textAreasAreResizable: false,
  allowRunningInsecureContent: false,
  devTools: Boolean(process.env.DEBUG),
}

export default class WindowRuntime {
  id = null
  window = null

  get windowID () {
    return this.window?.id
  }

  get state () {
    return !this.window ? null : {
      size: this.window.getSize(),
      title: this.window.getTitle(),
      bounds: this.window.getBounds(),
      contentBounds: this.window.getContentBounds(),
      contentSize: this.window.getContentSize(),
      minimumSize: this.window.getMinimumSize(),
      maximumSize: this.window.getMaximumSize(),
      normalBounds: this.window.getNormalBounds(),
      backgroundColor: this.window.getBackgroundColor(),
      opacity: this.window.getOpacity(),
      // aspectRatio: this.window.getAspectRatio(),
      // NOTE related windows info
      parentWindow: this.window.getParentWindow()?.id ?? null,
      childWindows: this.window.getChildWindows().map(w => w.id),
      hasViews: Boolean(this.window.getBrowserView()),
      views: this.window.getBrowserViews().length,
      // NOTE flags & booleans
      isFocused: this.window.isFocused(),
      isVisible: this.window.isVisible(),
      isDestroyed: this.window.isDestroyed(),
      isFullScreen: this.window.isFullScreen(),
      isKiosk: this.window.isKiosk(),
      isMaximized: this.window.isMaximized(),
      isMinimized: this.window.isMinimized(),
      isModal: this.window.isModal(),
      isResizable: this.window.isResizable(),
      isMovable: this.window.isMovable(),
      isClosable: this.window.isClosable(),
      isAlwaysOnTop: this.window.isAlwaysOnTop(),
    }
  }

  constructor (id) {
    this.id = id
  }

  create = options => {
    WindowRuntime.all.push(this)
    options?.webPreferences?.additionalArguments?.push(`--window-runtime-id=${this.id}`)
    // IMPORTANT may cause an error: object cannot be cloned
    debugInfo.windows.unshift({
      ...options,
      top: Boolean(options.top) || void(0),
      icon: Boolean(options.icon) || void(0),
      parent: Boolean(options.parent) || void(0),
    })
    this.window = new BrowserWindow(options)
    // NOTE remove runtime reference
    this.on('closed', () => _.remove(WindowRuntime.all, { id: this.id || '100% not match ¯\\_(ツ)_/¯' }))
    return this.window
  }
  /************************************************
   * Shortcuts - used in 'act-self' and 'act-runtime-by-id'
   ************************************************/
  on = (...args) => this.window.on(...args)

  once = (...args) => this.window.once(...args)

  off = (...args) => this.window.off(...args)

  show = () => this.window.show()

  hide = () => this.window.hide()

  close = () => this.window.close()

  loadURL = url => this.window.loadURL(url)

  send = (...args) => this.window.webContents.send(...args)

  openDevTools = () => this.window.webContents.openDevTools()
  /************************************************
   *          Helpers
   ************************************************/
  whenReady = () => Promise.race([
    new Promise(resolve => this.window.once('ready-to-show', resolve)),
    new Promise(resolve => this.window.webContents.once('did-finish-load', resolve)),
    delayResolve(2e5).then(() => Promise.reject({ message: 'Window whenReady timeout' })),
  ])

  forceClose = () => {
    this.window.setClosable(true)
    return this.window.close()
  }
  /************************************************
   *          Common Helpers
   ************************************************/
  static all = []

  static getById = id => _.find(WindowRuntime.all, { id })

  static getByWindowId = windowID => _.find(WindowRuntime.all, { windowID })

  static getFromEvent = ({ sender }) => {
    const window = BrowserWindow.fromWebContents(sender)
    return this.getByWindowId(window?.id)
  }

  static get defaults () {
    return { options, webPreferences }
  }

  static get optionNames () {
    return browserWindowOptionNames
  }

  static get webPreferencesNames () {
    return webPreferencesOptionNames
  }
}

const browserWindowOptionNames = [
  // Parenting
  'parent',
  'modal',
  //
  'title',
  'icon',
  // Position
  'x',
  'y',
  'center',
  'useContentSize',
  // Sizes
  'height',
  'minHeight',
  'maxHeight',
  'defaultHeight',
  'width',
  'minWidth',
  'maxWidth',
  'defaultWidth',
  // Behavior & Appearance
  'show',
  'frame',
  'kiosk',
  'closable',
  'movable',
  'resizable',
  'focusable',
  'alwaysOnTop',
  'fullscreen',
  'fullscreenable',
  'minimizable',
  'maximizable',
  'skipTaskbar',
]

const webPreferencesOptionNames = [
  'devTools',
  'nodeIntegration',
  'nodeIntegrationInWorker',
  'nodeIntegrationInSubFrames',
  'preload',
  'sandbox',
  'session',
  'partition',
  'zoomFactor',
  'javascript',
  'webSecurity',
  'allowRunningInsecureContent',
  'images',
  'imageAnimationPolicy',
  'textAreasAreResizable',
  'webgl',
  'plugins',
  'experimentalFeatures',
  'scrollBounce',
  'enableBlinkFeatures',
  'disableBlinkFeatures',
  'defaultFontFamily',
  'defaultFontSize',
  'defaultMonospaceFontSize',
  'minimumFontSize',
  'defaultEncoding',
  'backgroundThrottling',
  'offscreen',
  'contextIsolation',
  'webviewTag',
  'additionalArguments',
  'safeDialogs',
  'safeDialogsMessage',
  'disableDialogs',
  'navigateOnDragDrop',
  'autoplayPolicy',
  'disableHtmlFullscreenWindowResize',
  'accessibleTitle',
  'spellcheck',
  'enableWebSQL',
  'v8CacheOptions',
  'enablePreferredSizeMode',
  'transparent',
  'enableDeprecatedPaste',
]
