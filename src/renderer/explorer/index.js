// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
// local dependencies
import '../style/theme/index.css'

import store from './store'
import { Btn } from '../component/btn'
import { Loader } from '../component/loader'
import { ErrorMessage } from '../component/alert'

const App = observer(function App () {
  const { initialized, disabled, details, errorMessage } = store
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])


  // NOTE totally useless
  return <Loader active={!initialized}>
    <div className="relative flow-root min-h-full p-4">
      <div className="flex items-center justify-end mb-4">
        <Btn
          onClick={store.refreshDetails}
          disabled={disabled.get('details')}
          className="btn-secondary-outline btn-md mr-3"
        >
          REFRESH
        </Btn>
        <Btn
          onClick={store.openDebug}
          disabled={disabled.get('debugger')}
          className="btn-primary-outline btn-md mr-3"
        >
          DEBUGGER
        </Btn>
        <Btn
          onClick={store.close}
          className="btn-danger btn-md"
          disabled={disabled.get('close')}
        >
          CLOSE
        </Btn>
      </div>
      <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />

      <h3 className="text-lg font-medium mb-2">Details</h3>
      <div className="bg-alt rounded border-alt overflow-auto p-2">
        <pre>{JSON.stringify(details, null, 4)}</pre>
      </div>
      <Toaster />
    </div>
  </Loader>
})

createRoot(document.body).render(<App />)
