// outsource dependencies

// local dependencies
import createRoute from '../../../service/route'

// NOTE looks wierd but allows to set up true as default value for booleans
const isLikeBoolean = v => [0, 1, '0', '1', true, false].includes(v)
const bool = { archive: Number, extract: v => Boolean(Number(v)), isValid: isLikeBoolean }
const ANNOTATION = {
  // NOTE popular params
  ID: opt => ({ name: 'id', isValid: v => !['null', 'undefined'].includes(v), defaults: null, ...opt }),
  // NOTE popular query
  BOOL: opt => ({ ...bool, defaults: null, ...opt }),
  SEARCH: opt => ({ short: 'se', name: 'search', defaults: '', ...opt }),
  PAGE: opt => ({ short: 'p', name: 'page', archive: Number, extract: Number, isValid: v => v > -1, defaults: 0, ...opt }),
  SIZE: opt => ({ short: 's', name: 'size', archive: Number, extract: Number, isValid: v => v > 1, defaults: 30, ...opt }),
  SORT_D: opt => ({ short: 'sd', name: 'sortD', ...bool, ...opt }),
  SORT_F: opt => ({ short: 'sf', name: 'sortF', defaults: 'name', isValid: v => ['name'].indexOf(v) > -1, ...opt }),
}

const clean = url => String(url).replace(/^\/+/, '')
/***************************
 *          Pages          *
 ***************************/
export const WELCOME = createRoute('/')
export const NOT_FOUND = createRoute('/404', {
  query: [{ name: 'error', short: 'e', defaults: null }],
})

const WINDOW = createRoute('window')
const windowRoute = (url, options) => createRoute(`/window/${clean(url)}`, options)
WINDOW.LIST = windowRoute('/list')
WINDOW.DETAILS = windowRoute('/details/:id', {
  params: [ANNOTATION.ID({})],
})
export { WINDOW }

const DEV = createRoute('/dev')
const devRoute = (url, options) => createRoute(`/dev/${clean(url)}`, options)
DEV.COLOR = devRoute('/color')
DEV.TOAST = devRoute('/toast')
DEV.DEBUG = devRoute('/debug')
DEV.SQL = devRoute('/sql')

export { DEV }
