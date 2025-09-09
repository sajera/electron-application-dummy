// outsource dependencies
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { Cog8ToothIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import Controls from './controls'
import { Btn } from '../../../component/btn'
import { Loader } from '../../../component/loader'
import { ErrorMessage } from '../../../component/alert'
import { useRefCallback } from '../../../component/hook'
import { Form, Field, Input } from '../../../component/form'


export const NoRenderCanvas = memo(function NoRenderCanvas ({ ref }) {
  return <canvas ref={ref} className="border border-alt rounded" />
})

export default observer(function DrawImage () {
  const { sizeForm, errorMessage, initialized, disabled, data } = store
  const [canvas, getCanvas] = useRefCallback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => store.initialize(canvas), [canvas])

  return <div className="relative flex flex-col h-full p-4">
    <Controls className="z-10 bg-alt shadow-lg border-l border-alt" />
    <div className="flex items-start justify-between mb-4">
      <Form store={sizeForm} className="flex">
        <h2 className="text-3xl mr-3 truncate">Draw image</h2>
        <Btn
          type="submit"
          disabled={!sizeForm.isValid}
          title="Reset canvas and apply size settings"
          className="btn-secondary-outline btn-md mr-3 h-10 whitespace-nowrap"
        >
          RESET CANVAS
        </Btn>
        <div className="relative mr-3 w-52">
          <Field min="1" max="50" type="number" name="point" component={Input} />
          <span className="text-muted absolute pointer-events-none top-2">
            <span className="opacity-0 mr-3 ml-1">{sizeForm.value.point}</span> POINT SIZE
          </span>
        </div>
        <div className="relative mr-3 w-44">
          <Field min="10" max="1000" type="number" name="width" component={Input} />
          <span className="text-muted absolute pointer-events-none top-2">
            <span className="opacity-0 mr-3 ml-1">{sizeForm.value.width}</span> WIDTH
          </span>
        </div>
        <div className="relative mr-3 w-44">
          <Field min="10" max="1000" type="number" name="height" component={Input} />
          <span className="text-muted absolute pointer-events-none top-2">
            <span className="opacity-0 mr-3 ml-1">{sizeForm.value.height}</span> HEIGHT
          </span>
        </div>
      </Form>
      <div className="flex justify-end">
        <Btn
          title="Show controls panel"
          onClick={() => store.update({ showControls: true })}
          className="btn-secondary-outline justify-center size-10 p-1"
        >
          <Cog8ToothIcon className="size-6 inline-block" />
        </Btn>
      </div>
    </div>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="mb-4" />
    <Loader active={!initialized}>
      <div className="code-block_ mb-2">
        <NoRenderCanvas ref={getCanvas} />
      </div>
      <div className="flex grow code-block">
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </Loader>
  </div>
})
