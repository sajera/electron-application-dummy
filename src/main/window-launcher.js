// outsource dependencies

// local dependencies
import WindowRuntime from './window-explorer/window-runtime'

// NOTE something specific to this particular window
export default new class Launcher extends WindowRuntime {

  constructor () {
    super()
  }

  initialize = async options => {
    this.create({
      ...WindowRuntime.defaults.options,
      x: 0,
      y: 0,
      width: 1200,
      height: 800,
      minWidth: 680,
      minHeight: 480,
      title: this.id = 'Launcher',
      ...options,
      webPreferences: {
        preload: LAUNCHER_PRELOAD_WEBPACK_ENTRY,
        ...WindowRuntime.defaults.webPreferences,
      }
    })

    this.window.loadURL(LAUNCHER_WEBPACK_ENTRY)
  }

}
