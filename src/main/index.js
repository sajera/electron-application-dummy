// outsource dependencies
import fs from 'fs'
import path from 'path'
import { app, ipcMain, nativeImage } from 'electron'
// local dependencies
import Sqlite from './sqlite'
import Launcher from './launcher'
import Initializer from './initializer'
import { delayResolve } from '../service'
import icon from '../assets/app-icon/icon.png'

// TODO remove
console.log('MAIN => ', process.env.SID
  , '\n __filename:', __filename
  , '\n __dirname:', path.resolve(path.dirname(''))
  , '\n fs.readdirSync:', fs.readdirSync(path.dirname(__filename))
  , '\n process.resourcesPath:', process.resourcesPath
  , '\n fs.readdirSync:', fs.readdirSync(process.resourcesPath)
)

// NOTE just in case ¯\_(ツ)_/¯
app.on('window-all-closed',  app.quit)
app.on('quit',  Sqlite.close)

app.whenReady().then(() => {
  // FIXME to apply icon for local development - remove?
  if (process.platform === 'darwin') {
    const appIcon = path.resolve(path.dirname(__filename), icon)
    console.log('appIcon', appIcon)
    app.dock.setIcon(nativeImage.createFromPath(appIcon))
  }

  // NOTE necessary DB actions
  Sqlite.initialize(app.getAppPath('userData'))
  ipcMain.handle('sqlite', Sqlite.handleQuery)

  // NOTE show loader before
  Initializer.initialize(INITIALIZER_PRELOAD_WEBPACK_ENTRY)
  Initializer.loadURL(INITIALIZER_WEBPACK_ENTRY)
  // Initializer.openDevTools()
  // NOTE allow launcher to prepare data and view before showing
  Launcher.initialize(LAUNCHER_PRELOAD_WEBPACK_ENTRY, { show: false })
  Launcher.loadURL(LAUNCHER_WEBPACK_ENTRY)
  Launcher.openDevTools()

  // TODO simulate preparation of Launcher
  delayResolve(3e3)
    .then(() => {
      Launcher.show()
      Initializer.hide()
      // TODO for now this is a main window and app should be closed
      Launcher.window.on('close', app.quit)
      // Initializer.close()
      // TODO what next
      // app.quit()
      delayResolve(3e3).then(() => Launcher.send('event-from-main', 1,2,3,4,5,6))
    })

})
