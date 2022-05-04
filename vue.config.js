// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/', //接口域名
        changeOrigin: true,               //是否跨域
        pathRewrite: {                    //路径重置
          '^/api': ''
        }
      }
    }
  }
}
