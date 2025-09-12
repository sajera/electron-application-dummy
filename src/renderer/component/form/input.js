// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import React, { useCallback, memo, useMemo, useState } from 'react'
import { ExclamationCircleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
// local dependencies
import { Spinner } from '../loader'
import { safeRegExp } from '../../../service'


export const Input = memo(function Input ({ input, error, value, isTouched, skipTouch, isLoading, className, classNameFormGroup, optional, label, inLabel, suggestions, suggestionItem: SuggestionItem, errorClassName, hideError, type = 'text', checkmark, leading, clearable, disabled, ...attr }) {
  const { onChange, onBlur } = input
  const InputTag = useMemo(() => type === 'textarea' ? 'textarea' : 'input', [type])
  const touched = Boolean(skipTouch || isTouched)
  const isInvalid = Boolean(error && touched)

  const [isSuggestionsShown, setShowSuggestions] = useState(false)
  const handleFocus = useCallback(() => setShowSuggestions(true), [])
  const handleBlur = useCallback(e => {
    onBlur && onBlur(e)
    setTimeout(setShowSuggestions, 3e2, false)
  }, [onBlur])
  const handleKeyDown = useCallback(event => {
    // console.log(`%c handleKeyDown ${value}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n event:', event
    //   , '\n code:', event?.code
    //   , '\n keyCode:', event?.keyCode
    // )
    switch (event?.keyCode) {
      default: return setShowSuggestions(true)
      case 27: return setShowSuggestions(false)
    }
  }, [])

  const list = useMemo(() => {
    if (!value) return suggestions
    const reg = safeRegExp(value || '.', 'i')
    return _.filter(suggestions, item => item && reg.test(String(item)) && item !== value)
  }, [value, suggestions])
  // NOTE prepare input actions
  const handleClear = useCallback(() => onChange(''), [onChange])
  const handleChange = useCallback(event => {
    let value = event.target.value
    // NOTE in case "number" input and
    type === 'number' && value && !isNaN(value) && (value = Number(value))
    onChange(value)
  }, [onChange, type])

  return <div className={cn('input', classNameFormGroup)}>
    {label && <label htmlFor={input?.id} className={cn('block mb-2', { 'text-red-900': isInvalid })}>{label}</label>}
    <div className={cn('relative', !disabled ? null : 'pointer-events-none bg-gray-50 dark:bg-gray-900 opacity-80')}>
      {leading && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{leading}</div>}
      <InputTag
        dir="auto"
        type={type}
        autoComplete="off"
        { ...attr }
        { ...input }
        value={[null, void(0)].includes(value) ? '' : value}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn('input-field', className, {
          untouched: !touched,
          'h-10': type !== 'textarea',
          valid: touched && !isInvalid,
          invalid: touched && isInvalid && !isLoading,
          'pr-8': checkmark || clearable || isLoading, // NOTE might be only one of them at one time
        })}
      />
      {inLabel && <label htmlFor={input?.id} className={cn('block absolute pointer-events-none top-2 text-muted w-full', { 'text-red-900': isInvalid })}>
        <span className="opacity-0 mr-5">{value || ''}</span>{inLabel}
      </label>}
      {/* NOTE the icon place */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isLoading ? <Spinner active={isLoading} className="size-5" />
          : checkmark ? (!touched ? null : !isInvalid
            ? <CheckCircleIcon className="size-5 text-green-400" aria-hidden="true" />
            : <ExclamationCircleIcon className="size-5 text-red-300" aria-hidden="true" />)
            : clearable ? !value ? null : <XMarkIcon
              role="button"
              onClick={handleClear}
              className="pointer-events-auto h-5 w-5 text-gray-400 hover:text-gray-950 dark:hover:text-gray-100 cursor-pointer"
            /> : null}
      </div>
      {!_.isEmpty(list) && isSuggestionsShown && <ul className="absolute w-full overflow-y-auto max-h-36 rounded-md shadow-lg border border-alt divide-y divide-gray-400 mt-2 z-10">
        {_.map(suggestions, item => <li key={item} className="overflow-hidden">
          <button type="button" onMouseDown={() => onChange(item)} className="w-full text-left bg-alt hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 truncate">
            {!SuggestionItem ? item : <SuggestionItem item={item} />}
          </button>
        </li>)}
      </ul>}
    </div>
    {!hideError && isInvalid && <label htmlFor={input?.id} className={cn('flex text-red-400 text-sm pl-0.5 pt-1', errorClassName)}>
      {error}
    </label>}
    {!isInvalid && optional && <label htmlFor={input?.id} className="flex text-muted text-sm pl-0.5 pt-1">{optional}</label>}
  </div>
})
