const path = require('path')

module.exports = {
  outDir: '.build',
  packagerConfig: {
    asar: true,
    // icon: path.join(process.cwd(), 'image', 'favicon-96x96.ico')
    // icon: path.join(process.cwd(), 'image', 'logo-512x512.png')
    // icon: './image/favicon-96x96.ico'
    // FIXME relative path ?
    icon: path.join(process.cwd(), 'image', 'logo-512x512.png'),
    extraResource: [
      path.join(process.cwd(), 'image', 'favicon-96x96.ico'),
    ],
  },
  rebuildConfig: {
    force: true
  },
  // TODO recheck
  makers: [
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {},
    // },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {},
    // },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './public/image/logo-512x512.png',
        format: 'ULFO',
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        port: 3333,
        loggerPort: 9999,
        devServer: {
          client: {
            // logging: 'warn',
            reconnect: true,
            overlay: false,
          },
        },
        mainConfig: './webpack/main.js',
        renderer: {
          config: './webpack/renderer.js',
          entryPoints: [
            {
              name: 'launcher',
              html: './src/renderer/launcher/index.html',
              js: './src/renderer/launcher/index.js',
              preload: {
                js: './src/main/preload.js',
              },
            },
            {
              name: 'initializer',
              html: './src/renderer/initializer/index.html',
              js: './src/renderer/initializer/index.js',
              preload: {
                js: './src/main/preload.js',
              },
            },
          ],
        },
      },
    },
  ],
}
