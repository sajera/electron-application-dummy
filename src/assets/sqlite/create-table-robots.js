module.exports = SQLite => new Promise((resolve, reject) => {
  SQLite.db.serialize(() => {
    SQLite.db.run(`CREATE TABLE robots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`)
    const robots = SQLite.db.prepare('INSERT INTO robots (name) VALUES (?)')
    robots.run('Default')
    robots.finalize(err => !err ? resolve() : reject(err))
  })
})
