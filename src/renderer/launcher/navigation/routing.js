// outsource dependencies
import React, { memo } from 'react'
import { Route, Switch } from 'react-router-dom'
// local dependencies
import * as ROUTS from './routs'

/**
 * Isolated memoized routing to prevent re-rendering of this component during layout changes
 */
export default memo(function Routing () {
  return <Switch>
    <Route path={ROUTS.WELCOME.ROUTE} exact component={require('../view/home').default} />
    <Route path={ROUTS.DRAW_IMAGE.ROUTE} component={require('../view/draw-image').default} />

    <Route path={ROUTS.AI.IMAGE.ROUTE} component={require('../view/ai-image').default} />
    <Route path={ROUTS.AI.DETAILS.ROUTE} component={require('../view/ai-model-details').default} />

    <Route path={ROUTS.WINDOW.DETAILS.ROUTE} component={require('../view/window-details').default} />
    <Route path={ROUTS.WINDOW.LIST.ROUTE} component={require('../view/window-list').default} />

    <Route path={ROUTS.DEV.DEBUG.ROUTE} component={require('../view/debug-info').default} />
    <Route path={ROUTS.DEV.COLOR.ROUTE} component={require('../view/color').default} />
    <Route path={ROUTS.DEV.TOAST.ROUTE} component={require('../view/toast').default} />
    <Route path={ROUTS.DEV.SQL.ROUTE} component={require('../view/sql').default} />

    {/* OTHERWISE */}
    <Route component={require('../view/health').default} />
  </Switch>
})
