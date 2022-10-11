const EslintWebpackPlugin = require("eslint-webpack-plugin");
const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 激活js的HMR
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// js压缩
const TerserWebpackPlugin = require("terser-webpack-plugin");
// 图片压缩
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
// 返回处理样式的函数
const getStyleLoader = (pre) =>{
    return [
        MiniCssExtractPlugin.loader,
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
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].[contenthash:10].js",
        chunkFilename:"static/js/[name].[contenthash:10].chunk.js",
        assetModuleFilename:"static/media/[hash:10][ext][query]",
        clean: true,
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
                    // plugins: [
                    //    'react-refresh/babel' // 激活js的HMR
                    // ], 
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
        // new ReactRefreshWebpackPlugin(), // 激活js的HMR
        new MiniCssExtractPlugin({
            filename: "static/css[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }),
        new CopyPlugin({
            patterns: [
                {from: "source", to: "dest"},
                {from: "other", to: "public"},
            ],
        }),
    ], 
    mode: 'production',
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
        },
        // 压缩操作
        minimizer: [
            // css压缩
            new CssMinizerWebpackPlugin(),
            // js压缩
            new TerserWebpackPlugin(),
            // 图片压缩
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      [
                        "svgo",
                        {
                          plugins: [
                            "preset-default",
                            "prefixIds",
                            {
                              name: "sortAttrs",
                              params: {
                                xmlnsOrder: "alphabetical",
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
              }),
        ],

    },
    // webpack 解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions: ['.jsx','.js','.json'],
    },
}