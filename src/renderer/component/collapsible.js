// outsource dependencies
import cn from 'classnames'
import React, { memo, useEffect, useState } from 'react'
// local dependencies
import { useRefCallback } from './hook'

export const Collapsible = memo(function Collapsible ({ tag: Tag = 'div', subTag: SubTag = 'div', className, style, isOpen, children, openClassName, ...attr }) {
  const [container, ref] = useRefCallback()
  const [height, setHeight] = useState(50)
  const [trans, setTrans] = useState(false)
  useEffect(() => {
    if (container) {
      setHeight(container.getBoundingClientRect()?.height)
      // console.log(`%c Collapsible ${height} `, 'color: #FF6766; font-weight: bolder;'
      //   , '\n height:', height
      //   , '\n container:', container
      //   , '\n rect:', container.getBoundingClientRect()
      // )
    }
  }, [container, children])

  return <Tag
    { ...attr }
    style={{ height: isOpen ? height : 0 }}
    onTransitionEnd={() => setTrans(false)}
    onTransitionStart={() => setTrans(true)}
    className={cn(
      'relative overflow-hidden transition-[height] duration-200',
      { [openClassName]: !trans && isOpen },
      className
    )}
  >
    {children}
    <Tag className="absolute top-0 invisible">
      <SubTag ref={ref} className="relative overflow-hidden">
        {children}
      </SubTag>
    </Tag>
  </Tag>
})
