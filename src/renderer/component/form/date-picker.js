// outsource dependencies
import dayjs from 'dayjs'
import cn from 'classnames'
import { observer } from 'mobx-react'
import ReactDatePicker from 'react-datepicker'
import React, { useMemo, useCallback } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
// local dependencies
import { Spinner } from '../loader'

// configure
const FORMAT = 'YYYY-MM-DDTHH:mm:ss'
export const toDate = date => dayjs(date || void(0)).toDate()
// NOTE sadly, the 'react-datepicker' doesn't support UTC dates. Let's convert the dates to make them suitable for the UI
export const utcAsLocal = date => dayjs(dayjs.utc(date || void(0)).format(FORMAT)).toDate()
export const localAsUTC = date => dayjs.utc(dayjs(date || void(0)).format(FORMAT)).toDate()

 
export const DatePicker = observer(function DatePicker ({ input, error, value, isTouched, className, classNameFormGroup, optional, label, hideError, skipTouch, isLoading, checkmark, clearable, disabled, errorClassName, asIs, toUtc, ...attr }) {
  const { onChange } = input
  const touched = Boolean(skipTouch || isTouched)
  const isInvalid = Boolean(error && touched)
  const v = useMemo(() => asIs ? value : toUtc ? utcAsLocal(value) : toDate(value), [value, toUtc, asIs])

  const handleClear = useCallback(() => onChange(''), [onChange])
  const handleChange = useCallback(date => onChange(toUtc ? localAsUTC(date) : toDate(date)), [onChange, toUtc])

  return <div className={cn('date-picker-wrapper', classNameFormGroup)}>
    {label && <label htmlFor={input?.id} className={cn('block mb-2', { 'text-red-900': isInvalid })}>{label}</label>}
    <div className={cn('relative', !disabled ? null : 'pointer-events-none bg-gray-50 dark:bg-gray-900 opacity-80')}>
      <ReactDatePicker
        { ...attr }
        { ...input }
        selected={v}
        onChange={handleChange}
        className={cn('input-field h-10 date-picker', className, {
          untouched: !touched,
          valid: touched && !isInvalid,
          invalid: touched && isInvalid && !isLoading,
          'pr-8': checkmark || clearable || isLoading, // NOTE might be only one of them at one time
        })}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isLoading ? <Spinner active={isLoading} size="18" />
          : checkmark ? (!touched ? null : !isInvalid
            ? <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            : <ExclamationCircleIcon className="h-5 w-5 text-red-300" aria-hidden="true" />)
            : clearable ? !value ? null : <XMarkIcon
              role="button"
              onClick={handleClear}
              className="pointer-events-auto h-5 w-5 text-gray-400 hover:text-gray-950 dark:hover:text-gray-100 cursor-pointer"
            /> : null}
      </div>
    </div>
    {!hideError && isInvalid && <label htmlFor={input?.id} className={cn('text-red-400 text-sm pl-0.5 pt-1 m-0', errorClassName)}>
      {error}
    </label>}
    {!isInvalid && optional && <label htmlFor={input?.id} className="flex text-muted text-sm pl-0.5 pt-1 m-0">{optional}</label>}
  </div>
})
