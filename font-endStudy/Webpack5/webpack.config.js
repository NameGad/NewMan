const path = require("path"); //nodejs核心模块，用来处理路径问题

module.exports = {
    // 入口
    entry:"./src/main.js", //相对路径
    // 输出
    output:{
        // 文件输出路径
        // _dirname nodejs的变量，代表当前文件的文件夹（Webpack5）目录
        path: path.resolve(__dirname, "dist"), //绝对路径
        // 文件名
        filename:"main.js",
    },
    // 加载器
    module: {
        rules:[
            // loader的配置
        ],
    },
    // 插件
    plugins:[
        // plugin的配置
    ],
    // 模式
    mode:"development",
}