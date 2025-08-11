// outsource dependencies
import { contextBridge, ipcRenderer } from 'electron'

// TODO
contextBridge.exposeInMainWorld('preload', {
  platform: process.platform,
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  // we can also expose variables, not just functions
  ping: (a, b, c, d) => {
    console.log('ping', a, b, c, d)
    return ipcRenderer.invoke('ping', a, b, c, d)
  },
  setIcon: (a, b, c, d) => {
    console.log('setIcon', a, b, c, d)
    return ipcRenderer.invoke('set-icon', a, b, c, d)
  }
})
