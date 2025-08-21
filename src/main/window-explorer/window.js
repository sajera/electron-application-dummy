// outsource dependencies
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

const webPreferences = {
  // TODO reduce ability of window to minimum
  webgl: false,
  plugins: false,
  webSecurity: false,
  enableWebSQL: false,
  nodeIntegration: false,
  contextIsolation: true,
  navigateOnDragDrop: false,
  textAreasAreResizable: false,
  allowRunningInsecureContent: false,
  devTools: Boolean(process.env.DEBUG),
}

export default class Window {
  window = null

  static get defaults () {
    return { options, webPreferences }
  }

  static get optionNames () {
    return browserWindowOptionNames
  }

  static get webPreferencesNames () {
    return webPreferencesOptionNames
  }

  get windowID () {
    this.window.getBackgroundColor()
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

  constructor () {
    // TODO is that usefully ?
  }

  create = options => {
    debugInfo.windows.unshift(options)
    return this.window = new BrowserWindow(options)
  }

  whenReady = () => Promise.race([
    new Promise(resolve => this.window.once('ready-to-show', resolve)),
    new Promise(resolve => this.window.webContents.once('did-finish-load', resolve)),
    delayResolve(2e5).then(() => Promise.reject({ message: 'Window whenReady timeout' })),
  ])

  on = (...args) => this.window.on(...args)

  once = (...args) => this.window.once(...args)

  off = (...args) => this.window.off(...args)

  show = () => this.window.show()

  hide = () => this.window.hide()

  close = () => {
    this.window.closable = true
    return this.window.close()
  }

  loadURL = url => this.window.loadURL(url)

  loadFile = file => this.window.loadFile(file)

  send = (...args) => this.window.webContents.send(...args)

  openDevTools = () => this.window.webContents.openDevTools()

}

const browserWindowOptionNames = [
  // Size & Position
  'width',
  'height',
  'x',
  'y',
  'useContentSize',
  'center',
  // Size Limits
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  // Behavior & Appearance
  'resizable',
  'movable',
  'minimizable',
  'maximizable',
  'closable',
  'focusable',
  'alwaysOnTop',
  'fullscreen',
  'fullscreenable',
  'skipTaskbar',
  'kiosk',
  'title',
  'icon',
  // Parenting
  'parent',
  'modal',

  // Visual & Rendering
  'backgroundThrottling',
  'offscreen',
  'defaultFontFamily',
  'defaultFontSize',
  'defaultMonospaceFontSize',
  'minimumFontSize',
  'defaultEncoding',
  'disableBlinkFeatures',
  'spellcheck',
  'autoplayPolicy',
  'disableHtmlFullscreenWindowResize',
  // Dialogs
  'safeDialogs',
  'disableDialogs',
  'safeDialogsMessage',
  // Extras
  'additionalArguments',
  'accessibleTitle',
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
