// outsource dependencies
import path from 'path'
import { app, nativeImage } from 'electron'
// local dependencies
import PATH from './app-path'
import sqlite from './sqlite'
import debugInfo from './debug-info'
import launcher from './launcher.window'
import { delayResolve } from '../service'
import initializer from './initializer.window'
import icon from '../assets/app-icon/icon.png'


// NOTE just in case ¯\_(ツ)_/¯
app.on('window-all-closed',  app.quit)
app.on('quit',  sqlite.close)

app.whenReady()
  .then(async () => {
    // FIXME to apply icon for local development - remove?
    if (process.platform === 'darwin') {
      const appIcon = path.resolve(PATH.RESOURCES, icon)
      app.dock.setIcon(nativeImage.createFromPath(appIcon))
    }

    await initializer.initialize().catch(debugInfo.handleWarning)
    // initializer.openDevTools()

    await debugInfo.initialize().catch(debugInfo.handleWarning)

    await sqlite.initialize().catch(debugInfo.handleError)

    await launcher.initialize({ show: false }).catch(debugInfo.handleError)
    launcher.openDevTools()

    // NOTE wait until launcher will be ready
    await Promise.all([
      delayResolve(3e3),
      launcher.whenReady(),
    ])

    // NOTE for now this is a main window and app should be closed
    launcher.window.on('close', app.quit)
    launcher.show()
    initializer.close()

    // app.quit()
    // TODO remove pushing event to launcher window - debug perspective
    await delayResolve(3e3)
    launcher.send('event-from-main', 'hello from main')

    // TODO what next ?

  })
  .catch(debugInfo.handleCrash)
