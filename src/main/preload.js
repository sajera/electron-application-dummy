// outsource dependencies
import { contextBridge, ipcRenderer } from 'electron'


const ipcInvoke = channel => (...args) => ipcRenderer.invoke(channel, ...args)
  // NOTE this is a tricky part for passing errors through IPC
  .then(data => data?.isError ? Promise.reject(data) : data)

contextBridge.exposeInMainWorld('preload', {
  sqlite: ipcInvoke('sqlite'),
  getDebugInfo: ipcInvoke('debug-info'),
  windowExplorer: ipcInvoke('window-explorer'),
})

ipcRenderer.on('event-from-main', (event, a, b, c, d) => {
  process.env.DEBUG && console.info('%c preload => ipcRenderer.on(event-from-main) ', 'color: #FF6766; font-weight: bolder;'
    , '\n event:', event
    , '\n args:', a, b, c, d
    , '\n window:', window
  )
  // TODO way to safety trigger actions on UI
})
