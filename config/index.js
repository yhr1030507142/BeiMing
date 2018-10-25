'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/localhost': {
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        target: 'http://localhost:3000/',// 接口的域名
        pathRewrite: {
          '/api/localhost': ''//后面可以使重写的新路径，一般不做更改
        }
      },
      '/api/liugaoyang': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: 'http://192.168.0.121:9012/',// 接口的域名
          pathRewrite: {
            '^/api/liugaoyang': ''//后面可以使重写的新路径，一般不做更改
          }
        },
        '/api/chengpeng': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: 'http://192.168.0.110:8002/',// 接口的域名
          pathRewrite: {
            '^/api/chengpeng': ''//后面可以使重写的新路径，一般不做更改
          }
        },
        '/api/yangguoli': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: 'http://192.168.0.198:15000/',// 接口的域名
          pathRewrite: {
            '^/api/yangguoli': ''//后面可以使重写的新路径，一般不做更改
          }
        },
        '/api/gouwuche': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: 'http://192.168.0.222:8003/',// 接口的域名
          pathRewrite: {
            '^/api/gouwuche': ''//后面可以使重写的新路径，一般不做更改
          }
        },
        '/api/liangsijie': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: 'http://192.168.0.187:6002/',// 接口的域名
          pathRewrite: {
            '^/api/liangsijie': ''//后面可以使重写的新路径，一般不做更改
          }
        },
        '/api/feedback': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: ' http://192.168.0.222:8005/',// 接口的域名
          pathRewrite: {
            '^/api/feedback': ''//后面可以使重写的新路径，一般不做更改
          }
        },
        '/api/lol': {
          changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          target: 'http://192.168.0.198:15000/',// 接口的域名
          pathRewrite: {
            '^/api/lol': ''//后面可以使重写的新路径，一般不做更改
          }
        },
       
        
       
        },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    user:path.resolve(__dirname, '../dist/user.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
