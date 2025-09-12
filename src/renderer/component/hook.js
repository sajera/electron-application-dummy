// outsource dependencies
import { useCallback, useState, useEffect } from 'react'
// local dependencies
import { ToggleLS } from '../launcher/local-storage'

export const stopPropagation = event => typeof event?.stopPropagation === 'function' && event.stopPropagation()
export const preventDefault = event => typeof event?.preventDefault === 'function' && event.preventDefault()

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

/**
 * prepared boolean toggle with saving state into local storage by id of toggle
 * @param id {String}
 * @param [def=true] {Boolean} default value
 * @returns {[boolean,(function(): void)]}
 */
export const useStoredToggle = (id, def = true) => {
  const storage = ToggleLS.get() || {}
  const [value, set] = useState(typeof storage[id] === 'undefined' ? def : storage[id])
  useEffect(() => id && ToggleLS.update({ [id]: value }), [value, id])
  return [value, useCallback(() => set(current => !current), []), set]
}

/**
 * Check the event targets recursively
 * @param [target=null] {Element}
 * @param check {Function}
 * @param [result=false] {Boolean}
 * @param [limit=5] {Number}
 * @returns {Boolean}
 */
export function checkParentNodes (target, check, result = false, limit = 5) {
  // console.log('cpn', limit, target, result)
  if (!target || !check || !limit || result || limit < 1) return result
  if (!target?.parentNode) return check(target)
  return checkParentNodes(target.parentNode, check, check(target), --limit)
}

/**
 * check the event target to know the active component was touched within
 * @param event {SyntheticEvent}
 * @param [classes=['btn', 'link']] {Array<String>}
 * @param [tags=['A', 'BUTTON', 'INPUT']] {Array<String>}
 * @returns {Boolean}
 */
export const isActiveElement = (event, classes = ['btn', 'link', 'dropdown'], tags = ['A', 'BUTTON', 'INPUT']) => {
  // NOTE incorrect target
  if (!event?.target) return false
  // NOTE shouldn't be reacted in case text selection
  if (String(window.getSelection())) return true
  // return checkParentNodes(event.target, el => tags.includes(el.tagName) || classes.map(cn => el.classList?.contains(cn)).includes(true))
  return checkParentNodes(event.target, el => {
    // NOTE match with element tag name
    if (tags?.includes(el.tagName)) return true
    // NOTE match with element class
    if (classes?.map(cn => el.classList?.contains(cn)).includes(true)) return true
  })
}
