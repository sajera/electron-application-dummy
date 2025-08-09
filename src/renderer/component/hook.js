// outsource dependencies
import { useCallback, useState } from 'react'
// local dependencies

export const stopPropagation = event => typeof event?.stopPropagation === 'function' && event.stopPropagation()
export const preventDefault = event => typeof event?.preventDefault() === 'function' && event.preventDefault()

/**
 * correct extract ref to provide ability use ref with "useEffect" hook
 */
export const useRefCallback = () => {
  const [stored, set] = useState(null)
  // NOTE prevent update "reference" within render
  const ref = useCallback(api => api && set(api), [])
  return [stored, ref]
}

/**
 * prepared boolean toggle
 * @param initial {Boolean}
 * @returns {[boolean,(function(): void)]}
 */
export const useToggle = initial => {
  const [value, set] = useState(Boolean(initial))
  return [value, useCallback(() => set(current => !current), []), set]
}
