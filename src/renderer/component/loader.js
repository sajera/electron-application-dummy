// outsource dependencies
import cn from 'classnames'
import React, { memo, useMemo } from 'react'
// local dependencies

/**
 * contain logic to hide elements which wrapped by preloader
 */
export const withLoader = fn => ({ active = false, children = null, ...attr }) => !active ? children : fn(attr)

export const NotchIcon = memo(function NotchIcon ({ className, ...attr }) {
  return <svg width="24" height="24" fill="none" role="img" viewBox="0 0 24 24" aria-hidden="true" {...attr} className={cn('dot-icon', className)} xmlns="http://www.w3.org/2000/svg">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
})

/**
 * Prepared Spinner
 */
export const Spinner = withLoader(function Spinner ({ className, size = 15, ...attr }) {
  const style = useMemo(() => !size ? {} : ({ width: size, minWidth: size, height: size, minHeight: size }), [size])
  return <NotchIcon style={style} {...attr} className={cn('app-spinner animate-spin inline-block', className)} />
})
/**
 * Prepared Loader
 */
export const Loader = withLoader(function Loader ({ className, title = 'Data is loading...', size = 120, ...attr }) {
  return <div className={cn('app-loader relative w-full h-full flex items-center justify-center', className)} { ...attr }>
    <div className="text-center">
      <Spinner active size={size} />
      {title &&<h3 className="font-bold text-muted pt-2 px-4">{title}</h3>}
    </div>
  </div>
})
