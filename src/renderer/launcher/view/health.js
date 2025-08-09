// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
// local dependencies
import { Cog6ToothIcon as CogIcon } from '@heroicons/react/24/solid'

export default memo(function Health ({ className }) {
  return <div className={cn('health flex items-center', className)} id="Maintenance">
    <div className="mx-auto max-w-7xl p-4 text-center">
      <div className="mb-3 relative inline-flex items-end mx-auto">
        <CogIcon className="animate-spin-slow inline-block text-indigo-500 w-28" />
        <CogIcon className="animate-wiggle inline-block text-green-500 w-40 -mx-6" />
        <CogIcon className="animate-spin inline-block text-yellow-600 w-16 -ml-2" />
        <span className="absolute top-3 left-12">
          <CogIcon className="animate-bounce inline-block text-red-700 w-16" />
        </span>
      </div>

      <h2 className="text-2xl font-medium text-gray-400">Something went wrong...</h2>
      <h5 className="text-xl font-medium text-gray-500">We apologise and are working hard to fix the problem</h5>
    </div>
  </div>
})
