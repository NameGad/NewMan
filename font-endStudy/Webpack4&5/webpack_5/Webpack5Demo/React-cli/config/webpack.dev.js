const EslintWebpackPlugin = require("eslint-webpack-plugin");
const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 激活js的HMR
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 返回处理样式的函数
const getStyleLoader = (pre)=>{
    return [
        "style-loader", 
        "css-loader", 
        {
            // 考虑css兼容性问题
            // 要配合package.json 中的browserslist来指定兼容性
            loader: 'postcss-loader', 
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre,           
    ].filter(Boolean);
};

module.exports = {
    entry: './src/main.js',
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename:"static/js/[name].chunk.js",
        assetModuleFilename:"static/media/[hash:10][ext][query]"
    },
    module:{
        rules:[
            // 处理css
            {
                test:/\.css$/,
                use: getStyleLoader(),
            },
            {
                test:/\.less$/,
                use: getStyleLoader("less-loader"),
            },
            {
                test:/\.s[ac]ss$/,
                use: getStyleLoader("sass-loader"),
            },
            {
                test:/\.styl$/,
                use: getStyleLoader("stylus-loader"),
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)/,
                type:"asset",
                parser:{
                    dataUrlCondition: {
                        // 将小于10kb的图片转化未base64（图片体积将变大）
                        maxSize:10 * 1024,
                    }
                }
            },
            // 处理其他资源
            {
                test:/\.(woff2?|ttf)/,
                type:"asset/resource",
            },
            // 处理js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                       'react-refresh/babel' // 激活js的HMR
                    ], 
                }
            }
        ],
    },
    // 处理html
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            // 可以有缓存（第二次打包更好）
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new ReactRefreshWebpackPlugin(), // 激活js的HMR
    ], 
    mode: 'development',
    // 方便调试
    devtool: 'cheap-module-source-map',
    // 打包到多个文件中，进行代码分割
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        // 防止缓存失效
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`,
        }
    },
    // webpack 解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions: ['.jsx','.js','.json'],
    },
    // 自动化配置
    devServer: {
        host: "localhost",
        port: 3001,
        open: true,
        hot: true, // 开启HMR
        historyApiFallback: true, //解决前端路由刷新404问题
    }
}