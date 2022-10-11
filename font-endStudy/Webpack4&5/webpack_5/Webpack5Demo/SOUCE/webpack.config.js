const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/test-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        clean: true,
    },
    module: {
        rules:[
            // {
            //     test: /\.js$/,
            //     loader: './loaders/test-loader.js',
            // },
            {
                test: /\.js$/,
                // use: ['./loaders/demo/test1.js', './loaders/demo/test2.js']
                // loader: './loaders/demo/test3.js',
                // use: ['./loaders/demo/test4.js', './loaders/demo/test5.js', './loaders/demo/test6.js',]
                loader: './loaders/clean-log-loader.js',
            },
            {
                test: /\.js$/,
                loader: './loaders/banner-loader',
                options: {
                    author: "林佳成",
                },
            },
            {
                test: /\.js$/,
                loader: './loaders/babel-loader',
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "./loaders/file-loader",
                type: "javascript/auto", // 阻止webpack默认处理图片资源，值使用file-loader处理
            },
            // {
            //     test: /\.css$/,
            //     use: ["./loaders/style-loader", "css-loader"],
            // }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new TestPlugin(),
    ],
    mode:'development',
};