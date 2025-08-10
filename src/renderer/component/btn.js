// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
// local dependencies
import '../style/component/btn.css'
import { Tooltip } from './tooltip'

export const Btn = memo(function Btn ({ className, children, title, ...attr }) {

  return <Tooltip
    delayShow="1200"
    delayHide="150"
    placement="top"
    type="button"
    tag="button"
    {...attr}
    content={title}
    className={cn('btn', className)}
  >
    {children}
  </Tooltip>
})
