// outsource dependencies
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { ErrorMessage } from '../../../component/alert'
import { Form, Field, Input } from '../../../component/form'


export default observer(function Toasts () {
  const { form, errorMessage, disabled, data } = store
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])

  return <div className="relative flow-root min-h-full p-4">
    <h2 className="text-4xl my-10 text-center">DB SQL Light</h2>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="mb-4" />

    <Form store={form} className="relative">
      <Field
        rows="12"
        checkmark
        clearable
        name="query"
        type="textarea"
        component={Input}
        placeholder="SQL"
        classNameFormGroup="mb-3"
        disabled={disabled.get('sql')}
      />
      <div className="absolute top-0 right-0 pt-2 pr-2">
        <Btn onClick={store.clear} className="btn-danger-outline mr-3" disabled={disabled.get('sql')}>
          CLEAR
        </Btn>
        <Btn onClick={form.reset} className="btn-secondary-outline mr-3" disabled={disabled.get('sql') || form.isPristine}>
          LATEST
        </Btn>
        <Btn type="submit" className="btn-primary" disabled={disabled.get('sql')}>
          EXECUTE
        </Btn>
      </div>
    </Form>

    <div className="p-4">
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  </div>
})
