// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import toast from '../../../component/toast'
import { Form, Field, Input } from '../../../component/form'

export default observer(function Toasts () {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])

  return <div className="relative flow-root min-h-full p-4">
    <Btn className="btn-primary-outline btn-lg m-4" onClick={() => toast.info('toast.info')}>toast.info</Btn>
    <Btn className="btn-primary btn-lg m-4" onClick={() => toast.success('toast.success')}>toast.success</Btn>
    <Btn className="btn-danger btn-lg m-4" onClick={() => toast.error('toast.error')}>toast.error</Btn>
    <Form store={store.form} className="w-lg">
      <Field
        // checkmark
        clearable
        name="header"
        component={Input}
        placeholder="header"
        label="Header text"
        classNameFormGroup="mb-3"
      />
      <Field
        clearable
        checkmark
        name="body"
        type="textarea"
        component={Input}
        placeholder="body"
        label="Body text"
        classNameFormGroup="mb-3"
      />
      <Field
        checkmark
        component={Input}
        label="Header class"
        name="headerClassName"
        placeholder="className"
        classNameFormGroup="mb-3"
      />
      <Field
        checkmark
        label="Icon class"
        component={Input}
        name="iconClassName"
        placeholder="className"
        classNameFormGroup="mb-3"
      />
      <Field
        readOnly
        checkmark
        name="icon"
        label="Icon // TODO"
        component={Input}
        placeholder="Icon"
        classNameFormGroup="mb-3"
      />

      <div className="border-t border-alt py-3 text-right">
        <Btn onClick={store.form.reset} disabled={store.form.isPristine} className="btn-secondary-outline btn-md mr-4">
          RESET
        </Btn>
        <Btn type="submit" className="btn-primary btn-md">
          TOAST
        </Btn>
      </div>
    </Form>
  </div>
})
