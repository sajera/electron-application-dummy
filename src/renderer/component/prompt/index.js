// outsource dependencies
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
// local dependencies
import { store } from './store'
import { Modal } from '../modal'
import { useRefCallback } from '../hook'
import { MarkedText } from '../marked-text'
import {Field, Form, Input} from '../form'

export const prompt = store.promptAction

export const Prompt = observer(function Prompt () {
  const { closeOnBackdrop = false, closeOnEscape = false } = store.options

  useEffect(() => { store.rejectPrompt() }, [])

  return <Modal
    isOpen={store.isOpen}
    onClose={store.rejectPrompt}
    closeOnEscape={closeOnEscape}
    closeOnBackdrop={closeOnBackdrop}
    className="confirmation-modal w-[486px]"
  >
    {/* NOTE unmount component */}
    {store.isOpen && <DefConfirm
      form={store.form}
      options={store.options}
      onReject={store.rejectPrompt}
    />}
  </Modal>
})
const Mark = memo(function Mark ({ children }) { return <strong className="break-words font-extrabold">{children}</strong> })

const DefConfirm = memo(function DefConfirm ({ form, onReject, destructive, options }) {
  const { mark, title, message, inputs } = options
  const [btnReject, btnRejectRef] = useRefCallback()
  const [btnResolve, btnResolveRef] = useRefCallback()

  useEffect(() => {
    if (!btnResolve || !btnReject) return
    const id = setTimeout(() => destructive ? btnReject.focus() : btnResolve.focus(), 200)
    return () => clearTimeout(id)
  }, [btnResolve, btnReject, destructive])

  return <Form store={form}>
    <div className="app-modal-header flex flex-nowrap items-center justify-between">
      <MarkedText tag="h3" value={title} mark={mark} Mark={Mark} className="font-bold" />
      <button onClick={onReject} className="app-modal-btn-close">
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
    <div className="app-modal-body">
      <MarkedText tag="p" value={message} mark={mark} Mark={Mark} className="font-light" />
      <br/>
      {inputs?.map((options, index) => <Field
        key={index}
        {...options}
        component={Input}
        classNameFormGroup="mb-3"
      />)}
    </div>
    <div className="app-modal-footer flex justify-end">
      <button type="button" onClick={onReject} className="btn btn-md btn-danger-outline mr-2" ref={btnRejectRef}>Cancel</button>
      <button type="button" className="btn btn-md btn-secondary-outline mr-2">Reset</button>
      <button type="submit" className="btn btn-md btn-primary" ref={btnResolveRef}>Submit</button>
    </div>
  </Form>
})
