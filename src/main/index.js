// outsource dependencies
import fs from 'fs'
import path from 'path'
import { app, ipcMain, nativeImage } from 'electron'
// local dependencies
import Launcher from './launcher'
import Initializer from './initializer'
import { delayResolve } from '../service'
import icon from '../assets/app-icon/icon.png'

console.log('__dirname', path.resolve(path.dirname('')), path.dirname(''))
console.log('process.env.SID', process.env.SID)

// console.log('fs.readdirSync', fs.readdirSync(path.dirname(__filename)))
// console.log('__filename => icon', path.resolve(path.dirname(__filename), icon))

// NOTE just in case ¯\_(ツ)_/¯
app.on('window-all-closed',  app.quit)

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    const AppIcon = path.resolve(path.dirname(__filename), icon)
    app.dock.setIcon(nativeImage.createFromPath(AppIcon))
  }

  // TODO IPC_API
  ipcMain.handle('ping', (event, a, b, c, d) => {
    console.log('pong', event, a, b, c, d)
    return 'pong'
  })

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
    })

})
