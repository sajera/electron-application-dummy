// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
// local dependencies
import { Btn } from './tooltip'

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
// Dropdown.propTypes = {
//   disabled: PropTypes.bool,
//   containerClassName: PropTypes.string,
//   // @see https://headlessui.com/react/menu#menu-items
//   as: PropTypes.string,
//   modal: PropTypes.bool,
//   portal: PropTypes.bool,
//   static: PropTypes.bool,
//   unmount: PropTypes.bool,
//   trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
//   transition: PropTypes.bool,
//   className: PropTypes.string,
//   containerAs: PropTypes.string,
//   // NOTE anchor will trigger "portal" usage
//   anchor: PropTypes.string,
//   // anchor: PropTypes.shape({
//   //   padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   //   offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   //   gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   //   to: PropTypes.oneOf(['top', 'right', 'bottom', 'left']), // TODO top start or bottom end.
//   // }),
// }
