// outsource dependencies
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
// local dependencies
import '../style/theme/index.css'
import store from './store'
import { Btn } from '../component/btn'
import { Loader } from '../component/loader'
import { ErrorMessage } from '../component/alert'

const App = observer(function App () {
  const { initalized, disabled, details, errorMessage } = store
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])
  // NOTE totally useless
  return <Loader active={!initalized}>
    <div className="relative flow-root min-h-full p-4">
      <h2 className="flex items-center text-3xl mb-4">The Explorer</h2>
      <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
      <div className="text-right flex items-start justify-end">
        <Btn
          onClick={store.refreshDetails}
          disabled={disabled.get('details')}
          className="btn-secondary-outline btn-md mr-3"
        >
          REFRESH
        </Btn>
        <Btn
          onClick={store.openDebug}
          className="btn-primary btn-md"
          disabled={disabled.get('debugger')}
        >
          DEBUGGER
        </Btn>
        <Btn
          onClick={store.close}
          className="btn-primary btn-md"
          disabled={disabled.get('close')}
        >
          CLOSE
        </Btn>
      </div>
      <h3 className="text-lg font-medium mb-2">Details</h3>
      <div className="bg-alt rounded border-alt overflow-auto p-2">
        <pre>{JSON.stringify(details, null, 4)}</pre>
      </div>
      <Toaster />
    </div>
  </Loader>
})

createRoot(document.body).render(<App />)

// console.log('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
//   , '\n sid:', process.env.SID
//   , '\n preload:', preload
//   // , '\n logo:', logo
// )
