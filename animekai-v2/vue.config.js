const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vtt')
      .test(/\.vtt$/)
      .use('raw-loader')
      .loader('raw-loader');
  }
});