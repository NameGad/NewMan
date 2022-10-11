/**
 *  1.webpack 加载 webpack.config.js中所有配置，此时就会new TestPlugin(), 执行插件的constructor
 *  2.webpack创建compiler对象
 *  3.遍历所有plugin中插件，调用插件的apply方法
 *  4.执行剩下编译流程（出发各个hooks事件）
 */

class TestPlugin{
    constructor() {
        console.log('TestPlugin constructor');
    }

    apply(compiler) {
        console.log('TestPlugin apply');
    }
}

module.exports = TestPlugin;