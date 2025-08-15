// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
// local dependencies
import store from './store'
import { ErrorMessage } from '../../../component/alert'


export default observer(function List () {
  const { list, initialized, disabled, errorMessage } = store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])


  return <div className="relative flow-root min-h-full p-4">
    <h2 className="text-3xl mb-4">Windows</h2>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="mb-4" />
  </div>
})
