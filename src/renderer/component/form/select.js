// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import ReactSelect from 'react-select'
import ReactCreatableSelect from 'react-select/creatable'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
// local dependencies
import { useRefCallback } from '../hook'

// FIXME
const inputProps = { autoComplete: 'none', list: 'autoCompleteOff' }


export const Select = memo(function Select ({ input, error, value, isTouched, skipTouch, label, classNameFormGroup, isCreatable, className, disabled, onInputChange, clearOnUnmount, isSimple, defaultValue, getOptionValue, options, isMulti, isLoading, hideError, optional, errorClassName, ...attr }) {
  const { onChange } = input
  const touched = Boolean(skipTouch || isTouched)
  const isInvalid = Boolean(error && touched)
  // NOTE controlled feature to clearing redux form field value on component unmount
  useEffect(() => clearOnUnmount ? () => onChange(null) : void 0, [onChange, clearOnUnmount])
  const handleInputChange = useCallback((text, prevAction) => {
    if (!_.isFunction(onInputChange)) return
    if (_.get(prevAction, 'prevInputValue') === text) return
    onInputChange({ text })
  }, [onInputChange])
  // NOTE to allow form control touches
  const Component = useMemo(() => isCreatable ? ReactCreatableSelect : ReactSelect, [isCreatable])
  // NOTE provide ability to set into form only value from option object
  const handleChange = useCallback(
    newValue => isSimple ? onChange(isMulti ? _.map(newValue, getOptionValue) : getOptionValue(newValue)) : onChange(newValue),
    [onChange, getOptionValue, isSimple, isMulti]
  )
  const val = useMemo(
    () => isSimple ? (isMulti ? getMultiValue : getValue)(options, value, getOptionValue) : value,
    [options, value, getOptionValue, isSimple, isMulti]
  )
  // NOTE in case clearing value via redux we might faced with cached value within Select
  const [select, ref] = useRefCallback()
  useEffect(() => {
    if (_.isUndefined(val) && select && !value) {
      select.clearValue()
    }
  }, [val, value, select])

  return <div className={cn('select', classNameFormGroup)}>
    {label && <label htmlFor={input.id} className={cn('block mb-2', { 'text-red-900': isInvalid })}>{label}</label>}
    <Component
      // menuIsOpen
      ref={ref}
      inputId={input.id}
      autoComplete="off"
      inputProps={inputProps}
      onInputChange={handleInputChange}
      { ...attr }
      { ...input }
      value={val}
      isMulti={isMulti}
      options={options}
      isDisabled={disabled}
      isLoading={isLoading}
      onChange={handleChange}
      getOptionValue={getOptionValue}
      unstyled
      classNames={rsClassNames}
      classNamePrefix="select-field"
      className={cn('select-field', className, {
        untouched: !touched,
        valid: touched && !isInvalid,
        invalid: touched && isInvalid && !isLoading,
      })}
    />
    {!hideError && isInvalid && <label htmlFor={input?.id} className={cn('text-red-400 text-sm pl-0.5 pt-1 m-0', errorClassName)}>
      {error}
    </label>}
    {!isInvalid && optional && <label htmlFor={input?.id} className="flex text-muted text-sm pl-0.5 pt-1 m-0">{optional}</label>}
  </div>
})

function getValue (options, value, getOptionValue) {
  // NOTE incorrect checks lead to impossible to select false value as 0|null|false
  if (_.isUndefined(value)) { return value }
  return _.find(options, o => getOptionValue(o) === value)
}

function getMultiValue (options, value, getOptionValue) {
  // console.log('%c getMultiValue ', 'color: #FF6766; font-weight: bolder;'
  //   , '\n options:', options
  //   , '\n value:', value
  // );
  return _.map(value, o => getValue(options, o, getOptionValue))
}

const rsClassNames = {
  dropdownIndicator: () => 'cursor-pointer !text-gray-400 hover:!text-gray-950 dark:!hover:text-gray-100 p-1',
  clearIndicator: () => 'cursor-pointer !text-gray-400 hover:!text-gray-950 dark:!hover:text-gray-100 p-1',
  indicatorSeparator: () => '!bg-gray-400 my-2',
  loadingIndicator: () => '!text-gray-400 p-1',
  container: () => 'bg-white dark:bg-gray-800',
  control: () => 'rounded font-medium focus-within:outline-none !min-h-10',
  group: () => cn('py-2'),
  groupHeading: () =>
    cn(
      'text-neutral-400',
      'text-xs',
      'font-medium',
      'mb-1',
      'px-3',
      'uppercase'
    ),
  input: () => 'text-gray-900 dark:text-gray-200 dark:shadow-gray-700 py-px m-0.5',
  menu: () => 'my-2',
  loadingMessage: () => cn('text-neutral-400', 'py-1', 'px-3'),
  menuList: () => cn('overflow-hidden bg-alt rounded-md shadow-lg border border-alt divide-y divide-gray-400'),
  multiValue: () => 'border rounded text-gray-900 dark:text-gray-200 p-0.5 m-0.5',
  multiValueLabel: () => 'rounded-sm text-gray-900 dark:text-gray-200 text-sm p-0.5 pl-2',
  multiValueRemove: ({ isFocused }) => cn('px-1 rounded-sm border border-red-400 text-red-400 hover:bg-red-100 dark:hover:bg-red-900 ', { 'bg-red-500': isFocused }),
  noOptionsMessage: () => 'text-gray-900 dark:text-gray-200 py-1 px-3',
  // option: () => 'w-full text-left bg-alt hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1 truncate',
  option: ({ isDisabled, isFocused, isSelected }) => cn('text-body bg-alt py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800', {
    '!bg-primary-100 dark:!bg-primary-800': isSelected,
    'pointer-events-none opacity-50': isDisabled,
    '!cursor-pointer': !isSelected,
    // '!bg-red-800': isFocused,
  }),
  placeholder: () => 'mx-0.5 !text-gray-500',
  valueContainer: () => cn('py-px', 'px-2'),
  singleValue: ({ isDisabled }) => cn('mx-0.5', isDisabled ? '!text-gray-800 dark:!text-gray-300' : '!text-gray-900 dark:!text-gray-200'),
}
