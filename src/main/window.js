// outsource dependencies
import { BrowserWindow } from 'electron'
import { delayResolve } from '../service'

// TODO for inheritance
export default class Window {
  window = null

  options = {
    // icon:
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

  createWindow = (preload, options) => this.window = new BrowserWindow({
    ...this.options,
    ...options,
    webPreferences: {
      preload,
      ...this.webPreferences,
    }
  })

  send = (...args) => this.window.webContents.send(...args)

  whenReady = () => Promise.race([
    new Promise(resolve => this.window.once('ready-to-show', resolve)),
    delayResolve(2e5).then(() => Promise.reject({ message: 'Launcher whenReady timeout' })),
  ])

  show = () => this.window.show()

  hide = () => this.window.hide()

  close = () => this.window.close()

  loadURL = url => this.window.loadURL(url)

  loadFile = file => this.window.loadFile(file)

  openDevTools = () => this.window.webContents.openDevTools()

}
