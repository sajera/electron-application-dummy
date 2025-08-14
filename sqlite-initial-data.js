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
  db.run(`CREATE TABLE windows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT
  )`)


  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT
  )`)

  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
  stmt.run('Alice', 'alice@example.com')
  stmt.run('Bob', 'bob@example.com')
  stmt.run('Carol', 'carol@example.com')
  stmt.finalize()
})

db.close()
console.log('SQLite initial at', dbPath)
