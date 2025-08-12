// outsource dependencies
import { BrowserWindow } from 'electron'

export default new class Launcher {
  window = null

  options = {
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    title: 'The title of the window',
  }

  webPreferences = {
    // NOTE  reduce ability of window to minimum
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

  send = (...args) => this.window.webContents.send(...args)

  show = () => this.window.show()

  hide = () => this.window.hide()

  close = () => this.window.close()

  loadURL = url => this.window.loadURL(url)

  loadFile = file => this.window.loadFile(file)

  openDevTools = () => this.window.webContents.openDevTools()

}
