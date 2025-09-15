// outsource dependencies
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
// local dependencies
import { store } from './store'
import { Modal } from '../modal'
import { useRefCallback } from '../hook'
import { MarkedText } from '../marked-text'

export const confirm = store.confirmAction

export const Confirmation = observer(function Confirmation () {
  const { isOpen, closeOnBackdrop = false, closeOnEscape = false, resolve, reject, ...attr } = store.confirm

  useEffect(() => { store.rejectConfirm() }, [])

  return <Modal
    isOpen={isOpen}
    onClose={store.rejectConfirm}
    closeOnEscape={closeOnEscape}
    closeOnBackdrop={closeOnBackdrop}
    className="confirmation-modal w-[486px]"
  >
    {/* NOTE unmount component */}
    { isOpen && <DefConfirm
      { ...attr }
      onReject={store.rejectConfirm}
      onResolve={store.resolveConfirm}
    />}
  </Modal>
})
const Mark = memo(function Mark ({ children }) { return <strong className="break-words font-extrabold">{children}</strong> })

const DefConfirm = memo(function DefConfirm ({ onReject, onResolve, destructive, mark, title, message }) {
  const [btnReject, btnRejectRef] = useRefCallback()
  const [btnResolve, btnResolveRef] = useRefCallback()

  useEffect(() => {
    if (!btnResolve || !btnReject) return
    const id = setTimeout(() => destructive ? btnReject.focus() : btnResolve.focus(), 200)
    return () => clearTimeout(id)
  }, [btnResolve, btnReject, destructive])

  return <>
    <div className="app-modal-header flex flex-nowrap items-center justify-between">
      <MarkedText tag="h3" value={title} mark={mark} Mark={Mark} className="font-bold" />
      <button onClick={onReject} className="app-modal-btn-close">
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
    <div className="app-modal-body">
      <MarkedText tag="p" value={message} mark={mark} Mark={Mark} className="font-light" />
      <br/>
      <br/>
      <small className="italic font-thin text-xs">P.S. Let&apos;s avoid accidental clicks.</small>
    </div>
    <div className="app-modal-footer flex justify-end">
      <button onClick={onReject} className="btn btn-md btn-secondary-outline mr-2" ref={btnRejectRef}>Cancel</button>
      <button onClick={onResolve} className="btn btn-md btn-danger" ref={btnResolveRef}>Confirm</button>
    </div>
  </>
})
