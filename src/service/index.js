


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

/**
 * safe creation of dynamical regular expression
 * IMPORTANT for "test" method of RegExp "g" flag lead to unexpected behaviour or require clearing regexp.lastIndex each time ¯\_(ツ)_/¯
 * @param {String} value
 * @param {String} [flags='']
 * @param {Boolean} [strict=false]
 * @returns {RegExp}
 */
export const safeRegExp = (value, flags, strict) => {
  try {
    return new RegExp(`(${value || '100% not match with entire string'})`, flags)
  } catch (e) {
    return strict ? /100% not match with entire string/ : /.*/
  }
}
