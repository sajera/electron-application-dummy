// outsource dependencies
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { Transition } from '@headlessui/react'
import React, { memo, useCallback, useEffect } from 'react'
// local dependencies
import '../style/component/modal.css'
import { stopPropagation } from './hook'


export const Modal = memo(function Modal ({ isOpen, onClose, className, closeOnBackdrop, closeOnEscape, noPortal, children }) {
  useEffect(() => {
    if (!closeOnEscape) return
    const handler = event => isOpen && closeOnEscape && [27].includes(event?.keyCode) && onClose(event)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeOnEscape, isOpen, onClose])
  // const wrapper = useCallback(element => noPortal ? element : createPortal(element, document.body), [noPortal])
  // NOTE allows to use predefined app modal portal
  const wrapper = useCallback(element => noPortal ? element : createPortal(element, document.getElementById('ModalPortal') || document.body), [noPortal])
  return wrapper(<Transition
    as="div"
    tabIndex="0"
    role="button"
    show={isOpen}
    className="relative z-40"
    onClick={closeOnBackdrop ? onClose : null}
    onKeyDown={null}
    // NOTE An interesting point is that if we focus on an item within the modal, it might still require the 'Escape' key.
    // However, with 'closeOnEscape' enabled, this could trigger the modal to close. How should we handle this difference?
    // Or can it be managed within the modal content itself?
    // onKeyDown={e => [27].includes(event?.keyCode) && e?.stopPropagation()}
  >
    <Transition.Child
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-400/75" />
    </Transition.Child>
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center pt-[17%] cursor-auto">
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          onClick={stopPropagation}
          className={cn('app-modal', className)}
        >
          {children}
        </Transition.Child>
      </div>
    </div>
  </Transition>)
})
