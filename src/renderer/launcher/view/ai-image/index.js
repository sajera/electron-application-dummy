// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Loader } from '../../../component/loader'
import { ErrorMessage } from '../../../component/alert'


export default observer(function ImageAI () {
  const { errorMessage, initialized, disabled, data, dataUrl } = store
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])

  return <div className="relative flex flex-col h-full p-4">
    <h2 className="text-3xl mb-4">AI Image</h2>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="mb-4" />
    <Loader active={!initialized}>
      <div className="absolute top-0 right-0 pt-2 pr-2">
        <Btn onClick={store.generate} className="btn-primary" disabled={disabled.get('generate')}>
          RE-GENERATE
        </Btn>
      </div>
      <div className="h-96">
        <img src={dataUrl} alt="Random image" />
      </div>
      <div className="flex grow code-block">
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </Loader>
  </div>
})
