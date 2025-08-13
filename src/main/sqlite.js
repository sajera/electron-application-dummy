// outsource dependencies
import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'
import { ipcMain } from 'electron'
// local dependencies
import initialData from '../assets/sqlite/local.db'

export default new class SQLite {
  db = null

  name = 'local.db'

  constructor () {
    // TODO is that usefully ?
  }

  get debugInfo () {
    return {
      db: this.db,
      name: this.name,
      initialData: initialData,
      initial: path.resolve(path.dirname(__filename), initialData),
    }
  }

  initialData = dbPath => {
    // NOTE skip in case db already setup
    if (fs.existsSync(dbPath)) return console.log('DB already exist')
    // const initial = path.join(process.resourcesPath, this.name)
    const initial = path.resolve(path.dirname(__filename), initialData)

    // TODO check the build
    console.log('Coping prebuilt database to userData')
    if (fs.existsSync(initial)) {
      fs.copyFileSync(initial, dbPath)
      console.log('Copied + ')
    } else {
      console.log('No prebuilt database found', initial)
    }
  }

  initialize = appGetPathUserData => {
    const dbPath = path.join(appGetPathUserData, 'local', this.name)
    this.initialData(dbPath)
    // FIXME faced a webpack problems using "import sqlite3 from 'sqlite3'"
    // const Database = require('sqlite3').verbose().Database
    const Database = sqlite3.verbose().Database
    this.db = new Database(dbPath)
    // NOTE listen sql requests from renderer
    ipcMain.handle('sqlite', this.handleQuery)
  }

  handleQuery = (event, sql, ...param) => new Promise((resolve, reject) => {
    this.db.all(sql, ...param, (error, rows) => error ? reject(error) : resolve(rows))
  })

  close = () => this.db.close()

  // TODO upgrade migrations

}
