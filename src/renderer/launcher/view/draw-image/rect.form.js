// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { useStoredToggle } from '../../../component/hook'
import { Collapsible } from '../../../component/collapsible'
import { Form, Field, Input, Color } from '../../../component/form'

export default observer(function RectForm ({ className }) {
  const { rectForm } = store
  const [isOpen, toggleOpen] = useStoredToggle('di-rect')

  return <Form store={rectForm} className={cn('rect-form', className)}>
    <div className="flex items-center justify-between cursor-pointer" onClick={toggleOpen}>
      <h2 className="font-medium text-alt flex items-center">
        <PlusIcon className="size-5 mr-1" /> RECT
      </h2>
      <Btn className="shadow-none ring-transparent ring-offset-transparent p-1 -mr-2">
        <ChevronDownIcon className={cn('size-6 transition-all ', isOpen ? 'rotate-180' : '')} />
      </Btn>
    </div>
    <Collapsible isOpen={isOpen} openClassName="overflow-visible">
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
        className="btn-primary-outline btn-md mb-3 w-full flex items-center justify-center"
      >
        <PlusIcon className="size-5 mr-1" /> ADD RECT
      </Btn>
    </Collapsible>
  </Form>
})
