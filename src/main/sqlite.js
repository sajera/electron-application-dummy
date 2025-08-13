// outsource dependencies
import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'
// local dependencies
import initialData from '../assets/sqlite/local.initial.sqlite'

export default new class SQLite {
  name = 'app.db'

  db = null

  dbPath = null

  dbInitial = null

  constructor () {
    // TODO is that usefully ?
  }

  getDebugInfo () {
    const { name, folder, dbInitial, dbPath } = this
    return { name, folder, dbPath, dbInitial }
  }

  prebuilt = () => {
    // NOTE getting initial DB data
    this.dbInitial = path.join(process.resourcesPath, initialData)
    // NOTE for dev mode
    !fs.existsSync(this.dbInitial) && (this.dbInitial = path.join(path.dirname(this.dbPath), initialData))
    // NOTE skip in case db already setup
    if (fs.existsSync(this.dbPath)) return console.log('DB already exist')
    process.env.DEBUG && console.log('Setting up initial DB', this.dbPath)
    if (fs.existsSync(this.dbInitial)) {
      fs.copyFileSync(this.dbInitial, this.dbPath)
      process.env.DEBUG && console.log('DB prefilled from', this.dbInitial)
    } else {
      process.env.DEBUG && console.log('No prebuilt found', this.dbInitial)
    }
  }

  initialize = appData => {
    this.dbPath = path.join(appData, this.name)
    // NOTE handle prebuilt DB
    this.prebuilt()
    // NOTE up SQLite
    const Database = !process.env.DEBUG ? sqlite3.Database : sqlite3.verbose().Database
    this.db = new Database(this.dbPath)
    // NOTE run upgrade migrations
    this.upgrade()
  }

  handleQuery = (event, sql, ...param) => new Promise((resolve, reject) => {
    this.db.all(sql, ...param, (error, data) => error ? reject(error) : resolve(data))
  })

  close = () => this.db?.close()

  upgrade = () => {
    const upgradesPath = path.dirname(this.dbInitial)
    // console.log('DB upgrade from', upgradesPath)
    // console.log(fs.readdirSync(upgradesPath))

    // TODO upgrade migrations
    process.env.DEBUG && console.log('DB up to date ')
    return upgradesPath
  }
}
