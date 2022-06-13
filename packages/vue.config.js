const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    config.entry = {
      app: ['./examples/main.js'],
    }
  },
})
