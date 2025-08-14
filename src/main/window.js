// outsource dependencies
import path from 'path'
import { BrowserWindow } from 'electron'
// local dependencies
import PATH from './app-path'
import debugInfo from './debug-info'
import { delayResolve } from '../service'
import icon from '../assets/app-icon/icon.png'


export default class Window {
  window = null

  options = {
    title: 'The title of the window',
    icon: path.join(PATH.RESOURCES, icon)
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

  createWindow = options => {
    debugInfo.windows.push(options)
    return new BrowserWindow(options)
  }

  whenReady = () => Promise.race([
    // new Promise(resolve => this.window.once('ready-to-show', resolve)),
    new Promise(resolve => this.window.webContents.once('did-finish-load', resolve)),
    delayResolve(2e5).then(() => Promise.reject({ message: 'Window whenReady timeout' })),
  ])

  show = () => this.window.show()

  hide = () => this.window.hide()

  close = () => this.window.close()

  loadURL = url => this.window.loadURL(url)

  loadFile = file => this.window.loadFile(file)

  send = (...args) => this.window.webContents.send(...args)

  openDevTools = () => this.window.webContents.openDevTools()

}
