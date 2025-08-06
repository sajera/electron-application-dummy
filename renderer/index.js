// outsource dependencies
import { observer } from 'mobx-react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import React, { lazy, useEffect } from 'react'
import { MemoryRouter, Routes, Route  } from 'react-router'
// local injections ...
import './style'
// local dependencies
import Health from './health'
// import Auth from './views/auth'
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
console.log('s')
  return <>
    <h2 className="bg-gray-100 dark:bg-gray-900 text-primary-500">
      Hello from React!
      <mark>{process.env.SID}</mark>
    </h2>

    {/* NOTE App */}
    {/*<Loader active={!currentUser.initialized || (health.isLoading && !health.isLoaded)} title="App is Loading...">*/}
    {/*  {!health.content ? <Health /> : !currentUser.isAuthenticated ? <Auth /> : <Routes>*/}
    {/*    /!* NOTE simulate Suspense fallback *!/*/}
    {/*    /!*<Route path="*" element={lazy(() => new Promise(() => ''))} />*!/*/}
    {/*    <Route path={LAYOUT.ROUTE} element={lazy(() => import('./layout'))} />*/}
    {/*    <Route element={lazy(() => import('./views/404'))} />*/}
    {/*  </Routes>}*/}
    {/*</Loader>*/}
    {/* NOTE common things */}
    <div id="ModalPortal" />

    {/*<Confirmation />*/}
    <Toaster />
  </>
})

createRoot(document.body).render(<MemoryRouter>
  <App />
</MemoryRouter>)

console.info('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n sid:', process.env.SID
  , '\n preload:', preload
)
