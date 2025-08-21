// outsource dependencies

// local dependencies
import Window from './window-explorer/window'

// NOTE something specific to this particular window
export default new class Launcher extends Window {

  constructor () {
    super()
  }

  initialize = async options => {
    this.create({
      ...Window.defaults.options,
      x: 0,
      y: 0,
      width: 1200,
      height: 800,
      minWidth: 640,
      minHeight: 480,
      title: 'Launcher',
      ...options,
      webPreferences: {
        preload: LAUNCHER_PRELOAD_WEBPACK_ENTRY,
        ...Window.defaults.webPreferences,
      }
    })

    this.loadURL(LAUNCHER_WEBPACK_ENTRY)
  }

}
