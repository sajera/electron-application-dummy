import { localStorage } from '../../service/storage'

/**
 * Ready to use stores for specific things
 */
export const PageStore = localStorage.bindToPath('page')
export const SidebarStore = localStorage.bindToPath('nav')
export const ToggleStore = localStorage.bindToPath('toggle')
// NOTE this is object that why require pre-definition before will be use
SidebarStore.get() || SidebarStore.set({})
ToggleStore.get() || ToggleStore.set({})
PageStore.get() || PageStore.set('/')
