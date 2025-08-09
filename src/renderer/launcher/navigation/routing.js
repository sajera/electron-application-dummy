// outsource dependencies
import React, { memo } from 'react'
import { Route, Switch } from 'react-router-dom'
// local dependencies
import * as ROUTS from './routs'
import Home from '../view/home'
import Health from '../view/health'
/**
 * Isolated memoized routing to prevent re-rendering of this component during layout changes
 */
export default memo(function Routing () {
  // FIXME not sure it is usefully
  return <Switch>
    {/* NOTE simulate Suspense fallback */}
    {/*<Route path="*" component={lazy(() => new Promise(() => ''))} />*/}
    <Route path={ROUTS.WELCOME.ROUTE} exact component={Home} />


    <Route component={Health} />
    {/* FIXME is that good solution ? Check on app build */}
    {/*<Route component={require('../view/health').default} />*/}
  </Switch>
})

// // outsource dependencies
// import React, { lazy, memo } from 'react'
// import { Route, Switch } from 'react-router-dom'
// // local dependencies
// import * as ROUTS from './routs'
// import { Loader } from '../../component/loader'
//
// /**
//  * Isolated memoized routing to prevent re-rendering of this component during layout changes
//  */
// export default memo(function Routing () {
//   // FIXME not sure it is usefully
//   return <React.Suspense fallback={<Loader active title="Page is Loading..." />}>
//     <Switch>
//       {/* NOTE simulate Suspense fallback */}
//       {/*<Route path="*" component={lazy(() => new Promise(() => ''))} />*/}
//       <Route path={ROUTS.WELCOME.ROUTE} exact component={lazy(() => import('../view/home'))} />
//
//
//       <Route component={lazy(() => import('../view/health'))} />
//     </Switch>
//   </React.Suspense>
// })
