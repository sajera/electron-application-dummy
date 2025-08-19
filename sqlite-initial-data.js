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
    frame INTEGER DEFAULT 1,
    show INTEGER DEFAULT 1,
    closable INTEGER DEFAULT 1,
    kiosk INTEGER DEFAULT 1,

    backgroundColor TEXT DEFAULT NULL,
    opacity INTEGER DEFAULT NULL,
    transparent INTEGER DEFAULT 0,
    zoomFactor INTEGER DEFAULT 1,

    alwaysOnTop INTEGER DEFAULT 0,
    x INTEGER DEFAULT NULL,
    y INTEGER DEFAULT NULL,
    center INTEGER DEFAULT 0,

    fullscreen INTEGER DEFAULT 0,
    fullscreenable INTEGER DEFAULT 1,
    resizable INTEGER DEFAULT 1,
    minimizable INTEGER DEFAULT 1,
    maximizable INTEGER DEFAULT 1,

    width INTEGER DEFAULT NULL,
    defaultWidth INTEGER DEFAULT NULL,
    minWidth INTEGER DEFAULT NULL,
    maxWidth INTEGER DEFAULT NULL,

    height INTEGER DEFAULT NULL,
    defaultHeight INTEGER DEFAULT NULL,
    minHeight INTEGER DEFAULT NULL,
    maxHeight INTEGER DEFAULT NULL
  )`)
  const windows = db.prepare('INSERT INTO windows (title, frame) VALUES (?,?)')
  windows.run('Default', 1)
  windows.run('No Frame', 0)
  windows.finalize()

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
// eslint-disable-next-line no-console
console.log('SQLite initial at', dbPath)
