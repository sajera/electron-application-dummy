// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { Bars4Icon } from '@heroicons/react/24/solid'
import { Router, useLocation } from 'react-router-dom'
// local injections ...
import '../style/theme/index.css'
// local dependencies
import { layoutStore } from './store'
import { Btn } from '../component/btn'
import { PageLS } from './local-storage'
import { Spinner } from '../component/loader'
import { Confirmation } from '../component/confirm'
import { createHistory } from '../../service/route'
import { SidebarItem, Routing } from './navigation'


const history = createHistory({ // NOTE restore last state
  initialEntries: ['/', PageLS.get()],
  initialIndex: 1,
})

const Layout = observer(function Layout () {
  const { menu, isSidebarHidden, initialized } = layoutStore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(layoutStore.initialize, [])
  // NOTE track active page state
  const { pathname, search } = useLocation()
  // NOTE Store the last visited page
  useEffect(() => { PageLS.set(pathname + search) }, [pathname, search])

  // FIXME makes sense to use queued loading?
  // return <Loader active={!initialized} className="!h-96">
  return <>
    <div className="flex items-center flex-nowrap bg-primary-800 _bg-alt shadow-xs py-2.5 h-12 fixed z-40 inset-x-0 top-0">
      <div className="flex items-center pr-3 mr-3 h-6">
        <Btn
          onClick={layoutStore.toggleSideBar}
          className="btn-primary flex items-center justify-center"
          title={<><strong>{isSidebarHidden ? 'Show' : 'Hide'}</strong> the navigation sidebar</>}
        >
          <Bars4Icon className="size-6 inline-block" />
          <strong>{isSidebarHidden ? 'Show' : 'Hide'}</strong>&nbsp;navigation
        </Btn>
      </div>
      {/* NOTE header right side */}
      <div className="flex flex-1 items-center justify-end">
        <Spinner active={!initialized} className="mr-2 text-primary-100" />
        <p className="font-bold text-sm text-primary-100 mx-4">@sajera</p>
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
    <div id="ModalPortal" />
    <Confirmation />
    <Toaster />
  </>
// </Loader>
})

createRoot(document.body).render(<Router history={history}>
  <Layout />
</Router>)
