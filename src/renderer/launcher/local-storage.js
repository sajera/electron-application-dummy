import { localStorage } from '../../service/storage'

/**
 * Ready to use stores for specific things
 */
export const PageStore = localStorage.bindToPath('page')
export const ThemeStore = localStorage.bindToPath('theme')
export const SidebarStore = localStorage.bindToPath('nav')
export const ToggleStore = localStorage.bindToPath('toggle')
// NOTE this is object that why require pre-definition before will be use
ThemeStore.get() || ThemeStore.set('default-theme')
SidebarStore.get() || SidebarStore.set({})
ToggleStore.get() || ToggleStore.set({})
PageStore.get() || PageStore.set('/')
