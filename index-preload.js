// outsource dependencies
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('preload', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  // we can also expose variables, not just functions
  ping: (a, b, c, d) => {
    console.log('ping', a, b, c, d)
    return ipcRenderer.invoke('ping', a, b, c, d)
  }
})
