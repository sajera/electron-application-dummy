// outsource dependencies
import { contextBridge, ipcRenderer } from 'electron'

// TODO
contextBridge.exposeInMainWorld('preload', {
  sqlite: (...args) => ipcRenderer.invoke('sqlite', ...args),
  getDebugInfo: (...args) => ipcRenderer.invoke('debug-info', ...args),
})

ipcRenderer.on('event-from-main', (event, a, b, c, d) => {
  process.env.DEBUG && console.info('%c preload => ipcRenderer.on(event-from-main) ', 'color: #FF6766; font-weight: bolder;'
    , '\n event:', event
    , '\n args:', a, b, c, d
    , '\n window:', window
  )
  // TODO way to safety trigger actions on UI
})
