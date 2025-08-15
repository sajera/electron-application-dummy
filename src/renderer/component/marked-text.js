// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import React, { memo, useMemo } from 'react'
// local dependencies
import { safeRegExp } from '../../service'

// configure
const DefMark = memo(function Mark ({ children }) {
  return <span className="bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">{children}</span>
})
export const MarkedText = memo(function MarkedText ({ tag: Tag = 'p', value, mark, flags = 'gi', Mark = DefMark, className = 'm-0', ...attr }) {
  const reg = useMemo(
    () => _.isRegExp(mark) ? mark : safeRegExp(mark, flags || 'g', true),
    [mark, flags]
  )
  const parts = useMemo(
    () => String(value || '').split(reg),
    [value, reg]
  )

  return <Tag { ...attr } className={cn('marked-text', className)}>
    {_.map(parts, (part, index) => <React.Fragment key={index}>
      {reg.test(part) ? <Mark>{part}</Mark> : part}
    </React.Fragment>)}
  </Tag>
})

