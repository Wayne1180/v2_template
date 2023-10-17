/*
 * @Author: 王欣磊
 * @Date: 2021-03-09 10:03:07
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-10-08 17:16:11
 * @Description:
 * @FilePath: /ant-pro-admin-min/babel.config.js
 */
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
  plugins.push('lodash')
}

// lazy load ant-design-vue
// if your use import on Demand, Use this code
plugins.push([
  'import',
  {
    libraryName: 'ant-design-vue',
    libraryDirectory: 'es',
    style: true // `style: true` 会加载 less 文件
  },
  '@babel/plugin-proposal-optional-chaining'
])

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins
}
