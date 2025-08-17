// outsource dependencies
import _ from 'lodash'


export default class SQLiteModel {
  sqlite3all = null
  schema = null
  table = null

  static Bool = value => [0,1, '0', '1', true, false].includes(value) ? Boolean(Number(value)) : null

  constructor () {

  }

  test = () => {
    if (!_.isObject(this.schema) || _.isEmpty(this.schema)) throw new Error(this.constructor.name+' "schema" is invalid')
    if (!_.isString(this.table) || _.isEmpty(this.table)) throw new Error(this.constructor.name+' "table" is invalid')
    if (!_.isFunction(this.sqlite3all)) throw new Error(this.constructor.name+' "sqlite3all" is not a function')
  }

  getByID = $id => this.sqlite3all(`SELECT * FROM ${this.table} where id = $id`, { $id })
    .then(_.first)
    .then(data => data || Promise.reject({ message: `No record with ID ${$id} exists in the "${this.table}" table` }))

  removeByID = $id => this.sqlite3all(`DELETE FROM ${this.table} where id = $id`, { $id })

  getDataValues = data => {
    const params = {}
    const fields = []
    const values = _.reduce(_.keys(this.schema), (acc, field) => {
      const value = this.schema[field](data[field])
      if (!_.isUndefined(value) && !_.isNull(value)) {
        const key = `$${field}`
        acc.push(key)
        fields.push(field)
        params[key] = value
      }
      return acc
    }, [])
    return { params, values, fields }
  }

  insert = data => {
    const params = {}
    const fields = []
    const values = _.reduce(_.keys(this.schema), (acc, field) => {
      const value = this.schema[field](data[field])
      if (!_.isUndefined(value) && !_.isNull(value)) {
        const key = `$${field}`
        acc.push(key)
        fields.push(field)
        params[key] = value
      }
      return acc
    }, [])

    return this.sqlite3all(`
      INSERT INTO ${this.table} (${fields.join()})
      VALUES (${values.join()})
      RETURNING *;
   `, params).then(_.first)
  }

  updateByID = ($id, data) => {
    const params = {}
    const values = _.reduce(_.keys(this.schema), (acc, field) => {
      const value = this.schema[field](data[field])
      if (!_.isUndefined(value) && !_.isNull(value)) {
        const key = `$${field}`
        acc.push(`${field} = ${key}`)
        params[key] = value
      }
      return acc
    }, [])

    return this.sqlite3all(`
      UPDATE ${this.table}
      SET ${values.join(', ')}
      WHERE id = $id
      RETURNING *;
   `, { $id, ...params }).then(_.first)
  }
}

// NOTE sample - for sure such model can be used on both side renderer and main
export class WindowSQ extends SQLiteModel {
  table = 'windows'

  schema = {
    title: String,
    width: Number,
    height: Number,
    show: SQLiteModel.Bool,
    closed: SQLiteModel.Bool,
  }

  constructor (sqlite3all) {
    super()
    this.sqlite3all = sqlite3all
    this.test()
  }

}
