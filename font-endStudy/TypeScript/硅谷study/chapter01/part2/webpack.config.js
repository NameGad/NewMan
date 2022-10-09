// 引入一个包
const path = require('path')
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


// webpack中所有配置信息都写在里面
module.exports = {
    // 指定入口文件
    entry:"./src/index.ts",
    // 指定打包文件所在目录
    output:{
        // 指定打包文件的目录
        path: path.resolve(__dirname,"dist"),
        // 打包后的文件的文件
        filename: "bundle.js",
        // 告诉webpack打包别用箭头函数
        environment:{
            arrowFunction:false
        }
    },
    // 指定webpack报告是用的模块
    module:{
        // 指定要假装的规则
        rules:[
            {
                // test指定规则生效的文件
                test:/\.ts$/,
                // 使用的loader
                use: [
                    // 配置babel
                    {
                        loader: "babel-loader",
                        options:{
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        "targets":{
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    // 配置webapck插件
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    // 用来设置引用模块
    resolve:{
        extensions: ['.ts','.js']
    }
}