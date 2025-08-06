module.exports = {
  outDir: '.cache',
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
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
            overlay: {
              errors: true,
              warnings: false,
            },
          },
        },
        mainConfig: './webpack/main.js',
        renderer: {
          config: './webpack/renderer.js',
          entryPoints: [
            {
              name: 'forge',
              html: './index.html',
              js: './index-renderer.js',
              preload: {
                js: './index-preload.js',
              },
            },
          ],
        },
      },
    },
  ],
}
