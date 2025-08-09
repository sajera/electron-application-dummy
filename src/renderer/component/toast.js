// outsource dependencies
import React from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export const hot = toast

export default {
  hot,
  success: (body, header) => pushToast({ type: 'SUCCESS', icon: CheckCircleIcon, header: header || 'Success', body: body }),
  info: (body, header) => pushToast({ type: 'INFO', icon: InformationCircleIcon, header: header || 'Information', body: body }),
  error: (body, header) => pushToast({ type: 'ERROR', icon: ExclamationCircleIcon, header: header || 'Error', body: body || 'We\'re sorry! Something went wrong' }),
}

// NOTE simple adopted toasts
export function pushToast ({ type, icon: Icon, header, body, ...attr }) {
  // console.info(`%c toast ${type} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n Icon:', Icon
  //   , '\n defBody:', defBody
  //   , '\n defHeader:', defHeader
  // )
  // TODO bg-alt text-alt ???
  // NOTE returns toast id to allow removing it
  return toast.custom(t => <div className="w-full max-w-sm bg-alt text-alt overflow-hidden rounded-lg shadow-xl" role="alert">
    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-2 pl-4">
      <span className={cn('text-sm font-semibold', {
        'text-green-800 dark:text-green-500': type === 'SUCCESS',
        'text-blue-800 dark:text-blue-500': type === 'INFO',
        'text-red-800 dark:text-red-500': type === 'ERROR',
      })}>
        {header || '~ ~ ~'}
      </span>
      <button onClick={() => toast.remove(t.id)} className="btn shadow-none p-0 mr-2" aria-label="Close">
        <XMarkIcon className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </button>
    </div>
    <div className="flex items-center bg-body text-body p-2">
      <span><Icon className={cn('w-6 h-6 ml-1', {
        'text-green-600': type === 'SUCCESS',
        'text-blue-600': type === 'INFO',
        'text-red-500': type === 'ERROR',
      })} />
      </span>
      <div className="text-sm font-normal ml-2 break-all">{body || '~ ~ ~'}</div>
    </div>
  </div>, { position: 'top-right', duration: 6e3, ...attr })
}
