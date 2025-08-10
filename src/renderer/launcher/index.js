// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { Router, useLocation } from 'react-router-dom'
import { Cog8ToothIcon, Bars4Icon, SunIcon, MoonIcon } from '@heroicons/react/24/solid'
// local injections ...
import '../style'
// local dependencies
import { layoutStore } from './store'
import { Btn } from '../component/btn'
import { PageStore } from './local-storage'
import { createHistory } from '../../service/route'
import { SidebarItem, Routing } from './navigation'


const history = createHistory({ // NOTE restore last state
  initialEntries: ['/', PageStore.get()],
  initialIndex: 1,
})

const Layout = observer(function Layout () {
  const { menu, isSidebarHidden, isDarkModeEnabled } = layoutStore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(layoutStore.initialize, [])
  // NOTE track active page state
  const { pathname, search } = useLocation()
  // NOTE Store the last visited page
  useEffect(() => { PageStore.set(pathname + search) }, [pathname, search])

  // TODO remove
  // console.log(`%c Layout ${'launcher'} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n history:', history
  //   , '\n pathname:', pathname
  //   , '\n search:', search
  // )

  return <>
    {/* NOTE page header */}
    <div className="flex items-center flex-nowrap bg-primary-800 _bg-alt shadow-xs py-2.5 h-12 fixed z-40 inset-x-0 top-0">
      <mark>menu toggle ?</mark>
      <div className="flex items-end pr-3 mr-3 h-6">
        <button
          onClick={layoutStore.toggleSideBar}
          title={<><strong>{isSidebarHidden ? 'Show' : 'Hide'}</strong> the navigation sidebar</>}
          className="p-0 w-5 h-5 rounded-full flex items-center justify-center ring-offset-black focus:ring-black text-gray-100 hover:text-primary-700"
        >
          <Bars4Icon className="size-4 inline-block" />
        </button>
      </div>
      {/* NOTE header right side */}
      <div className="flex flex-1 items-center justify-end">
        <div className="flex-1"></div>
        <p className="font-bold text-sm text-primary-100 mx-4">currentUser.email</p>
      </div>
    </div>
    <ul className={cn(
      'sidebar overflow-y-auto pt-12 pb-12',
      'bg-alt shadow-inner',
      // NOTE collapsible
      'inset-y-0 absolute w-60 transition-all',
      isSidebarHidden ? '-left-60' : 'left-0',
    )}>
      <li className="p-4">{process.env.SID}</li>
      {_.map(menu, item => <li key={item.name}><SidebarItem {...item} /></li>)}
    </ul>
    <div className={cn('relative h-screen pt-12 transition-all overflow-y-auto shadow-inner', { 'ml-60': !isSidebarHidden })}>
      <Routing />
    </div>
    <Toaster />
  </>
})

createRoot(document.body).render(<Router history={history}>
  <Layout />
</Router>)
