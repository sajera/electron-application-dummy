const sqlite3 = require('sqlite3')
const fs = require('fs')

const dbPath = './src/assets/sqlite/local.db'
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
console.log(`Database created at ${dbPath}`)
