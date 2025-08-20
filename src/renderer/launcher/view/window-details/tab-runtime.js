// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'


export default observer(function TabRuntime ({ className, ...attr }) {
  const { details, disabled, id } = store

  // console.log(`%c TabRuntime ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n details:', details
  // )

  return <div className={cn('relative', className)} {...attr}>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div></div>
      <div></div>
      <div className="text-right flex items-start justify-end">
        <Btn
          onClick={store.refreshDetails}
          disabled={disabled.get('details')}
          className="btn-secondary-outline btn-md mr-3"
        >
          REFRESH
        </Btn>
        <Btn
          onClick={store.open}
          className="btn-primary btn-md mr-3"
          disabled={disabled.get('open') || details?.active}
        >
          OPEN
        </Btn>
        <Btn
          onClick={store.close}
          className="btn-danger btn-md"
          disabled={disabled.get('close') || !details?.active}
        >
          CLOSE
        </Btn>
      </div>
    </div>

    <h3 className="text-lg font-medium mb-2">Details</h3>
    <div className="bg-alt rounded border-alt overflow-auto p-2">
      <pre>{JSON.stringify(details, null, 4)}</pre>
    </div>
  </div>
})
