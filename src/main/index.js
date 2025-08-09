// outsource dependencies
import path from 'path'
import { app, BrowserWindow, ipcMain, nativeImage, Tray } from 'electron'
// local dependencies
import Launcher from './launcher'
import Initializer from './initializer'
import { delayResolve } from '../service'

console.log('__dirname', path.resolve(path.dirname('')), path.dirname(''))
console.log('process.env.SID', process.env.SID)

// NOTE setup icon for panel
app.dock.setIcon('./assets/image/logo-512x512.png')
// TODO handle close when Initializer is hidden
// NOTE just in case ¯\_(ツ)_/¯
app.on('window-all-closed',  app.quit)

app.whenReady().then(() => {
  // TODO IPC_API
  ipcMain.handle('ping', (a,b,c,d) => {
    console.log('pong', a,b,c,d)
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
      Initializer.hide()
      Launcher.show()
      // TODO for now this is a main window and app should be closed
      Launcher.window.on('close', app.quit)
      // Initializer.close()
      // TODO what next
      // createWindow()
      // app.quit()
    })

})
