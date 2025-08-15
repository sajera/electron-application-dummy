import { localStorage } from '../../service/storage'

/**
 * Ready to use stores for specific things
 */
export const PageLS = localStorage.bindToPath('page')
export const ThemeLS = localStorage.bindToPath('theme')
export const SidebarLS = localStorage.bindToPath('nav')
export const SQLPageLS = localStorage.bindToPath('sql')
export const WindowListLS = localStorage.bindToPath('wl')
export const ToastPageLS = localStorage.bindToPath('tps')
export const ToggleLS = localStorage.bindToPath('toggle')
// NOTE this is object that why require pre-definition before will be use
ThemeLS.get() || ThemeLS.set('default-theme')
SidebarLS.get() || SidebarLS.set({})
ToggleLS.get() || ToggleLS.set({})
PageLS.get() || PageLS.set('/')
