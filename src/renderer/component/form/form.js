// outsource dependencies
import React, { memo, useCallback, createContext, useContext } from 'react'
// local dependencies

export const FormContext = createContext('form')
export const useFormData = () => useContext(FormContext)

// TODO allow nested fields "entity.name"
// TODO allow nested field array "list[index].name"

export const Form = memo(function Form ({ store, children, ...attr }) {
  const handleSubmit = useCallback(event => {
    event.preventDefault()
    store.submit()
  }, [store])

  return <FormContext.Provider value={store}>
    <form { ...attr } onSubmit={handleSubmit}>
      { children }
    </form>
  </FormContext.Provider>
})
// TODO PropTypes definition
