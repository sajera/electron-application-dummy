// outsource dependencies
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { Router, useHistory, useLocation } from 'react-router-dom'
import { Cog8ToothIcon, Bars4Icon } from '@heroicons/react/24/solid'
// local injections ...
import '../style'
// local dependencies
import { layoutStore } from './store'
import { PageStore } from './local-storage'
import { Sidebar, Routing } from './navigation'
import { createHistory } from '../../service/route'


const history = createHistory({ // NOTE restore last state
  initialEntries: ['/', PageStore.get()],
  initialIndex: 1,
})

const Layout = observer(function Layout () {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(layoutStore.initialize, [])
  // NOTE track active page state
  const { pathname, search } = useLocation()
  // NOTE Store the last visited page
  useEffect(() => { PageStore.set(pathname + search) }, [pathname, search])

  return < >
    {/* NOTE page header */}
    <div className="flex items-center flex-nowrap bg-black text-white shadow py-2.5 h-12 fixed z-40 inset-x-0 top-0">
      <mark>menu toggle ?</mark>
      <div className="flex items-center pr-3 mr-3 h-6">
        <button
          onClick={layoutStore.toggleSideBar}
          title={<><strong>{layoutStore.isSidebarHidden ? 'Show' : 'Hide'}</strong> the navigation sidebar</>}
          className="p-0 w-5 h-5 rounded-full flex items-center justify-center ring-offset-black focus:ring-black text-gray-100 hover:text-primary-700"
        >
          <Bars4Icon className="size-4 inline-block" />
        </button>
      </div>
      {/* NOTE header right side */}
      <div className="flex flex-1 items-center justify-end">
        {'<SelectAppTZ className="mr-3" />'}
        <p className="font-bold text-sm text-primary-600 _text-white mr-2">currentUser.email</p>
        <button
          title="User Settings"
          className="p-0 w-5 h-5 rounded-full flex items-center justify-center ring-offset-black focus:ring-black text-gray-100 hover:text-primary-700"
        >
          <Cog8ToothIcon className="size-4 inline-block" />
        </button>
      </div>
    </div>
    <Sidebar className={cn(
      'sidebar overflow-y-auto pt-12 pb-12',
      'border-r_ shadow-inner _shadow',
      // NOTE collapsible
      'inset-y-0 absolute w-60 transition-all',
      layoutStore.isSidebarHidden ? '-left-60' : 'left-0',
    )}>
      <mark>{process.env.SID}</mark>
    </Sidebar>
    <div className={cn('relative h-screen pt-12 transition-all overflow-y-auto', { 'ml-60': !layoutStore.isSidebarHidden })}>
      <Routing />
    </div>
    <Toaster />
  </>
})

createRoot(document.body).render(<Router history={history}>
  <Layout />
</Router>)
