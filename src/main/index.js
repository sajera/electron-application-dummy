// outsource dependencies
import path from 'path'
import { app, nativeImage } from 'electron'
// local dependencies
import PATH from './app-path'
import sqlite from './sqlite'
import debugInfo from './debug-info'
import launcher from './window-launcher'
import { delayResolve } from '../service'
import windowExplorer from './window-explorer'
import initializer from './window-initializer'
import icon from '../assets/app-icon/icon.png'


// NOTE just in case ¯\_(ツ)_/¯
app.on('window-all-closed',  app.quit)
app.on('quit',  sqlite.close)

app.whenReady()
  .then(async () => {
    await debugInfo.initialize()
    // FIXME to apply icon for local development - remove?
    if (process.platform === 'darwin') {
      app.dock.setIcon(nativeImage.createFromPath(path.resolve(PATH.RESOURCES, icon)))
    }

    await initializer.initialize()
    // initializer.openDevTools()

    await sqlite.initialize()
    await windowExplorer.initialize()

    await launcher.initialize({ show: false })
    // NOTE for now this is a main window
    launcher.on('close', app.quit)
    // launcher.openDevTools()

    await Promise.all([
      // NOTE not less than 3s ¯\_(ツ)_/¯
      delayResolve(3e3),
      // NOTE wait until launcher will be ready
      launcher.whenReady(),
    ])
    // NOTE fine view
    launcher.show()
    initializer.forceClose()

    // TODO remove pushing event to launcher window - debug perspective
    await delayResolve(3e3)
    launcher.send('event-from-main', 'hello from main')

  })
  .catch(debugInfo.handleCrash)
