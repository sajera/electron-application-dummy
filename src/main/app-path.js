// outsource dependencies
import fs from 'fs'
import path from 'path'
import { app } from 'electron'
// local dependencies

const sourceFolder = type => path.join(
  app.isPackaged ? app.getPath(type) : path.dirname(__filename),
  app.isPackaged ? 'sajera' : `simulate-system-folders/${type}`
)
const PATH = {
  MAIN: __filename,
  EXE: app.getPath('exe'),
  LOGS: sourceFolder('logs'),
  TEMP: sourceFolder('temp'),
  APP_DATA: sourceFolder('appData'),
  USER_DATA: sourceFolder('userData'),
  // NOTE same as __filename on prod
  // NOTE path where the bundled app resource is located
  RESOURCES: app.isPackaged ? process.resourcesPath : path.dirname(__filename),
}

// NOTE create app folder if not
for (const src of Object.values(PATH)) {
  !fs.existsSync(src) && fs.mkdirSync(src, { recursive: true })
}

export default PATH
