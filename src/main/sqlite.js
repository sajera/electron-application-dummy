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
    const dbPath = path.join(appGetPathUserData, this.name)
    this.initialData(dbPath)
    const Database = sqlite3.verbose().Database
    this.db = new Database(dbPath)
    // NOTE listen sql requests from renderer
    // ipcMain.handle('sqlite', this.handleQuery)

    // console.log('SQLite => ', dbPath
    //   , '\n initialData:', initialData
    //   , '\n initialData:', path.resolve(path.dirname(__filename), initialData)
    //   , '\n appGetPathUserData:', appGetPathUserData
    //   , '\n process.resourcesPath:', process.resourcesPath
    //   , '\n fs.readdirSync:', fs.readdirSync(appGetPathUserData)
    // )
  }

  handleQuery = (event, sql, ...param) => new Promise((resolve, reject) => {
    this.db.all(sql, ...param, (error, rows) => error ? reject(error) : resolve(rows))
  })

  close = () => this.db.close()

  // TODO upgrade migrations

}
