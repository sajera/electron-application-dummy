// outsource dependencies
import { observer } from 'mobx-react'
// import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import React, { lazy, useEffect } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
// local injections ...
import './style'
// local dependencies
// import Auth from './views/auth'
// import Health from './views/health'
// import { currentUser } from './store'
// import { Loader, Confirmation } from 'component'
// import { LAYOUT, AUTH, history, config } from 'constant'
// import { CookieEmail, PageStore, health, safeJsonParse } from 'service'

const App = observer(function App () {

  // useEffect(() => {
  //   // NOTE handle authentication in case email present in url
  //   if (AUTH.QUERY()?.email) {
  //     // NOTE update stored email
  //     CookieEmail.set(AUTH.QUERY()?.email)
  //     // NOTE replace auth url
  //     history.push(LAYOUT.TEST(PageStore.get()) ? PageStore.get() : LAYOUT.LINK())
  //   }
  //   // IMPORTANT check auth after extracting from url ¯\_(ツ)_/¯
  //   currentUser.initialize(CookieEmail.get())
  // }, [])

  return <>
    <h2 className="bg-gray-100 dark:bg-gray-900 text-primary-500">Hello from React! <mark>{process.env.SID}</mark></h2>
    {/* NOTE App */}
    {/*<Loader active={!currentUser.initialized || (health.isLoading && !health.isLoaded)} title="App is Loading...">*/}
    {/*  {!health.content ? <Health /> : !currentUser.isAuthenticated ? <Auth /> : <Router history={history}>*/}
    {/*    <React.Suspense fallback={<Loader active title="App is Loading..." />}>*/}
    {/*      <Switch>*/}
    {/*        /!* NOTE simulate Suspense fallback *!/*/}
    {/*        /!*<Route path="*" component={lazy(() => new Promise(() => ''))} />*!/*/}
    {/*        <Route path={LAYOUT.ROUTE} component={lazy(() => import('./layout'))} />*/}
    {/*        <Route component={lazy(() => import('./views/404'))} />*/}
    {/*      </Switch>*/}
    {/*    </React.Suspense>*/}
    {/*  </Router>}*/}
    {/*</Loader>*/}
    {/* NOTE common things */}
    <div id="ModalPortal" />
    {/*<Confirmation />*/}
    {/*<Toaster />*/}
  </>
})

createRoot(document.body).render(<App />)

console.info('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n sid:', process.env.SID
  , '\n preload:', preload
)
