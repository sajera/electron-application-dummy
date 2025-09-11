// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Form, Field, Input, Color } from '../../../component/form'

export default observer(function RectForm ({ className }) {
  const { rectForm } = store

  return <Form store={rectForm} className={cn('rect-form', className)}>
    {/*<h2 className="text-medium mb-3">RECT OPTIONS</h2>*/}
    <Field
      name="fill"
      component={Color}
      inLabel="FILL RECT"
      classNameFormGroup="mb-3"
    />
    <div className="grid grid-cols-2 gap-3 mb-3">
      <Field
        min="1"
        max="1000"
        name="width"
        type="number"
        inLabel="WIDTH"
        component={Input}
      />
      <Field
        min="1"
        max="1000"
        type="number"
        name="height"
        inLabel="HEIGHT"
        component={Input}
      />
    </div>
    <div className="grid grid-cols-2 gap-3 mb-3">
      <Field
        name="stroke"
        component={Color}
        placeholder="STROKE COLOR"
      />
      <Field
        min="1"
        type="number"
        inLabel="STROKE"
        name="strokeWidth"
        component={Input}
      />
    </div>
    <Btn
      type="submit"
      title="Add rect to canvas"
      disabled={!rectForm.isValid}
      className="btn-primary-outline btn-md mb-3 w-full"
    >
      ADD RECT
    </Btn>
  </Form>
})
