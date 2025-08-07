// outsource dependencies
import { BrowserWindow } from 'electron'

export default new class Initializer {
  window = null

  options = {
    width: 400,
    height: 400,
    frame: false,
    alwaysOnTop: true,
  }

  webPreferences = {
    // TODO reduce ability of window to minimum
    webgl: false,
    webSecurity: false,
    enableWebSQL: false,
    textAreasAreResizable: false,
    allowRunningInsecureContent: false,
    devTools: Boolean(process.env.DEBUG),
    additionalArguments: ['--sample=var'],
  }

  constructor () {
    // TODO is that usefully ?
  }

  initialize = (preload, options) => this.window = new BrowserWindow({
    ...this.options,
    ...options,
    webPreferences: {
      preload,
      ...this.webPreferences,
    }
  })

  show = () => this.window.show()

  hide = () => this.window.hide()

  close = () => this.window.close()

  loadURL = url => this.window.loadURL(url)

  loadFile = file => this.window.loadFile(file)

  openDevTools = () => this.window.webContents.openDevTools()

}
