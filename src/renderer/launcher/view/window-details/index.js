// outsource dependencies
import React, {useEffect} from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { WindowIcon, TrashIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import { WINDOW } from '../../navigation'
import { Btn } from '../../../component/btn'
import { ErrorMessage } from '../../../component/alert'
import { Loader, Spinner } from '../../../component/loader'
import { Field, Form, Input } from '../../../component/form'


export default observer(function WindowDetails () {
  const { initialized, disabled, errorMessage, form, details } = store

  const { id } = WINDOW.DETAILS.PARAMS()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => store.initialize(id), [id])

  // console.log(`%c WindowDetails ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n details:', details
  // )

  return <div className="relative flow-root min-h-full p-4">
    <h2 className="text-3xl mb-4 flex items-center">
      <WindowIcon className="size-10 inline-block" />
      <span className="mx-2">Window details</span>
      <Spinner active={!initialized || disabled.get('details')} className="size-8">
        <strong className="text-muted">{id ? `#${id}` : 'NEW'}</strong>
        {id && <Btn className="btn-danger ml-2" title="Completely remove window" onClick={store.remove}>
          <TrashIcon className="size-6 inline-block" />
        </Btn>}
      </Spinner>
    </h2>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
    <Loader active={!initialized} className="!h-96">
      <div>
        TODO current state
      </div>
      <Form store={form} className="relative">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Field
            checkmark
            // clearable or checkmark
            name="title"
            component={Input}
            placeholder="TITLE"
            label={<span className="required-asterisk">Title</span>}
          />
          <Field
            checkmark
            type="number"
            name="width"
            label="Width"
            component={Input}
            placeholder="WIDTH"
          />
          <Field
            checkmark
            type="number"
            name="height"
            label="Height"
            component={Input}
            placeholder="HEIGHT"
          />
        </div>

        <div className="text-right">
          {id && <Btn
            onClick={form.reset}
            className="btn-secondary-outline btn-md mr-3"
            disabled={disabled.get('details') || form.isPristine}
          >
            RESET
          </Btn>}
          <Btn type="submit" className="btn-primary btn-md" disabled={disabled.get('details')}>
            {id ? 'SAVE': 'CREATE'}
          </Btn>
        </div>
      </Form>
    </Loader>
  </div>
})
