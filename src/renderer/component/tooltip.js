// outsource dependencies
import cn from 'classnames'
import React, { memo } from 'react'
import { createPortal } from 'react-dom'
import { usePopperTooltip } from 'react-popper-tooltip'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
// local dependencies


// _eslint-disable-next-line max-len
export const Tooltip = memo(function Tooltip ({ tag: Tag = 'span', content = '', placement = 'auto', children, className, tooltipClassName = 'max-w-sm', arrowClassName, trigger = ['hover', 'focus'], delayHide = 300, delayShow = 800, interactive, ...attr }) {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible, state } = usePopperTooltip({
    // closeOnOutsideClick,
    // closeOnTriggerHidden,
    // defaultVisible,
    delayHide,
    delayShow,
    // followCursor,
    interactive,
    // mutationObserverOptions,
    // offset: [0, 6],
    // onVisibleChange,
    placement,
    trigger,
    // visible: true,
  })
  // console.info('%c Tooltip ', 'color: #4337C9; font-weight: bolder;'
  //   , '\n state:', state
  //   , '\n attr:', attr
  // )
  return <>
    <Tag { ...attr } ref={setTriggerRef} className={cn('tooltip-trigger', className)}>{children}</Tag>
    { Boolean(content) && visible && createPortal(<div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container z-50' })}>
      <div className="tooltip relative">
        <Arrow { ...getArrowProps({}) } className={arrowClassName} placement={state?.placement} />
        <div className={cn('border border-alt shadow-lg px-3 py-2 bg-alt text-sm text-alt rounded-md', tooltipClassName)}>{content}</div>
        {/*<div // NOTE allows to path text<br/>text but fail with regular JSX*/}
        {/*  dangerouslySetInnerHTML={{ __html: content }}*/}
        {/*  className={cn('border border-inherit shadow-lg max-w-sm px-3 py-2 bg-white text-sm text-gray-800 rounded-md', tooltipClassName)}*/}
        {/*/>*/}
      </div>
    </div>,
    window.document.body
    )}
  </>
})
// Tooltip.propTypes = {
//   className: PropTypes.string,
//   interactive: PropTypes.bool,
//   arrowClassName: PropTypes.string,
//   tooltipClassName: PropTypes.string,
//   delayHide: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   delayShow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
//   tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node, PropTypes.object]),
//   content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.element, PropTypes.node]),
//   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.element, PropTypes.node]),
//   placement: PropTypes.oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']),
// }

const Arrow = memo(function Arrow ({ className, placement, ...attr }) {
  // console.info('%c Arrow ', 'color: #4337C9; font-weight: bolder;'
  //   , '\n placement:', placement
  //   , '\n attr:', attr
  // );
  return <div
    { ...attr }
    className={cn('tooltip-arrow', placement, className,
      // 'before:bg-alt before:border before:border-alt', // not working correctly ¯\_(ツ)_/¯
      'before:bg-gray-50 dark:before:bg-gray-950 before:border before:border-gray-200 dark:before:border-gray-800',
      'before:-left-1.5 before:-top-1.5 before:rotate-45 before:block before:absolute before:w-3 before:h-3', {
        'bottom-full before:bottom-0 before:!border-r-transparent before:!border-b-transparent': placement === 'bottom',
        'right-full before:right-0 before:!border-r-transparent before:!border-t-transparent': placement === 'right',
        'left-full before:right-0 before:!border-l-transparent before:!border-b-transparent': placement === 'left',
        'top-full before:bottom-0 before:!border-l-transparent before:!border-t-transparent': placement === 'top',
      })}
  />
})

/**
 * Simple wrapped icon to use in place
 */
export const Hint = memo(function Hint ({ className = 'mb-2', ...attr }) {
  return <Tooltip
    tag={InformationCircleIcon}
    aria-hidden={false}
    delayHide="800"
    delayShow="150"
    placement="top"
    {...attr}
    className={cn('inline-block outline-none cursor-help size-4 text-gray-400', className)}
  />
})
