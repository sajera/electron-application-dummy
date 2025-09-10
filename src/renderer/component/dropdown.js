// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
// local dependencies
import { Btn } from './btn'

const defTrigger = ({ active }) => <Btn className={cn('btn-dropdown-toggle', { active })}>
  <ChevronDownIcon aria-hidden="true" className={cn('inline w-5', { 'rotate-180': active })} />
</Btn>
export const Dropdown = memo(function Dropdown ({ containerClassName, trigger = defTrigger, children, containerAs = 'div', className, ...menuOptions }) {
  // console.info(`%c Dropdown ${containerClassName} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n menuOptions:', menuOptions
  //   , '\n children:', children
  // )
  return <Menu as={containerAs} className={cn('dropdown relative', containerClassName)}>
    <MenuButton as="div">{trigger || <i>~ ~ ~</i>}</MenuButton>
    <MenuItems as="div" className={cn('dropdown-menu outline-none shadow', className)} {...menuOptions}>{children}</MenuItems>
  </Menu>
})
Dropdown.Item = MenuItem
