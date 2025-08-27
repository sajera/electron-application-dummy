// outsource dependencies
import React, {useEffect} from 'react'
import { observer } from 'mobx-react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
// local dependencies
import { layoutStore } from '../store'
import { Btn } from '../../component/btn'

export default observer(function DebugInfo () {
  useEffect(() => { layoutStore.getDebugInfo() }, [])

  return <div className="relative flex flex-col h-full p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl">Debug Info</h2>
      <div className="flex items-center">
        <Btn className="btn-secondary-outline p-1 rounded-full mк-3" onClick={layoutStore.getDebugInfo}>
          <ArrowPathIcon className="size-4" />
        </Btn>
        <Btn className="btn-secondary-outline p-1 rounded-full ml-3" onClick={() => layoutStore.selfAct('openDevTools')}>
          DEBUGGER
        </Btn>
      </div>
    </div>

    <div className="flex grow code-block">
      <pre>{JSON.stringify(layoutStore.debugInfo, null, 4)}</pre>
    </div>

  </div>
})
