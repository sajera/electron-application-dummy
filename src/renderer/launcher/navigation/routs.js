// outsource dependencies

// local dependencies
import { Route } from '../../../service/route'

// NOTE looks wierd but allows to set up true as default value for booleans
const bool = { defaults: false, archive: Number, extract: v => [0, 1, '0', '1', true, false].includes(v) ? Boolean(Number(v)) : 2, isValid: v => [0, 1, '0', '1', true, false].includes(v) }
const ANNOTATION = {
  // NOTE popular params
  ID: opt => ({ name: 'id', defaults: null, ...opt }),
  // NOTE popular query
  BOOL: opt => ({ ...bool, ...opt }),
  SEARCH: opt => ({ short: 'se', name: 'search', defaults: '', ...opt }),
  PAGE: opt => ({ short: 'p', name: 'page', archive: Number, extract: Number, isValid: v => v > -1, defaults: 0, ...opt }),
  SIZE: opt => ({ short: 's', name: 'size', archive: Number, extract: Number, isValid: v => v > 1, defaults: 30, ...opt }),
  SORT_D: opt => ({ short: 'sd', name: 'sortD', ...bool, ...opt }),
  SORT_F: opt => ({ short: 'sf', name: 'sortF', defaults: 'name', isValid: v => ['name'].indexOf(v) > -1, ...opt }),
}

/**
 * create Route with helpers to work with url string
 * @param {String} url
 * @param {Object} options
 * @returns {Route}
 */
const defineRoute = (url, options) => Route.create(url, options)
const clean = url => String(url).replace(/^\/+/, '')

/***************************
 *       Public pages      *
 ***************************/
export const WELCOME = defineRoute('/')
export const NOT_FOUND = defineRoute('/404', {
  query: [{ name: 'error', short: 'e', defaults: null }],
})

const WINDOW = defineRoute('window')
const windowRoute = (url, options) => defineRoute(`/window/${clean(url)}`, options)
WINDOW.LIST = windowRoute('/list')
WINDOW.DETAILS = windowRoute('/details/:id', {
  params: [ANNOTATION.ID({})],
})
export { WINDOW }

const DEV = defineRoute('/dev')
const devRoute = (url, options) => defineRoute(`/dev/${clean(url)}`, options)
DEV.COLOR = devRoute('/color')
DEV.TOAST = devRoute('/toast')
DEV.DEBUG = devRoute('/debug')
DEV.SQL = devRoute('/sql')

export { DEV }
