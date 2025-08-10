// outsource dependencies
import { makeAutoObservable } from 'mobx'

// TODO allow nested fields "entity.name"
// TODO allow nested field array "list[index].name"

export class FormData {
  #initial = {}
  #validate = null
  #submit = null
  error = {}
  touch = {}
  value = {}
  registered = []

  get isPristine () {
    // console.log('%c isPristine ', 'color: #356169'
    //   , '\n #initial:', JSON.stringify(this.#initial, null, 4)
    //   , '\n values:', JSON.stringify(this.value, null, 4)
    //   , '\n touch:', JSON.stringify(this.touch, null, 4)
    //   , '\n res:', !this.registered.map(field => this.#initial[field] != this.value[field]).includes(true)
    // )
    // NOTE only visible fields
    // eslint-disable-next-line eqeqeq
    return !this.registered.map(field => this.#initial[field] != this.value[field]).includes(true)
    // TODO handle deep equal
  }

  get isValid () {
    // console.log('%c isValid ', 'color: #356169'
    //   , '\n registered:', JSON.stringify(this.registered, null, 4)
    //   , '\n values:', JSON.stringify(this.value, null, 4)
    //   , '\n errors:', JSON.stringify(this.error, null, 4)
    // )
    // NOTE any errors within
    // return !Object.values(this.error).map(item => Boolean(item)).includes(true)
    // NOTE only errors of visible fields
    return !this.registered.map(field => Boolean(this.error[field])).includes(true)
    // TODO handle nested errors
  }

  constructor (initial = {}, validate = null, submit = null) {
    this.initialize(initial)
    makeAutoObservable(this)
    // NOTE avoid listening changes
    this.#validate = validate
    this.#submit = submit
  }

  initialize = initial => {
    this.#initial = initial
    this.reset()
  }

  reset = () => {
    this.value = { ...this.#initial }
    this.error = {}
    this.touch = {}
  }

  register = field => this.registered.push(field)

  unregister = field => this.registered = this.registered.filter(item => item !== field)

  setValue = (field, value) => {
    // TODO handle nested values
    this.value = { ...this.value, [field]: value }
    this.validate(field)
  }

  setTouch = (field, value = true) => {
    // TODO handle nested values
    this.touch = { ...this.touch, [field]: value }
    this.validate()
  }

  setError = (field, error) => {
    this.error = { ...this.error, [field]: error }
  }

  setExternalErrors = errors => {
    this.error = errors
    return this.registered.map(field => this.touch[field] = true)
  }

  validate = field => typeof this.#validate === 'function' && (this.error = this.#validate(this.value, field) || {})

  submit = () => {
    this.validate()
    if (!this.isValid) return this.registered.map(field => this.touch[field] = true)
    // NOTE mark all fields as touched in order to display errors
    typeof this.#submit === 'function' && this.#submit(this.value)
  }
}
