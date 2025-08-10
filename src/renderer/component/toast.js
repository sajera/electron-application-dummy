// outsource dependencies
import React from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export const hot = toast

export default {
  hot,
  pushToast,
  success: (body, header) => pushToast({
    body: body,
    icon: CheckCircleIcon,
    header: header || 'Success',
    iconClassName: 'text-green-600',
    headerClassName: 'text-green-800 dark:text-green-500',
  }),
  info: (body, header) => pushToast({
    body: body,
    icon: InformationCircleIcon,
    header: header || 'Information',
    iconClassName: 'text-blue-600',
    headerClassName: 'text-blue-800 dark:text-blue-500',
  }),
  error: (body, header) => pushToast({
    header: header || 'Error',
    icon: ExclamationCircleIcon,
    body: body || 'We\'re sorry! Something went wrong',
    iconClassName: 'text-red-500',
    headerClassName: 'text-red-800 dark:text-red-500',
  }),
}

// NOTE simple adopted toasts
function pushToast ({ icon: Icon, header, body, iconClassName, headerClassName, ...attr }) {
  // console.info(`%c toast ${header} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n Icon:', Icon
  //   , '\n body:', body
  //   , '\n iconClassName:', iconClassName
  //   , '\n headerClassName:', headerClassName
  // )
  // TODO bg-alt text-alt ???
  // NOTE returns toast id to allow removing it
  return toast.custom(t => <div className="w-full max-w-sm bg-alt overflow-hidden rounded-lg shadow-xl" role="alert">
    <div className="flex items-center justify-between border-b border-gray-100 dark:!border-gray-900 py-2 pl-4">
      <span className={cn('text-sm font-semibold', headerClassName)}>
        {header || '~ ~ ~'}
      </span>
      <button onClick={() => toast.remove(t.id)} className="btn shadow-none p-0 mr-2" aria-label="Close">
        <XMarkIcon className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </button>
    </div>
    <div className="flex items-center shadow-inner bg-body p-2">
      <span><Icon className={cn('w-6 h-6 ml-1', iconClassName)} />
      </span>
      <div className="text-sm font-normal ml-2 break-all">{body || '~ ~ ~'}</div>
    </div>
  </div>, { position: 'bottom-right', duration: 6e3, ...attr })
}
