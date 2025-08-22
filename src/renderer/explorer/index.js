// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
// styles
import '../style/theme/index.css'
// local dependencies
import store from './store'
import { Btn } from '../component/btn'
import { Loader } from '../component/loader'
import { ErrorMessage } from '../component/alert'

const App = observer(function App () {
  const { initialized, disabled, details, errorMessage } = store
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])


  // NOTE totally useless
  return <>
    <Loader active={!initialized}>
      <div className="relative flow-root h-full grid grid-flow-col grid-rows-6 md:grid-rows-3 gap-4 p-4">
        <div className="row-span-3 code-block">
          <pre>{JSON.stringify(details, null, 4)}</pre>
        </div>
        <div className="">
          <h3 className="text-lg font-medium mb-2">Explorer window</h3>
          <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
          <Btn
            onClick={store.refreshDetails}
            disabled={disabled.get('details')}
            className="btn-secondary-outline mr-3"
          >
            REFRESH
          </Btn>
          <Btn onClick={() => store.selfAct('openDevTools')} className="btn-primary-outline mr-3">
            DEBUGGER
          </Btn>
          <Btn onClick={store.close} className="btn-danger" >
            CLOSE
          </Btn>
        </div>
        <div className="row-span-2 code-block">
          <pre>{JSON.stringify(preload, null, 4)}</pre>
        </div>
      </div>
    </Loader>
    <Toaster />
  </>

})

createRoot(document.body).render(<App />)
