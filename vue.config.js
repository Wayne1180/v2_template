const { execSync } = require('child_process')
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const GitRevision = new GitRevisionPlugin()
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// happypack
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
function resolve (dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash () {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    // '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    // '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    // '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    // '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}
const plugins = [
  // Ignore all locale files of moment.js
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.DefinePlugin({
    APP_VERSION: `"${require('./package.json').version}"`,
    GIT_HASH: JSON.stringify(getGitHash()),
    BUILD_DATE: buildDate
  }),
  new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool
  })
]
isProd &&
  plugins.push(
    ...[
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: ['./public/library/onlinesheet/demoData/', './public/library/onlinesheet/index.html']
          },
          onEnd: {
            delete: ['./dist*.zip'],
            archive: [
              {
                source: path.join(__dirname, './dist'),
                destination: path.join(__dirname, `./dist_${require('./package.json').version}_${getGitHash()}.zip`)
              }
            ],
            copy: [{ source: `./dist*.zip`, destination: './dist/' }]
          }
        }
      }),
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png$|\.otf$|\.ttf$|\.svg$|\.gif$|\.eot$|\.woff$/, // 需要压缩的文件类型
        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    ]
  )
isProd &&
  plugins.push({
    apply: (compiler) => {
      compiler.hooks.done.tap('feishuHook', (compilation) => {
        try {
          execSync(`${process.env.RSYNC}`, { stdio: 'inherit' })
          const object = {
            msg_type: 'post',
            content: {
              post: {
                zh_cn: {
                  title: '前端包更新通知',
                  content: [
                    [
                      {
                        tag: 'text',
                        text: `Ver: ${require('./package.json').version}`
                      }
                    ],
                    [
                      {
                        tag: 'text',
                        text: `BuildDate: ${buildDate.replace(/"/g, '')}`
                      }
                    ],
                    [
                      {
                        tag: 'text',
                        text: `访问地址:`
                      },
                      {
                        tag: 'a',
                        text: `点击跳转`,
                        href: `http://${process.env.NGINXHOST}`
                      }
                    ],
                    [
                      {
                        tag: 'text',
                        text: `下载链接:`
                      },
                      {
                        tag: 'a',
                        text: `dist_${require('./package.json').version}_${getGitHash()}.zip`,
                        href: `http://${process.env.NGINXHOST}/dist_${
                          require('./package.json').version
                        }_${getGitHash()}.zip`
                      }
                    ]
                  ]
                }
              }
            }
          }
          axios.post(process.env.FSHOOK, object)
        } catch (err) {
          console.log('error -->', err)
        }
      })
    }
  })
// vue.config.js
const vueConfig = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: isProd ? 'disabled' : 'disabled',
      analyzerPort: 9998
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: plugins,
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.module
      .rule('css')
      .test(/\.css$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    const jsRule = config.module.rule('js')
    jsRule.uses.clear()
    jsRule.use('happypack/loader?id=babel').loader('happypack/loader?id=babel').end()

    // if prod is on
    // assets require on cdn
    if (isProd) {
      // config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())
      config.plugin('html').tap((args) => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#003A8C',
          // 'primary-1': 'rgba(250,250,250)',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '2px',
          // 'table-selected-row-bg': 'rgba(0, 58, 140, 0.1)'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            viewportWidth: 1920,
            viewportHeight: 1080,
            unitPrecision: 8,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore'],
            minPixelValue: 2,
            mediaQuery: false
          })
        ]
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    hot: true,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api/demo': {
        // LAN - http://192.168.1.17:9000/api   WAN - http://42.193.102.55:9000/api PRODUCTION - http://198.17.120.35:29080/api
        target: 'http://192.168.101.206:9999/api/demo',
        ws: false,
        changeOrigin: true,
        pathRewrite: { '^/api/demo': '' }
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
