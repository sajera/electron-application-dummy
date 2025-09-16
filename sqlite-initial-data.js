const fs = require('fs')
const sqlite3 = require('sqlite3')

/************************************************
 * This script is required only once before the first live build.
 * After that, initial.sqlite becomes part of the Git repository,
 * and the database receives new changes via migrations.
 * Until the app goes live, I will continue updating initial.sqlite
 ************************************************/

const dbPath = './src/assets/sqlite/local.initial.sqlite'
// Delete if exists (for demo purposes)
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath)

const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`CREATE TABLE migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    script TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )`)
  const migrations = db.prepare('INSERT INTO migrations (script, done) VALUES (?,?)')
  migrations.run('___init', 1)
  migrations.finalize()
})

db.close()
// eslint-disable-next-line no-console
console.log('SQLite initial at', dbPath)
