// outsource dependencies
import { observer } from 'mobx-react'
import React, { useMemo, useEffect } from 'react'
// local dependencies
import { useFormData } from './form'

// configure
const isEvent = event => !!(event && event.stopPropagation && event.preventDefault && event.target)

export const Field = observer(function Field ({ component: Component, name, onChange, filter, formatter, ...attr }) {
  const store = useFormData()
  const v = store?.value[name]
  const value = useMemo(
    // NOTE format view value
    () => typeof formatter === 'function' ? formatter(v) : v,
    [v, formatter]
  )

  useEffect(() => {
    if (!store) return
    store.register(name)
    return () => store.unregister(name)
  }, [store, name])

  const input = useMemo(() => ({
    id: name,
    name: name,
    onBlur: () => store.setTouch(name),
    onChange: event => {
      let value = isEvent(event) ? event.target.value : event
      // NOTE format data value
      typeof filter === 'function' && (value = filter(value))
      store.setValue(name, value)
      typeof onChange === 'function' && onChange(value)
    },
    // IMPORTANT in case "Component" was changed required to regenerate the "input" object to avoid links between them
  }), [store, filter, name, onChange])

  return !store ? null : <Component
    { ...attr }
    input={input}
    value={value}
    error={store?.error[name] || ''}
    isTouched={Boolean(store?.touch[name])}
  />
})
