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


export const NoRenderCanvas = memo(function NoRenderCanvas ({ ref }) {
  return <canvas ref={ref} className="border border-alt rounded" />
})

export default observer(function DrawImage () {
  const { errorMessage, initialized, disabled, data } = store
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])

  console.log(`%c DrawImage ${1} `, 'color: #FF6766; font-weight: bolder;'
    , '\n data:', data
  )

  return <div className="relative flex flex-col h-full p-4">
    <Controls className="z-10 bg-alt shadow-lg border-l border-alt" />
    <div className="flex items-center justify-between mb-4">
      <div className="flex">
        <h2 className="text-3xl mr-3">Draw image manually</h2>
        <Btn
          onClick={store.resetFabric}
          disabled={disabled.get('todo')}
          className="btn-secondary-outline btn-md mr-3"
        >
          RESET
        </Btn>
      </div>
      <div className="flex">
        <Btn
          onClick={() => store.update({ showControls: true })}
          className="btn-secondary-outline justify-center p-1"
        >
          <Cog8ToothIcon className="size-6 inline-block" />
        </Btn>
      </div>
    </div>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="mb-4" />
    <Loader active={!initialized}>
      <div className="code-block_ mb-2">
        <NoRenderCanvas ref={store.setupCanvas} />
      </div>
      <div className="flex grow code-block">
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </Loader>
  </div>
})
