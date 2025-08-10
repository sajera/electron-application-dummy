// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
// local dependencies
import { Btn } from '../../component/btn'
import toast from '../../component/toast'

export default observer(function Toasts () {

  return <div className="relative flow-root min-h-full p-4">
    <Btn className="btn-primary-outline btn-lg m-4" onClick={() => toast.info('toast.info')}>toast.info</Btn>
    <Btn className="btn-primary btn-lg m-4" onClick={() => toast.success('toast.success')}>toast.success</Btn>
    <Btn className="btn-danger btn-lg m-4" onClick={() => toast.error('toast.error')}>toast.error</Btn>
  </div>
})
