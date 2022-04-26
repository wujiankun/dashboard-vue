const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://edufront.lagounews.com/',
        changeOrigin: true
      }
    }
  },

  css: { loaderOptions: { scss: { additionalData: "@import '~@/styles/variables.scss';" } } }
})
