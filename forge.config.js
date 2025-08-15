const path = require('path')

module.exports = {
  hooks: {
    generateAssets: async forgeConfig => {
      // console.log(`Starting up app on platform: ${process.platform}`, forgeConfig)
      require('./sqlite-initial-data')
    }
  },
  outDir: '.build',
  packagerConfig: {
    asar: true,
    prune: true,
    osxSign: {}, // object must exist even if empty
    // icon: path.join(process.cwd(), 'src', 'assets', 'app-icon', '512x512.png'),
    icon: './src/assets/app-icon/512x512.png',
    extraResource: [
      './src/assets/app-icon/icon.ico',
      './src/assets/app-icon/icon.png',
      './src/assets/app-icon/icon.icns',
      './src/assets/app-icon/512x512.png',
      './src/assets/app-icon/electron.icns',
      './src/assets/sqlite/local.initial.sqlite',
      // TODO migrations
      // './src/assets/sqlite/upgrade-add_test_table.sqlite',
    ],
  },
  rebuildConfig: {
    force: true
  },
  makers: [
    //  FIXME usefully ?
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     setupIcon: './src/assets/app-icon/icon.ico',
    //   },
    // },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(process.cwd(), 'src', 'assets', 'app-icon', '128x128.png')
        }
      },
    },
    //  FIXME usefully ?
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        overwrite: true,
        icon: path.join(process.cwd(), 'src', 'assets', 'app-icon', 'icon.icns'),
      }
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        icon: path.join(process.cwd(), 'src', 'assets', 'app-icon', 'icon.ico'),
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
