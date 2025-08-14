// outsource dependencies
import fs from 'fs'
import path from 'path'
import { app, ipcMain, nativeImage } from 'electron'
// local dependencies
import PATH from './app-path'
import Sqlite from './sqlite'
import Launcher from './launcher'
import DebugInfo from './debug-info'
import Initializer from './initializer'
import { delayResolve } from '../service'
import icon from '../assets/app-icon/icon.png'


// NOTE just in case ¯\_(ツ)_/¯
app.on('window-all-closed',  app.quit)
app.on('quit',  Sqlite.close)

app.whenReady()
  .then(async () => {
    // FIXME to apply icon for local development - remove?
    if (process.platform === 'darwin') {
      const appIcon = path.resolve(PATH.RESOURCES, icon)
      app.dock.setIcon(nativeImage.createFromPath(appIcon))
    }

    await DebugInfo.initialize()
    // TODO
    // await Initializer.initialize()

    // NOTE show loader before
    Initializer.initialize(INITIALIZER_PRELOAD_WEBPACK_ENTRY)
    Initializer.loadURL(INITIALIZER_WEBPACK_ENTRY)
    // Initializer.openDevTools()

    // NOTE necessary DB actions
    await Sqlite.initialize()

    // TODO
    // await Launcher.initialize()
    // NOTE allow launcher to prepare data and view before showing
    Launcher.initialize(LAUNCHER_PRELOAD_WEBPACK_ENTRY, { show: false })
    Launcher.loadURL(LAUNCHER_WEBPACK_ENTRY)

    // FIXME wait until Launcher will be ready ?
    await Promise.all([
      delayResolve(3e3),
      Launcher.whenReady(),
    ])

    // NOTE for now this is a main window and app should be closed
    Launcher.window.on('close', app.quit)
    Launcher.openDevTools()
    Launcher.show()
    Initializer.hide()
    // Initializer.close()
    // app.quit()
    // TODO remove pushing event to launcher window - debug perspective
    await delayResolve(3e3)
    Launcher.send('event-from-main', 'hello from main')

    // TODO what next ?

  })
  .catch(error => console.error('The app where crashed\n', error, app.quit(1)))
