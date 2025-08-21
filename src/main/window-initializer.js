// outsource dependencies

// local dependencies
import Window from './window-explorer/window'

// NOTE something specific to this particular window
export default new class Initializer extends Window {

  constructor () {
    super()
  }

  initialize = async options => {
    this.create({
      ...Window.defaults.options,
      width: 400,
      height: 400,
      frame: false,
      alwaysOnTop: true,
      title: 'Initializer',
      ...options,
      webPreferences: {
        preload: INITIALIZER_PRELOAD_WEBPACK_ENTRY,
        ...Window.defaults.webPreferences,
        transparent: true,
      }
    })

    this.loadURL(INITIALIZER_WEBPACK_ENTRY)

    await this.whenReady()
  }

}
