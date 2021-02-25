import { resolve } from 'path'
const pat = (path) => resolve(__dirname, path)
module.exports = {
  complierOptions: {
    noImplicitAny: false, // 不使用any类型
    alwaysStrict: true, // 是否使用严格模式
    lib: ['ESNext'],
    module: 'ES6', // 生成哪个系统的代码  
    strict: true, // 是否启动所有严格类型检查
    target: 'ESNest', // 指定ESMAScript
    diagnostics: true, // 显示断言信息
    removeComments: true, // 删除所有注释，除了版本号注释
    pretty: true, // 高亮显示，错误信息和追踪信息
    allowJs: false, // 是否编译js
  },
  exclude: ['node_modules', 'public', '/public', 'index.js'],
  baseUrl: '.'
}