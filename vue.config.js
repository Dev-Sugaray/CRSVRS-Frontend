const { defineConfig } = require('@vue/cli-service');
const themeColor = '#030169';
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: themeColor,
    msTileColor: themeColor
  }
})
