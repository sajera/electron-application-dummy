// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
// local dependencies
import { Cog6ToothIcon as CogIcon } from '@heroicons/react/24/solid'

export default memo(function Health ({ className }) {
  return <div
      className={cn('maintenance flex items-center', className)}
      id="Maintenance"
         >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 text-center">
      <h1 className="mb-3 relative flex items-end">
        <CogIcon className="animate-spin-slow inline-block text-indigo-500 w-28" />

        <CogIcon className="animate-spin-slow inline-block text-green-500 w-40 -mx-6" />

        <CogIcon className="animate-spin-slow inline-block text-yellow-600 w-16 -ml-2" />

        <span className="absolute top-3 left-12">
          <CogIcon className="animate-bounce inline-block text-red-700 w-16" />
        </span>
      </h1>

      <h2 className="text-2xl font-medium text-gray-400"> SITE IS UNDER MAINTENANCE </h2>

      <h5 className="text-xl font-medium text-gray-500"> We&#39;ll back online shortly! </h5>
    </div>
  </div>
})
