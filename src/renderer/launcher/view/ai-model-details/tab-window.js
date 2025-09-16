// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'


export default observer(function TabWindow ({ className, ...attr }) {
  const { details, disabled, id } = store

  // console.log(`%c TabWindow ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n details:', details
  // )

  return <div className={cn('relative', { 'pointer-events-none opacity-50': !details }, className)} {...attr}>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className={cn('flex items-start', { 'pointer-events-none opacity-75': !details?.active })}>
        {/*<Btn*/}
        {/*  onClick={() => store.act('show')}*/}
        {/*  className="btn-secondary-outline btn-md mr-3"*/}
        {/*>*/}
        {/*  SHOW*/}
        {/*</Btn>*/}
      </div>
      <div></div>
      <div className="text-right flex items-start justify-end">
        <Btn
          onClick={store.refreshDetails}
          disabled={disabled.get('details')}
          className="btn-secondary btn-md mr-3"
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
      </div>
    </div>
    {/*<h3 className="text-lg font-medium mb-2">Details</h3>*/}
    <div className="flex grow code-block h-40">
      <pre>{JSON.stringify(details, null, 4)}</pre>
    </div>
  </div>
})
