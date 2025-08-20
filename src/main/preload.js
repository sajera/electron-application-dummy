// outsource dependencies
import { contextBridge, ipcRenderer } from 'electron'


const handle = handler => (event, ...args) => handler(...args)
const ipcInvoke = channel => (...args) => ipcRenderer.invoke(channel, ...args)
  // NOTE this is a tricky part for passing errors through IPC
  .then(data => data?.isError ? Promise.reject(data) : data)

contextBridge.exposeInMainWorld('preload', {
  // NOTE senders to modules
  sqlite: ipcInvoke('sqlite'),
  getDebugInfo: ipcInvoke('debug-info'),
  windowExplorer: ipcInvoke('window-explorer'),
  // NOTE listeners
  once: (event, cb) => ipcRenderer.once(event, handle(cb)),
  on: (event, cb) => {
    const handler = handle(cb)
    ipcRenderer.on(event, handler)
    return () => ipcRenderer.off(event, handler)
  },
})
