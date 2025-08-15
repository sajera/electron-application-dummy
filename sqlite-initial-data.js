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
    title TEXT NOT NULL,
    height INTEGER,
    width INTEGER,
    show INTEGER DEFAULT 0,
    closed INTEGER DEFAULT 1
  )`)
  const windows = db.prepare('INSERT INTO windows (title) VALUES (?)')
  windows.run('Test 1')
  windows.run('Test 2')

  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT
  )`)

  const users = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
  users.run('Alice', 'alice@example.com')
  users.run('Bob', 'bob@example.com')
  users.run('Carol', 'carol@example.com')
  users.finalize()
})

db.close()
console.log('SQLite initial at', dbPath)
