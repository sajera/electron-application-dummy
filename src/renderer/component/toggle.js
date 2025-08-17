// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
// local dependencies
import '../style/component/toggle.css'

export const Toggle = memo(function Toggle ({ label, className, toggleClassName, ...attr }) {
  return <label className={cn('inline-flex flex-grow-0 items-center cursor-pointer', className)}>
    <input value="" checked {...attr} type="checkbox" className="sr-only peer" />
    <div className={cn('toggle peer', toggleClassName)} />
    <span className="ms-2">{label}</span>
  </label>
})
