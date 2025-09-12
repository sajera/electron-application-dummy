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
import { Form, Field, Input, Color, SimpleSelect, COLORS } from '../../../component/form'


export default observer(function TextForm ({ className }) {
  const { textForm } = store
  const [isOpen, toggleOpen] = useStoredToggle('di-text')

  return <Form store={textForm} className={cn('text-form', className)}>
    <div className="flex items-center justify-between cursor-pointer" onClick={toggleOpen}>
      <h2 className="font-medium text-alt flex items-center">
        <PlusIcon className="size-5 mr-1" /> TEXT
      </h2>
      <Btn className="shadow-none ring-transparent ring-offset-transparent p-1 -mr-2">
        <ChevronDownIcon className={cn('size-6 transition-all ', isOpen ? 'rotate-180' : '')} />
      </Btn>
    </div>
    <Collapsible isOpen={isOpen} openClassName="overflow-visible">
      <Field
        rows="3"
        name="text"
        type="textarea"
        component={Input}
        classNameFormGroup="mb-2.5"
        placeholder="type text here"
      />
      <Field
        name="fill"
        component={Color}
        inLabel="TEXT COLOR"
        classNameFormGroup="mb-3"
        colors={[...COLORS, 'transparent']}
      />
      <div className="grid grid-cols-5 gap-3 mb-3">
        <Field
          min="1"
          max="100"
          step="0.1"
          type="number"
          name="lineHeight"
          component={Input}
          inLabel="LINE HEIGHT"
          classNameFormGroup="col-span-3"
        />
        <Field
          min="1"
          max="100"
          type="number"
          inLabel="SIZE"
          name="fontSize"
          component={Input}
          classNameFormGroup="col-span-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Field
          inLabel="WIGHT"
          name="fontWeight"
          component={SimpleSelect}
          options={[100, 200, 'normal', 400, 600, 'bold', 800]}
        />
        <Field
          inLabel="STYLE"
          name="fontStyle"
          component={SimpleSelect}
          options={['normal', 'italic']}
        />
      </div>
      <Field
        inLabel="FAMILY"
        name="fontFamily"
        component={SimpleSelect}
        classNameFormGroup="mb-3"
        options={['Sans-serif', 'Serif', 'monospace']}
      />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Field
          name="stroke"
          className="h-10"
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
        disabled={!textForm.isValid}
        className="btn-primary-outline btn-md mb-3 w-full flex items-center justify-center"
      >
        <PlusIcon className="size-5 mr-1" /> ADD TEXT
      </Btn>
    </Collapsible>
  </Form>
})
