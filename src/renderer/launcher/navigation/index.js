// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { memo, useCallback, useEffect, useState } from 'react'
// local dependencies
import { SidebarStore } from '../local-storage'
import navigationMenu, { MENU_ITEM_TYPE } from './menu'
import { Collapsible } from '../../component/collapsible'

export * from './routs'
export { navigationMenu }
export { default as Routing } from './routing'


export const SidebarItem = memo(function SidebarItem ({ type, ...attr }) {
  switch (type) {
    default: return <div className="hidden" />
    case MENU_ITEM_TYPE.LINK: return <NavLink { ...attr } />
    case MENU_ITEM_TYPE.MENU: return <NavMenu { ...attr } />
    case MENU_ITEM_TYPE.ACTION: return <Action { ...attr } />
  }
})

const NavLink = memo(function NavLink ({ className, icon: Icon, link, name = '~ ~ ~', isActive, disabled, hidden, onClick }) {
  const { pathname } = useLocation()
  const active = isActive(pathname)
  // TODO verify the case that occurred once and concatenate the paths of the different links
  // console.log(`%c NavLink ${name} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n link:', link
  //   , '\n pathname:', pathname
  // )
  return hidden ? <div className="hidden" /> : <Link to={link} onClick={onClick} className={cn(
    'group flex w-full items-center p-2 hover:opacity-100', className, {
      'opacity-75 pointer-events-none': disabled,
      'hover:text-primary-600': !disabled && !active,
      'text-primary-900 dark:text-primary-500 opacity-90': active,
    })}>
    {Boolean(Icon) && <Icon className="mr-2 h-5 w-5 flex-shrink-0 group-hover:animate-wiggle-once" aria-hidden="true" />}
    { name }
  </Link>
})

const Action = memo(function Action ({ className, icon: Icon, action, name = '~ ~ ~', isActive, onClick, hidden, disabled }) {
  const { pathname } = useLocation()
  const active = isActive(pathname)
  const handleClick = useCallback(event => {
    _.isFunction(action) && action(event)
    _.isFunction(onClick) && onClick(event)
  }, [onClick, action])

  return hidden ? <div className="hidden" /> : <button type="button" onClick={handleClick} className={cn(
    'group flex w-full items-center p-2 hover:opacity-100', className, {
      'opacity-75 pointer-events-none': disabled,
      'hover:text-primary-600': !disabled && !active,
      'text-primary-900 dark:text-primary-500 opacity-90': active,
    })}>
    {Boolean(Icon) && <Icon className="mr-2 h-5 w-5 flex-shrink-0 group-hover:animate-wiggle-once" aria-hidden="true" />}
    { name }
  </button>
})

const NavMenu = memo(function NavMenu ({ icon: Icon, name = '~ ~ ~', isActive, onClick, list, hidden, disabled }) {
  const { pathname } = useLocation()
  // NOTE required to rerender each time when location change
  const storage = SidebarStore.get()
  const active = isActive && isActive(pathname)
  const [isOpen, setIsOpen] = useState(typeof storage[name] === 'undefined' ? true : storage[name] || active)
  useEffect(() => SidebarStore.update({ [name]: isOpen }), [name, isOpen])

  const handleOpenChange = useCallback(() => setIsOpen(state => !state), [])

  return hidden ? <div className="hidden" /> : <div className="relative overflow-hidden">
    <button onClick={handleOpenChange} className={cn('w-full cursor-pointer group flex items-center p-2 hover:opacity-100 font-bold', {
      'opacity-75 pointer-events-none': disabled,
      'hover:text-primary-800': !disabled && !active,
      'text-primary-900 dark:text-primary-300 opacity-90': active,
    })}>
      <ChevronRightIcon aria-hidden="true" className={cn('h-4 w-4 transition-transform', { 'rotate-90': isOpen })} />
      {Boolean(Icon) && <Icon className="ml-2 h-5 w-5 flex-shrink-0 group-hover:animate-wiggle-once" aria-hidden="true" />}
      <span className="ml-2">{name}</span>
    </button>
    <Collapsible tag="ul" isOpen={isOpen} className="pl-6 text-sm">
      {_.map(list, item => <li key={item.name}>
        <SidebarItem { ...item } onClick={onClick} />
      </li>)}
    </Collapsible>
  </div>
})
