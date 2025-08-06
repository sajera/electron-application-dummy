// outsource dependencies
import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
// local dependencies

console.log('__dirname', path.resolve(path.dirname('')), path.dirname(''))
console.log('process.env.SID', process.env.SID)


// TODO
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: FORGE_PRELOAD_WEBPACK_ENTRY
    }
  })
  // NOTE entry point
  win.loadURL(FORGE_WEBPACK_ENTRY)

  // NOTE enable debug mode
  process.env.DEBUG && win.webContents.openDevTools()

  return win
}

app.whenReady().then(() => {
  ipcMain.handle('ping', (a,b,c,d) => {
    console.log('pong', a,b,c,d)
    return 'pong'
  })

  createWindow()
})
