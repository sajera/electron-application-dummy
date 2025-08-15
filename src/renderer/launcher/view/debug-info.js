// outsource dependencies
import React, {useEffect} from 'react'
import { observer } from 'mobx-react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
// local dependencies
import { layoutStore } from '../store'
import { Btn } from '../../component/btn'

export default observer(function DebugInfo () {
  useEffect(() => { layoutStore.getDebugInfo() }, [])

  return <div className="relative flow-root min-h-full p-4">
    <h2 className="flex items-center text-3xl mb-4">
      Debug Info
      <Btn className="btn-secondary-outline p-1 rounded-full ml-3" onClick={layoutStore.getDebugInfo}>
        <ArrowPathIcon className="size-6" />
      </Btn>
    </h2>

    <div className="p-2 bg-alt rounded border-alt overflow-auto">
      <pre>{JSON.stringify(layoutStore.debugInfo, null, 4)}</pre>
    </div>

  </div>
})
