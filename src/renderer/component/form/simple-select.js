// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import React, { useCallback, memo, useState } from 'react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
// local dependencies
import { Spinner } from '../loader'


export const SimpleSelect = memo(function SimpleSelect ({ input, error, value, isTouched, skipTouch, isLoading, className, classNameFormGroup, optional, label, options, optionItem: OptionItem, errorClassName, hideError, type = 'text', leading, ending, clearable, disabled, ...attr }) {
  const { onChange, onBlur } = input
  const touched = Boolean(skipTouch || isTouched)
  const isInvalid = Boolean(error && touched)

  const [isOptionsShown, setShowOptions] = useState(false)
  const handleFocus = useCallback(() => setShowOptions(true), [])
  const handleBlur = useCallback(e => {
    onBlur(e)
    setTimeout(setShowOptions, 3e2, false)
  }, [onBlur])
  const handleKeyDown = useCallback(event => {
    // console.log(`%c handleKeyDown ${localValue}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n event:', event
    //   , '\n code:', event?.code
    //   , '\n keyCode:', event?.keyCode
    // )
    switch (event?.keyCode) {
      default: return setShowOptions(true)
      case 27: return setShowOptions(false)
    }
  }, [])

  // NOTE prepare input actions
  const handleClear = useCallback(() => onChange(''), [onChange])
  const handleChange = useCallback(() => {}, [])

  return <div className={cn('simple-select', classNameFormGroup)}>
    {label && <label htmlFor={input?.id} className={cn('block mb-2', { 'text-red-900': isInvalid })}>{label}</label>}
    <div className={cn('relative', !disabled ? null : 'pointer-events-none bg-gray-50 dark:bg-gray-900 opacity-80')}>
      {leading && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{leading}</div>}
      <input
        type={type}
        autoComplete="off"
        { ...attr }
        { ...input }
        readOnly
        value={value || ''}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn('input-field h-10 pr-8', className, {
          untouched: !touched,
          'cursor-pointer': !disabled,
          valid: touched && !isInvalid,
          invalid: touched && isInvalid && !isLoading,
        })}
      />
      {ending && <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center pl-3">{ending}</div>}
      {/* NOTE the icon place */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isLoading ? <Spinner active={isLoading} className="size-5" />
          : clearable && !value ? <XMarkIcon
            role="button"
            onClick={handleClear}
            className="pointer-events-auto size-5 text-gray-400 hover:text-gray-950 dark:hover:text-gray-100 cursor-pointer"
          /> : <ChevronDownIcon
            className="pointer-events-none size-5 text-gray-400 hover:text-gray-950 dark:hover:text-gray-100 cursor-pointer"
          />}
      </div>
      {isOptionsShown && <ul className="absolute w-full overflow-y-auto max-h-36 rounded-md shadow-lg border border-alt divide-y divide-gray-400 mt-2 z-10">
        {_.map(options, item => <li key={item} className="overflow-hidden">
          <button type="button" onMouseDown={() => onChange(item)} className="w-full text-left bg-alt hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 truncate">
            {!OptionItem ? item : <OptionItem item={item} />}
          </button>
        </li>)}
      </ul>}
    </div>
    {!hideError && isInvalid && <label htmlFor={input?.id} className={cn('text-red-400 text-sm pl-0.5 pt-1 m-0', errorClassName)}>
      {error}
    </label>}
    {!isInvalid && optional && <label htmlFor={input?.id} className="flex text-muted text-sm pl-0.5 pt-1 m-0">{optional}</label>}
  </div>
})
