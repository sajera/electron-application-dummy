// outsource dependencies
import cn from 'classnames'
import { GithubPicker } from 'react-color'
import { CubeIcon } from '@heroicons/react/24/solid'
import React, { useCallback, memo, useMemo, useState } from 'react'
// local dependencies
import { Spinner } from '../loader'

// configure
export const isValidHexColor = value => /^#([0-9a-f]{3,3}|[0-9a-f]{6,6})$/i.test(value)
export const COLORS = [
  '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF',
  '#FDA1FF', '#333333', '#808080', '#B3B3B3', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#666666', '#9F0500', '#B0BC00',
  '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
]


export const Color = memo(function Color ({ input, error, value, isTouched, skipTouch, isLoading, className, classNameFormGroup, optional, label, errorClassName, hideError, type, checkmark, leading, inLabel, clearable, disabled, colors, ...attr }) {
  const { onChange, onBlur } = input
  const touched = Boolean(skipTouch || isTouched)
  const isInvalid = Boolean(error && touched)

  const [isShown, setShow] = useState(false)
  const validColor = useMemo(() => isValidHexColor(value) ? value : '#FFF', [value])
  const handleChange = useCallback(event => {
    setShow(false)
    onChange(event.target.value)
  }, [onChange])
  const handleChangeColor = useCallback(({ hex }) => input.onChange(hex), [input])

  const handleFocus = useCallback(() => setShow(true), [])
  const handleBlur = useCallback(e => {
    onBlur && onBlur(e)
    setTimeout(setShow, 3e2, false)
  }, [onBlur])
  const handleKeyDown = useCallback(event => {
    // console.log(`%c handleKeyDown ${value}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n event:', event
    //   , '\n code:', event?.code
    //   , '\n keyCode:', event?.keyCode
    // )
    switch (event?.keyCode) {
      default: return setShow(true)
      case 27: return setShow(false)
    }
  }, [])

  return <div className={cn('input', classNameFormGroup)}>
    {label && <label htmlFor={input?.id} className={cn('block mb-2', { 'text-red-900': isInvalid })}>{label}</label>}
    <div className={cn('relative', !disabled ? null : 'pointer-events-none bg-gray-50 dark:bg-gray-900 opacity-80')}>
      {leading && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{leading}</div>}
      <input
        dir="auto"
        autoComplete="off"
        { ...attr }
        { ...input }
        value={value || ''}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn('input-field', className, {
          untouched: !touched,
          valid: touched && !isInvalid,
          invalid: touched && isInvalid && !isLoading,
          'pr-8': checkmark || clearable || isLoading, // NOTE might be only one of them at one time
        })}
      />
      {inLabel && <label htmlFor={input?.id} className={cn('block absolute pointer-events-none top-2 text-muted w-full pt-px', { 'text-red-900': isInvalid })}>
        <span className="opacity-0 mr-5">{value || ' '}</span>{inLabel}
      </label>}
      {/* NOTE the icon place */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isLoading ? <Spinner active={isLoading} size="18" />
          : <CubeIcon className="h-5 w-5" style={{ color: value || 'transparent' }} aria-hidden="true" />}
      </div>
      {isShown && <div className="absolute mt-2 z-10">
        <GithubPicker
          width={212}
          colors={colors || COLORS}
          onChange={handleChangeColor}
          color={{ hex: validColor }}
        />
      </div>}
    </div>
    {!hideError && isInvalid && <label htmlFor={input?.id} className={cn('flex text-red-400 text-sm pl-0.5 pt-1', errorClassName)}>
      {error}
    </label>}
    {!isInvalid && optional && <label htmlFor={input?.id} className="flex text-muted text-sm pl-0.5 pt-1">{optional}</label>}
  </div>
})
