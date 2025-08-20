// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useState } from 'react'
import { WindowIcon, TrashIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import TabForm from './tab-form'
import TabRuntime from './tab-runtime'
import { WINDOW } from '../../navigation'
import { Btn } from '../../../component/btn'
import { ErrorMessage } from '../../../component/alert'
import { Loader, Spinner } from '../../../component/loader'

// configure
const TAB = {
  FORM: 'Options',
  RUNTIME: 'Runtime',
}

export default observer(function WindowDetails () {
  const { initialized, disabled, errorMessage, details } = store

  const { id } = WINDOW.DETAILS.PARAMS()
  useEffect(() => store.initialize(id), [id])

  const [selectedTab, setTab] = useState(TAB.FORM)
  useEffect(() => setTab(!id ? TAB.FORM : TAB.RUNTIME), [id])
  const TabView = useMemo(() => {
    switch (selectedTab) {
      case TAB.FORM:
      default: return TabForm
      case TAB.RUNTIME: return TabRuntime
    }
  }, [selectedTab])

  // console.log(`%c WindowDetails ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n details:', details
  // )

  return <div className="relative flow-root min-h-full p-4">
    <div className="mb-2 flex items-center justify-between">
      <h2 className="text-3xl">
        <WindowIcon className="size-10 inline-block mb-2" />
        <strong className="text-muted mx-2">{id ? `#${id}` : 'NEW'}</strong>
        {!id ? <span className="mx-2">Create new Window</span> : <>
          <Spinner active={!initialized} className="size-8 mx-4">
            <span className="mx-2">{details?.options?.title}</span>
          </Spinner>
        </>}
      </h2>
      {/* TODO confirmation */}
      {/*"Are you sure you want to delete the window runtime and its definition?"*/}
      {/*"This action will permanently delete the window runtime and definition. Do you want to continue?"*/}
      {initialized && details && <Btn
        onClick={store.remove}
        className="btn-danger btn-md"
        disabled={disabled.get('remove')}
        title="Delete window runtime and definition"
      >
        <TrashIcon className="inline-block size-5 mb-1" /> DELETE
      </Btn>}
    </div>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
    <Loader active={!initialized} className="!h-96">
      {!id ? <hr className="border-alt mb-4" /> : <div className="relative -bg-alt border-alt border-b -mx-4 mb-4 pt-1">
        {_.values(TAB).map(tab => <Btn
          key={tab}
          onClick={() => setTab(tab)}
          className={cn('btn-secondary-outline min-w-36 btn-lg pb-2 px-6 font-extrabold -mb-px ml-10 ring-inset ring-offset-0 shadow-[none] border-alt !border-b-0 rounded-b-none', {
            'pointer-events-none': !initialized,
            'pointer-events-none bg-body': tab === selectedTab,
            'bg-transparent border-transparent hover:border-alt': tab !== selectedTab,
          })}>
          {tab}
          {/* TODO mark if window is in active state */}
          {/*<span className="ml-1 text-muted">*/}
          {/*  <Spinner active={!initialized}>{amount}</Spinner>*/}
          {/*</span>*/}
        </Btn>)}
      </div>}
      <TabView className="" />
    </Loader>
  </div>
})
