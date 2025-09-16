// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect, useMemo } from 'react'
import { CpuChipIcon, TrashIcon } from '@heroicons/react/24/outline'
// local dependencies
import TabForm from './tab-form'
import store, { TAB } from './store'
import TabWindow from './tab-window'
import { AI } from '../../navigation'
import TabRuntime from './tab-runtime'
import { ErrorMessage } from '../../../component/alert'
import { Btn, ExternalLink } from '../../../component/btn'
import { Loader, Spinner } from '../../../component/loader'

export default observer(function AIModelDetails () {
  const { initialized, disabled, errorMessage, details, selectedTab } = store

  const { id } = AI.DETAILS.PARAMS()
  useEffect(() => store.initialize(id), [id])

  const TabView = useMemo(() => {
    switch (selectedTab) {
      case TAB.FORM:
      default: return TabForm
    }
  }, [selectedTab])

  // console.log(`%c WindowDetails ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n details:', details
  // )

  return <div className="relative flex flex-col h-full overflow-hidden p-4">
    <div className="mb-2 flex items-center justify-between">
      <h2 className="text-3xl">
        <CpuChipIcon className="size-10 inline-block mb-2" />
        <strong className="text-muted mx-2">{id ? `#${id}` : 'NEW'}</strong>
        {!id ? <span className="mx-2">AI Model</span> : <>
          <Spinner active={!initialized} className="size-6 mb-2 mx-4">
            <span className="mx-2">{details?.options?.title}</span>
          </Spinner>
        </>}
      </h2>
      <div className="flex items-center">
        <ExternalLink href="https://www.tensorflow.org/js" className="mr-4">
          Tensorflow
        </ExternalLink>
        {/* TODO confirmation */}
        {/*"Are you sure you want to delete the window runtime and its definition?"*/}
        {/*"This action will permanently delete the window runtime and definition. Do you want to continue?"*/}
        {initialized && details && <Btn
          onClick={store.remove}
          title="Delete AI Model"
          className="btn-danger btn-md"
          disabled={disabled.get('remove')}
        >
          <TrashIcon className="inline-block size-5 mb-1" /> DELETE
        </Btn>}
      </div>
    </div>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
    <div className="flex flex-col grow">
      <Loader active={!initialized} className="!h-96">
        {!id ? <hr className="border-alt mb-4" /> : <div className="relative -bg-alt border-alt border-b -mx-4 mb-4 pt-1">
          {_.values(TAB).map(tab => <Btn
            key={tab}
            onClick={() => store.setTab(tab)}
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
        <TabView className="flex flex-col grow overflow-hidden" />
      </Loader>
    </div>
  </div>
})
