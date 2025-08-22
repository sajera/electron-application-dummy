// outsource dependencies

// local dependencies
import WindowRuntime from './window-explorer/window-runtime'

// NOTE something specific to this particular window
export default new class Initializer extends WindowRuntime {

  constructor () {
    super()
  }

  initialize = async options => {
    this.create({
      ...WindowRuntime.defaults.options,
      width: 400,
      height: 400,
      frame: false,
      alwaysOnTop: true,
      title: this.id = 'Initializer',
      ...options,
      webPreferences: {
        preload: INITIALIZER_PRELOAD_WEBPACK_ENTRY,
        ...WindowRuntime.defaults.webPreferences,
        transparent: true,
      }
    })

    this.loadURL(INITIALIZER_WEBPACK_ENTRY)

    await this.whenReady()
  }

}
