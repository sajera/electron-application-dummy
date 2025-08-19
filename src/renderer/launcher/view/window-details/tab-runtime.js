// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'


export default observer(function TabRuntime ({ className, ...attr }) {
  const { details, disabled, id } = store

  console.log(`%c TabRuntime ${id} `, 'color: #FF6766; font-weight: bolder;'
    , '\n details:', details
  )

  return <div className={cn('relative', className)} {...attr}>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div></div>
      <div></div>
      <div className="text-right flex items-start justify-end">
        <Btn
          // onClick={form.reset}
          className="btn-secondary-outline btn-md mr-3"
          // disabled={disabled.get('form') || form.isPristine}
        >
          SOME
        </Btn>
        <Btn
          type="submit"
          // disabled={disabled.get('form')}
          className="btn-primary btn-md mr-3"
        >
          ACTION
        </Btn>
        <Btn
          onClick={store.remove}
          className="btn-danger btn-md"
          disabled={disabled.get('remove')}
        >
          DELETE
        </Btn>
      </div>
    </div>

    <h3 className="text-lg font-medium mb-2">Details</h3>
    <div className="bg-alt rounded border-alt overflow-auto p-2">
      <pre>{JSON.stringify(details, null, 4)}</pre>
    </div>
  </div>
})
