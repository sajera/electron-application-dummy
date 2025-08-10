// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import React, { memo } from 'react'
import { ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
// local dependencies
import { Btn } from './btn'


export const ErrorMessage = memo(function ErrorMessage ({ message, title, onClear, className }) {

  return !message ? null : <div className={cn(
    className,
    'error-message flex items-center rounded-md p-3',
    'text-red-700 dark:text-red-200 bg-red-50 dark:bg-red-950',
    'border border-red-200 dark:border-red-700',
  )}>
    <div className="flex justify-start pr-2">
      <ExclamationTriangleIcon className="w-5 size-5 text-red-500" aria-hidden="true" />
    </div>
    <div>
      {_.isArray(message) ? <>
        { !title ? null : <h3 className="text-sm font-medium">{title}</h3> }
        <div className="pt-2 text-sm font-thin">
          <ul className="list-disc space-y-1 pl-5 break-all">
            {_.map(message, (message, index) => !message ? null : <li key={index}>{message}</li>)}
          </ul>
        </div>
      </> : <>
        <h3 className="text-sm font-medium">
          {title}
          <small className="text-sm font-thin break-all">{message}</small>
        </h3>
      </>}
    </div>
    { _.isFunction(onClear) && <div className="ml-auto pl-3 -my-1.5 -mr-1.5">
      <Btn type="button" className="btn-danger-outline rounded-md opacity-65" onClick={onClear}>
        <span className="sr-only"> Dismiss </span>
        <XMarkIcon className="size-5" aria-hidden="true" />
      </Btn>
    </div> }
  </div>
})

export const WarningMessage = memo(function WarningMessage ({ tag: Tag = 'div', message, title, className, titleClassName = 'pr-2', ...attr }) {
  return !message ? null : <Tag {...attr} className={cn(
    className,
    'bg-yellow-50 dark:bg-yellow-950',
    'flex items-center rounded-md p-3',
    'text-yellow-700 dark:text-yellow-100',
    'border border-yellow-200 dark:border-yellow-700',
  )}>
    <div className={cn('flex items-center justify-start', titleClassName)}>
      <ExclamationTriangleIcon className="w-6 size-6 text-yellow-600 -mb-0.5 mr-2" aria-hidden="true" />
      <strong className="whitespace-nowrap">{title}</strong>
    </div>
    <div className="text-sm font-thin"> {message} </div>
  </Tag>
})

export const SuccessMessage = memo(function SuccessMessage ({ tag: Tag = 'div', message, title, className, titleClassName = 'pr-2', ...attr }) {

  return !message ? null : <Tag {...attr} className={cn(
    className,
    'bg-green-50 dark:bg-green-950',
    'flex items-center rounded-md p-3',
    'text-green-700 dark:text-green-100',
    'border border-green-200 dark:border-green-700',
  )}>
    <div className={cn('flex items-center justify-start', titleClassName)}>
      <CheckCircleIcon className="w-6 size-6 text-green-600 -mb-0.5 mr-2" aria-hidden="true" />
      <strong className="whitespace-nowrap">{title}</strong>
    </div>
    <div className="text-sm font-thin"> {message} </div>
  </Tag>
})
