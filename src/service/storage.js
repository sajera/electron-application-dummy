
/**
 * helper to simplify usage of stores
 * @example const local = new Storage(window.localStorage);
 */
class Storage {
  store = null

  isSupported = true

  constructor (store) {
    this.store = store
    try {
      const property = 'null'
      const value = '_test_store_by_storage_service'
      // NOTE check availability of storage
      this.store.setItem(property, value)
      const extracted = this.store.getItem(property)
      this.store.removeItem(property)
      if (extracted !== value) { throw new Error('Invalid "storage" behavior') }

    } catch (error) {
      this.isSupported = false
      console.error('%c Storage "not supported"', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
        , '\n store:', store
        , '\n error:', error
      )
    }
  }

  remove = name => this.isSupported && this.store.removeItem(name)

  set = (name, data) => {
    if (!this.isSupported) return null
    this.remove(name)
    this.store.setItem(name, JSON.stringify(data))
  }

  get = name => {
    if (!this.isSupported) return null
    const data = this.store.getItem(name)
    try { // NOTE data can be simple string
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }

  update = (name, data = {}) => {
    if (!this.isSupported) return null
    // NOTE working fine only with objects
    const prev = this.get(name) || {}
    this.set(name, Object.assign(prev, data))
  }

  /**
   * helper to simplify usage of storage binded to specific path
   * @example const TestStore = (new Storage(window.localStorage)).bindToPath('e');
   * @param {String} name
   * @return {{path: *, set: (function(*=): void), get: (function(): any)}}
   */
  bindToPath = name => ({
    name,
    get: () => this.get(name),
    isSupported: this.isSupported,
    remove: () => this.remove(name),
    set: value => this.set(name, value),
    update: value => this.update(name, value),
  })
}

/**
 * Prepared stores for specific things
 */
export const localStorage = new Storage(window.localStorage)
export const sessionStorage = new Storage(window.sessionStorage)

