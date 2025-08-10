// outsource dependencies
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useCallback } from 'react'
// local dependencies
import { Toggle } from '../toggle'


export const Switch = observer(function Switch ({ input, error, value, isTouched, className, classNameFormGroup, label, optional, skipTouch, hideError, errorClassName, ...attr }) {
  const touched = Boolean(skipTouch || isTouched)
  const isInvalid = Boolean(error && touched)
  const { onChange } = input
  const handleChange = useCallback(
    () => onChange(!value),
    [value, onChange]
  )

  return <div className={cn('switch', classNameFormGroup)}>
    <Toggle
      label={label}
      { ...attr }
      { ...input }
      checked={Boolean(value)}
      onChange={handleChange}
      className={cn('checkbox flex', className)}
    />
    {!hideError && isInvalid && <label htmlFor={input?.id} className={cn('text-red-400 text-sm pl-0.5 pt-1 m-0', errorClassName)}>
      {error}
    </label>}
    {!isInvalid && optional && <label htmlFor={input?.id} className="flex text-muted text-sm pl-0.5 pt-1 m-0">{optional}</label>}
  </div>
})
