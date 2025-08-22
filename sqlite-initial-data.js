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
--     icon TEXT DEFAULT NULL,
    backgroundColor TEXT DEFAULT NULL,
    opacity INTEGER DEFAULT NULL,
    paintWhenInitiallyHidden INTEGER DEFAULT 0,
    useContentSize INTEGER DEFAULT 0,
    x INTEGER DEFAULT NULL,
    y INTEGER DEFAULT NULL,
    center INTEGER DEFAULT 0,
    frame INTEGER DEFAULT 1,
    show INTEGER DEFAULT 1,
    closable INTEGER DEFAULT 1,
    kiosk INTEGER DEFAULT 0,
    alwaysOnTop INTEGER DEFAULT 0,
    fullscreen INTEGER DEFAULT 0,
    skipTaskbar INTEGER DEFAULT 0,
    movable INTEGER DEFAULT 1,
    focusable INTEGER DEFAULT 1,
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
    maxHeight INTEGER DEFAULT NULL,
--     webPreferences
    transparent INTEGER DEFAULT 0,
    zoomFactor INTEGER DEFAULT NULL,
    devTools INTEGER DEFAULT 0,
    nodeIntegration INTEGER DEFAULT 0,
    nodeIntegrationInWorker INTEGER DEFAULT 0,
    nodeIntegrationInSubFrames INTEGER DEFAULT 0,
--     preload TEXT DEFAULT NULL,
--     session TEXT DEFAULT NULL,
--     partition TEXT DEFAULT NULL,
    sandbox INTEGER DEFAULT 0,
    javascript INTEGER DEFAULT 1,
    webSecurity INTEGER DEFAULT 1,
    allowRunningInsecureContent INTEGER DEFAULT 0,
    images INTEGER DEFAULT 1,
    imageAnimationPolicy TEXT DEFAULT 'animate',
    textAreasAreResizable INTEGER DEFAULT 1,
    webgl INTEGER DEFAULT 1,
    plugins INTEGER DEFAULT 0,
    experimentalFeatures INTEGER DEFAULT 0,
    scrollBounce INTEGER DEFAULT 0,
    enableBlinkFeatures TEXT DEFAULT NULL,
    disableBlinkFeatures TEXT DEFAULT NULL,
    defaultFontSize INTEGER DEFAULT 16,
    defaultMonospaceFontSize INTEGER DEFAULT 13,
    minimumFontSize INTEGER DEFAULT 0,
    defaultEncoding TEXT DEFAULT NULL,
    backgroundThrottling INTEGER DEFAULT 1,
    offscreen INTEGER DEFAULT 0,
    contextIsolation INTEGER DEFAULT 1,
    webviewTag INTEGER DEFAULT 0,
    additionalArguments TEXT DEFAULT '',
    safeDialogs INTEGER DEFAULT 0,
    safeDialogsMessage TEXT DEFAULT NULL,
    disableDialogs INTEGER DEFAULT 0,
    navigateOnDragDrop INTEGER DEFAULT 0,
    autoplayPolicy TEXT DEFAULT 'no-user-gesture-required',
    disableHtmlFullscreenWindowResize INTEGER DEFAULT 0,
    accessibleTitle TEXT DEFAULT NULL,
    spellcheck INTEGER DEFAULT 1,
    enableWebSQL INTEGER DEFAULT 1,
    v8CacheOptions TEXT DEFAULT 'code',
    enablePreferredSizeMode INTEGER DEFAULT 0
  )`)
  const windows = db.prepare('INSERT INTO windows (title, kiosk) VALUES (?,?)')
  windows.run('Default', 0)
  windows.run('Kiosk', 1)
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
