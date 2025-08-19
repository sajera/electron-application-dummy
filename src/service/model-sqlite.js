// outsource dependencies
import _ from 'lodash'

export const TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
}
class DataType {
  type = TYPE.BOOLEAN
  // TODO for now all optional but in future who knows ¯\_(ツ)_/¯
  options = { required: false }

  js = value => this.JS[this.type](value)

  sql = value => this.SQL[this.type](value)

  constructor (type, options) {
    this.type = type || this.type
    this.options = { ...this.options, ...options }
    if (!_.includes(_.values(TYPE), this.type)) throw new Error(`Unknown data type ${this.type}`)
  }

  JS = {
    [TYPE.STRING]: value => _.isNull(value) ? void(0) : String(value),
    [TYPE.NUMBER]: value => _.isNull(value) ? void(0) : Number(value),
    [TYPE.BOOLEAN]: value => ![0, 1, '0', '1'].includes(value) ? void(0) : Boolean(Number(value)),
  }

  SQL = {
    [TYPE.STRING]: value => !value ? null : String(value),
    [TYPE.NUMBER]: value => !value && value !== 0 ? null : Number(value),
    [TYPE.BOOLEAN]: value => ![0, 1, '0', '1', true, false].includes(value) ? null : Number(value)
  }
}

export default class SQLiteModel {
  static get types () {
    return TYPE
  }

  // SQLiteModel.dataType()
  // SQLiteModel.dataType('string')
  // SQLiteModel.dataType('string', { required: true })
  // SQLiteModel.dataType(SQLiteModel.types.STRING)
  // SQLiteModel.dataType(SQLiteModel.types.STRING, { required: true })
  static dataType = (...args) => new DataType(...args)

  static String = () => SQLiteModel.dataType(TYPE.STRING)

  static Number = () => SQLiteModel.dataType(TYPE.NUMBER)

  static Boolean = () => SQLiteModel.dataType(TYPE.BOOLEAN)

  sqlite3all = null
  schema = null
  table = null

  constructor () {

  }

  test = () => {
    if (!_.isObject(this.schema) || _.isEmpty(this.schema)) throw new Error(this.constructor.name+' "schema" is invalid')
    if (!_.isString(this.table) || _.isEmpty(this.table)) throw new Error(this.constructor.name+' "table" is invalid')
    if (!_.isFunction(this.sqlite3all)) throw new Error(this.constructor.name+' "sqlite3all" is not a function')
  }

  getByID = $id => this.sqlite3all(`SELECT * FROM ${this.table} where id = $id`, { $id })
    .then(_.first)
    .then(this.prepareJS)
    .then(data => data || Promise.reject({ message: `No record with ID ${$id} exists in the "${this.table}" table` }))

  removeByID = $id => this.sqlite3all(`DELETE FROM ${this.table} where id = $id`, { $id })

  prepareJS = data => _.reduce(_.keys(this.schema), (acc, field) => {
    acc[field] = this.schema[field].js(data[field])
    return acc
  }, {})

  prepareSQL = data => _.reduce(_.keys(this.schema), (acc, field) => {
    const value = this.schema[field].sql(data[field])
    if (!_.isUndefined(value)) {
      acc.fields.push(field)
      acc.params[`$${field}`] = value
    }
    return acc
  }, { fields: [], params: {} })

  // prepareSQL = data => {
  //   const params = {}
  //   const fields = []
  //   _.map(_.keys(this.schema), field => {
  //     const value = this.schema[field].sql(data[field])
  //     if (!_.isUndefined(value) && !_.isNull(value)) {
  //       fields.push(field)
  //       params[`$${field}`] = value
  //     }
  //   })
  //   return { params, fields }
  // }

  insert = data => {
    const { params, fields } = this.prepareSQL(data)
    return this.sqlite3all(`
      INSERT INTO ${this.table} (${fields.join()})
      VALUES (${fields.map(field => `$${field}`).join()})
      RETURNING *;
   `, params)
      .then(_.first)
      .then(this.prepareJS)
  }

  updateByID = ($id, data) => {
    const { params, fields } = this.prepareSQL(data)

    return this.sqlite3all(`
      UPDATE ${this.table}
      SET ${fields.map(field => `${field} = $${field}`).join()}
      WHERE id = $id
      RETURNING *;
   `, { $id, ...params })
      .then(_.first)
      .then(this.prepareJS)
  }
}

// NOTE sample - for sure such model can be used on both side renderer and main
export class WindowSQ extends SQLiteModel {
  table = 'windows'

  schema = {
    title: SQLiteModel.String(),
    width: SQLiteModel.Number(),
    show: SQLiteModel.Boolean(),
  }

  constructor () {
    super()
    this.sqlite3all = '(new sqlite3.Database(path/to/db)).all'
    this.test()
  }

}
