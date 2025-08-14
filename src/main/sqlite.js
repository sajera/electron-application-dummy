// outsource dependencies
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import sqlite3 from 'sqlite3'
// local dependencies
import PATH from './app-path'
import { ipcMain } from 'electron'
import initialData from '../assets/sqlite/local.initial.sqlite'

export default new class SQLite {
  name = 'app.db'

  db = null

  dbPath = path.join(PATH.APP_DATA, this.name)

  dbInitial = path.join(PATH.RESOURCES, initialData)

  constructor () {
    // TODO is that usefully ?
  }

  getDebugInfo = () => {
    const { name, folder, dbInitial, dbPath } = this
    return { name, folder, dbPath, dbInitial }
  }

  prebuilt = () => {
    // NOTE skip in case db already setup
    if (fs.existsSync(this.dbPath)) return
    // NOTE copy initial file
    fs.existsSync(this.dbInitial) && fs.copyFileSync(this.dbInitial, this.dbPath)
  }

  initialize = () => {
    // NOTE setup DB handler
    ipcMain.handle('sqlite', this.handleQuery)
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
    const upgrades = _.filter(
      fs.readdirSync(PATH.RESOURCES),
      name => /^upgrade.*\.sqlite$/.test(name)
    )

    for (const file of upgrades) {
      console.log('upgrade from ', file)

    }

    // TODO upgrade migrations
    console.info('DB up to date ')
  }
}
