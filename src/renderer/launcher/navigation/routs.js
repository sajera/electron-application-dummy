// outsource dependencies

// local dependencies
import { Route } from '../../../service/route'

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

const DASHBOARD = defineRoute('/dashboard')
const dashboardRoute = (url, options) => defineRoute(`/dashboard/${clean(url)}`, options)
DASHBOARD.STREAMING = dashboardRoute('/streaming-jobs')
DASHBOARD.BATCH = dashboardRoute('/batch-jobs')
DASHBOARD.RDS = dashboardRoute('/rds-export')
DASHBOARD.DATA_EXPORT = dashboardRoute('/data-export')
DASHBOARD.SLA = dashboardRoute('/sla')
DASHBOARD.LATENCY = dashboardRoute('/table-latency')
export { DASHBOARD }

const TOOLS = defineRoute('/tool')
const toolsRoute = (url, options) => defineRoute(`/tool/${clean(url)}`, options)
TOOLS.RDS_EXPORT = toolsRoute('/rds-export')
TOOLS.DATA_EXPORT = toolsRoute('/data-export')
export { TOOLS }

const CCPA = defineRoute('/ccpa')
const ccpaRoute = (url, options) => defineRoute(`ccpa/${clean(url)}`, options)
CCPA.AUDIT = ccpaRoute('/audit')
CCPA.ARCHIVE = ccpaRoute('/archive')
CCPA.FAN_LOOKUP = ccpaRoute('/fan-lookup')
CCPA.MAPPING = ccpaRoute('/mapping')
CCPA.DISCLOSURE = ccpaRoute('/disclosure')
export { CCPA }

const PLATFORM = defineRoute('/platform')
const platformRoute = (url, options) => defineRoute(`platform/${clean(url)}`, options)
PLATFORM.DATABRICKS = platformRoute('/databricks')
PLATFORM.TEAMS = platformRoute('/teams')
PLATFORM.USERS = platformRoute('/users')
PLATFORM.TOKENS = platformRoute('/auth-tokens')
PLATFORM.USER_GROUPS = platformRoute('/user-groups')
export { PLATFORM }


const BETA = defineRoute('/beta')
const betaRoute = (url, options) => defineRoute(`beta/${clean(url)}`, options)
BETA.METADATA = betaRoute('/metadata')

export { BETA }
