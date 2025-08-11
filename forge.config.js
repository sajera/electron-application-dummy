const path = require('path')

module.exports = {
  outDir: '.build',
  packagerConfig: {
    asar: true,
    icon: path.join(process.cwd(), 'src', 'assets', 'app-icon', '512x512.png'),
    extraResource: [
      path.join(process.cwd(), 'src', 'assets', 'app-icon', 'icon.ico'),
      path.join(process.cwd(), 'src', 'assets', 'app-icon', 'icon.png'),
      path.join(process.cwd(), 'src', 'assets', 'app-icon', 'icon.icns'),
      path.join(process.cwd(), 'src', 'assets', 'app-icon', '32x32.png'),
      path.join(process.cwd(), 'src', 'assets', 'app-icon', '128x128.png'),
      path.join(process.cwd(), 'src', 'assets', 'app-icon', '512x512.png'),
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
