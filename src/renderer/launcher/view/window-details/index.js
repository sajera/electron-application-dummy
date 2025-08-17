// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { WindowIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import DetailsForm from './form'
import { WINDOW } from '../../navigation'
import { ErrorMessage } from '../../../component/alert'
import { Loader, Spinner } from '../../../component/loader'


export default observer(function WindowDetails () {
  const { initialized, disabled, errorMessage, details } = store

  const { id } = WINDOW.DETAILS.PARAMS()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => store.initialize(id), [id])

  // console.log(`%c WindowDetails ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n details:', details
  // )

  return <div className="relative flow-root min-h-full p-4">
    <h2 className="text-3xl mb-4 flex items-center">
      <WindowIcon className="size-10 inline-block" />
      {!id ? <span className="mx-2">Create new Window</span> : <>
        <Spinner active={!initialized} className="size-8 mx-4">
          <span className="mx-2">{details?.title}</span>
        </Spinner>
        <strong className="text-muted">{id ? `#${id}` : 'NEW'}</strong>
      </>}
    </h2>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
    <Loader active={!initialized} className="!h-96">
      <div>
        TODO tabs
        TODO current state
      </div>
      <hr className="border-alt mb-4" />
      <DetailsForm className="" isNew={!id} />
    </Loader>
  </div>
})
