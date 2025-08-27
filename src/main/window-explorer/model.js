// outsource dependencies
import _ from 'lodash'
import SQLiteModel from '../../service/model-sqlite'
// local dependencies
import Sqlite from '../sqlite'


export const windowSQL = new class WindowSQL extends SQLiteModel {
  table = 'windows'

  schema = {
    id: SQLiteModel.Number(),
    title: SQLiteModel.String(),
    backgroundColor: SQLiteModel.String(),
    opacity: SQLiteModel.Number(),
    useContentSize: SQLiteModel.Boolean(),
    paintWhenInitiallyHidden: SQLiteModel.Boolean(),
    x: SQLiteModel.Number(),
    y: SQLiteModel.Number(),
    center: SQLiteModel.Boolean(),
    frame: SQLiteModel.Boolean(),
    show: SQLiteModel.Boolean(),
    closable: SQLiteModel.Boolean(),
    kiosk: SQLiteModel.Boolean(),
    alwaysOnTop: SQLiteModel.Boolean(),
    fullscreen: SQLiteModel.Boolean(),
    skipTaskbar: SQLiteModel.Boolean(),
    movable: SQLiteModel.Boolean(),
    focusable: SQLiteModel.Boolean(),
    fullscreenable: SQLiteModel.Boolean(),
    resizable: SQLiteModel.Boolean(),
    minimizable: SQLiteModel.Boolean(),
    maximizable: SQLiteModel.Boolean(),
    width: SQLiteModel.Number(),
    defaultWidth: SQLiteModel.Number(),
    minWidth: SQLiteModel.Number(),
    maxWidth: SQLiteModel.Number(),
    height: SQLiteModel.Number(),
    defaultHeight: SQLiteModel.Number(),
    minHeight: SQLiteModel.Number(),
    maxHeight: SQLiteModel.Number(),
    // NOTE webPreferences
    transparent: SQLiteModel.Boolean(),
    zoomFactor: SQLiteModel.Number(),
    devTools: SQLiteModel.Boolean(),
    nodeIntegration: SQLiteModel.Boolean(),
    nodeIntegrationInWorker: SQLiteModel.Boolean(),
    nodeIntegrationInSubFrames: SQLiteModel.Boolean(),
    sandbox: SQLiteModel.Boolean(),
    javascript: SQLiteModel.Boolean(),
    webSecurity: SQLiteModel.Boolean(),
    allowRunningInsecureContent: SQLiteModel.Boolean(),
    images: SQLiteModel.Boolean(),
    textAreasAreResizable: SQLiteModel.Boolean(),
    webgl: SQLiteModel.Boolean(),
    plugins: SQLiteModel.Boolean(),
    experimentalFeatures: SQLiteModel.Boolean(),
    scrollBounce: SQLiteModel.Boolean(),
    imageAnimationPolicy: SQLiteModel.String(),
    enableBlinkFeatures: SQLiteModel.String(),
    disableBlinkFeatures: SQLiteModel.String(),
    defaultFontSize: SQLiteModel.Number(),
    defaultMonospaceFontSize: SQLiteModel.Number(),
    minimumFontSize: SQLiteModel.Number(),
    defaultEncoding: SQLiteModel.String(),
    backgroundThrottling: SQLiteModel.Boolean(),
    offscreen: SQLiteModel.Boolean(),
    contextIsolation: SQLiteModel.Boolean(),
    webviewTag: SQLiteModel.Boolean(),
    additionalArguments: SQLiteModel.String(),
    safeDialogs: SQLiteModel.Boolean(),
    safeDialogsMessage: SQLiteModel.String(),
    disableDialogs: SQLiteModel.Boolean(),
    navigateOnDragDrop: SQLiteModel.Boolean(),
    autoplayPolicy: SQLiteModel.String(),
    disableHtmlFullscreenWindowResize: SQLiteModel.Boolean(),
    accessibleTitle: SQLiteModel.String(),
    spellcheck: SQLiteModel.Boolean(),
    enableWebSQL: SQLiteModel.Boolean(),
    v8CacheOptions: SQLiteModel.String(),
    enablePreferredSizeMode: SQLiteModel.Boolean()
  }

  constructor () {
    super()
    this.sqlite3all = Sqlite.promise.bind(Sqlite, 'all')
    this.test()
  }
}
