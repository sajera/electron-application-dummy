


// TODO to think about common pieces


/**
 * formatting html to plain text
 *
 * @param {String} html
 * @returns {String}
 */
export const escapeHtml = (html = '') => String(html).replace(/<[^>]*>?/gm, '')

/**
 * trim text input
 * @param {String} value
 * @return {string}
 */
export const trim = value => String(value).trim()

/**
 * safety parse json
 * @param {String} json
 * @param {Object} [def={}]
 * @returns {any}
 */
export const safeJsonParse = (json, def = {}) => {
  try { return typeof json === 'string' ? JSON.parse(json) : def } catch ({ message }) {
    console.error('%c safeJsonParse ', 'color: #467ABB; font-weight: bolder'
      , '\n error:', message
      , '\n json:', json
    )
  }
  return def
}

/**
 * create promise which resolves after "delay"
 * @param {Number} delay
 * @param {Object} [result=undefined]
 * @returns {Promise}
 */
export const delayResolve = (delay, result) => new Promise(resolve => setTimeout(resolve, delay || 40, result))
