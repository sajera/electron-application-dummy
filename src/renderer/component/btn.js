// outsource dependencies
import cn from 'classnames'
import React, { memo, useCallback } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
// local dependencies
import '../style/component/btn.css'
import { Tooltip } from './tooltip'

export const Btn = memo(function Btn ({ className, children, title, ...attr }) {

  return <Tooltip
    delayShow="1200"
    delayHide="150"
    placement="top"
    type="button"
    tag="button"
    {...attr}
    content={title}
    className={cn('btn', className)}
  >
    {children}
  </Tooltip>
})

export const ExternalLink = memo(function ExternalLink ({ href, className, iconClassName, onClick, title = 'Open in browser', children = 'External Link', noArrow, ...attr }) {
  const handleClick = useCallback(event => {
    event.preventDefault()
    preload.shell('default-browser', href)
    onClick(event)
  }, [href, onClick])

  return <Tooltip
    tag="a"
    href={href}
    target="_blank"
    content={title}
    rel="noopener noreferrer"
    className={cn('link hover:underline inline-block group', className)}
    {...attr}
    onClick={handleClick}
  >
    {children}{!noArrow && <ArrowTopRightOnSquareIcon className={cn('size-4 inline-block ml-0.5 invisible group-hover:visible', iconClassName)} />}
  </Tooltip>
})
