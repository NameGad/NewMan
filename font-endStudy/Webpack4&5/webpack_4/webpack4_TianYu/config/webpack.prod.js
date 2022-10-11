/* 
  1.该文件是webpack的配置文件，所有的webpack的任务、用到的loader、plugins都要配置在这里
  2.改文件要符合CJS模块化规范(因为webpack是基于node运行的，而node需要符合CJS规范)
*/


const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入MiniCssExtractPlugin,提取css为一个单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 引入Node中一个内置的path模块，专门用于解决路径问题
const path = require('path')

const baseLoader = [
  'style-loader', // 创建style标签，将样式资源插入，添加到head中生效
  MiniCssExtractPlugin.loader,
  'css-loader', // 将css文件变成commonjs模块加载js中，里面内容是样式字符串(给大哥翻译翻译)
  {
    loader:'postcss-loader',  //处理兼容性
    options: {
      postcssOptions: {
        plugins: [
          ["postcss-preset-env"]
        ]
      }
    }
  }
]
// 使用CJS的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'production', //工作模式
  entry: './src/js/app.js', //入口
  output: { //出口
    path: path.resolve(__dirname,'../build'),  //输出文件的路径
    filename: 'js/app.js', //输出文件的名字(webpack@4不能/js/app.js)
    publicPath:'/build/'
  },
  // module.rules中配置一个一个loader
  module: {
    rules:[
      // 配置解析css
      {
        test: /\.css$/,
        use:[...baseLoader]
      },
      // 配置解析scss
      {
        test: /\.s[ac]ss$/i,
        use:[
          ...baseLoader,
          'sass-loader'
        ]
      },
      // 配置解析图片
      {
        test:/\.(png|jpg|gif|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              esModule:false,
              outputPath:'imgs', // 配置图片加工后存放的位置
              name:'[hash:5].[ext]',
              limit:8*1024 // 图片大小，小于8kb时，将图片转为base64编码
            }
          }
        ]
      },
      // 配置解析html中的图片
      {
        test:/\.(html)$/,
        use:['html-loader']
      },
      // 解析字体资源
      {
        // exclude:/\.(html|less|s[ca]ss|jpg|png|svg|gif|js|css|json)$/,
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          {
            loader:'file-loader',
            options:{
              esModule:false,
              outputPath:'font', // 配置图片加工后存放的位置
              name:'[hash:5].[ext]',
            }
          }
        ]
      },
      // 配置js语法检查
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options:{
          fix:true  //  若有问题自动修复，重要！！！
        }
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // plugins专门用于配置插件，插件必须经过实例化这一环节
  plugins:[
    new HtmlWebpackPlugin({
      // 实例化HtmlWebpackPlugin
      template:'./src/index.html' // 模板位置
    }),
    // 实例化MiniCssExtractPlugin，提出css为一个单独的文件
    new MiniCssExtractPlugin({
      filename:'/css/index.css'
    }),
    // 压缩Css
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default',{ discardComments:{ removeAll:true } }]
      }
    })
  ],
}