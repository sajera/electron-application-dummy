// outsource dependencies
import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useState } from 'react'
// local dependencies
import { useRefCallback } from './hook'

export const Collapsible = memo(function Collapsible ({ tag: Tag = 'div', className, style, isOpen, children, ...attr }) {
  const [container, ref] = useRefCallback()
  const [height, setHeight] = useState(50)
  const [show, setShow] = useState(true)
  useEffect(() => {
    if (container) {
      setHeight(container.getBoundingClientRect()?.height)
      setShow(false)
      // console.log(`%c Collapsible ${height} `, 'color: #FF6766; font-weight: bolder;'
      //   , '\n height:', height
      //   , '\n container:', container
      //   , '\n rect:', container.getBoundingClientRect()
      // )
    }
  }, [container])

  return <>
    <Tag { ...attr } style={{ height: isOpen ? height : 0 }} className={cn('overflow-hidden transition-[height] duration-200', className)}>
      {children}
    </Tag>
    {/* FIXME find place to render element outside */}
    {show && <Tag ref={ref} className={cn('invisible overflow-hidden transition-[height] duration-200', className)}>{children}</Tag>}
  </>
})
Collapsible.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node, PropTypes.object]),
}
