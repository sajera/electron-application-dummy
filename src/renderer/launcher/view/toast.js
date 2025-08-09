// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
// local dependencies
import toast from '../../component/toast'

export default observer(function Toasts () {

  return <div className="relative flow-root min-h-full p-4">
    <button onClick={() => toast.info('toast.info')}>toast.info</button>
    <br/>
    <button onClick={() => toast.success('toast.success')}>toast.success</button>
    <br/>
    <button onClick={() => toast.error('toast.error')}>toast.error</button>
  </div>
})
