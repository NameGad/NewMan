
const HtmlWebpackPlugin = require('HtmlWebpackPlugin')
// 引入node的path，专门解路径问题 
const path = require('path')

module.exports = {
  mode:'development', // 开发模式
  enpty:'./src/js/app.js',  // 入口
  output:{  // 出口
    path:path.resolve(__dirname,'build'), // 当前文件夹下的build
    fileName:'main.js'  // 导出的文件的文件名
  },
  // 配置各种loader
  module:{
    rules:[
      // 配置css-loader处理css文件
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      // 配置sass-loader
      {
        test:/\.s[sc]ss$/,
        use:['style-loader','css-loader','sass-loader']
      }
    ]
  },
  // 配置插件
  plugins:[
    new HtmlWebpackPlugin()
  ]
}