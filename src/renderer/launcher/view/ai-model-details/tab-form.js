// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Field, Form, Input, SimpleSelect, Switch } from '../../../component/form'


export default observer(function TabForm ({ className, ...attr }) {
  const { disabled, form, id } = store
  const isNew = !id

  // console.log(`%c TabForm ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n values:', { ...form.value }
  // )

  // FIXME should I remove direct "disabled" nad delay for update ?
  return <div className={cn('relative grow h-40 -my-4 py-4 -mr-4 pr-4 !overflow-y-auto', { 'pointer-events-none': disabled.get('form') }, className)} {...attr}>
    <Form store={form} className="">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field
          checkmark
          name="name"
          component={Input}
          placeholder="NAME"
          // label={<span className="required-asterisk">Name</span>}
        />
        <div className="text-right flex items-start justify-end">
          <Btn
            onClick={form.reset}
            className="btn-secondary-outline btn-md mr-3"
            disabled={disabled.get('form') || form.isPristine}
          >
            RESET
          </Btn>
          <Btn
            type="submit"
            className="btn-primary btn-md"
            disabled={disabled.get('form')}
          >
            {isNew ? 'CREATE' : 'SAVE'}
          </Btn>
        </div>
      </div>
      <Field
        checkmark
        rows="4"
        type="textarea"
        name="description"
        component={Input}
        placeholder="type a notes here"
        classNameFormGroup="col-span-2"
        // label={<span className="required-asterisk">NOTES</span>}
      />
    </Form>
  </div>
})
