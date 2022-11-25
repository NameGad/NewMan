### 1.webpack的配置文件

```js
module.exports = {
	entry: '', // 入口
    output: {}, //输出
    module:{ //配置loader
        rules:[]
    },
    plugins:[],	//配置插件
    mode:'development' or 'production'	//工作模式
}
```

- 区分使用生成环境与开发环境

  - 使用生成环境

    ​	npm run build	==>	webpack

    1. 在内存中进行编译打包，生成内存中的打包文件
    2. 保存到本地(在本地生成打包文件)    ==>  此时不能通过浏览器来访问，需要启动服务器运行开发环境

  - 使用开发环境

    - npm run dev ==>  webpack-dev-server
    - 1）在内存中进行编译打包，生成内存中的打包文件
    - 2）启动服务器，运行内存中的打包文件(不生成本地打包文件) ==>  可以通过浏览器虚拟路径访问



### 2.webpack打包的基本流程

- 连接：webpack从（entry）入口 JS 开始，递归查找所有相关的模块，并【连接】起来形成一个图(网)的结构（类似于webpack官网开头的图片）
- 翻译：将JS模块中的模块化语法【编译】为浏览器可以直接运行的模块化语法(当然其他类型资源也会处理)
- 合并：将图中所有编译过的模块【合并】成一个或少量几个文件，浏览器真正运行是打包后的文件

### 3.比较loader与plugins

- loader：用于加载特定类型的资源文件，webpack本身只能打包js和json
- plugins：用于扩展webpack其他方面的功能，一般loader处理不了的资源、完不了的操作交给plugins处理



### 4.live-reload（自动刷新）与HMR（热膜替换）

- 相同点：

  代码修改后都会自动重新编译打包

- 不同点：

  live-reload：刷新整体页面，从而查看到最新代码的效果，页面状态全部都是新的。

  HMR：没有刷新整个页面，只是加载了修改模块的打包文件并运行，

  从而更新页面的局部界面，整个界面的其他部分状态还在

### 5.webpack常用loader与plugin汇总

#### 常用loader：

```
1.【sass-loader】、【less-loader】用于将sass、less文件翻译成为css
2.【css-loader】用于将css以CommonJs语法打包带js中
3.【style-loader】用于动态创建一个style标签，将css引入页面
4.【file-loader】用于处理其他资源，也可以处理图片资源，核心操作就是：提前资源到指定位置，且可修改文件名等操作
5.【url-loader】与file-loader功能几乎一致，优势是可以对图片进行动态转换为base64编码（控制limit属性值可以控制阈值）
6.【html-loader】用于处理html中<img>标签的图片
7.【babel-loader】将es6语法转换为es5语法 
		备注1：直接使用只能处理简单的语法，Promise等无法处理，
		备注2：借助polyfill完成挂高级es6语法的装换，缺点，所有的都装换，无法按需转换，生成js体积大
		备注3：使用core-js配合polyfill完成按需转换
8.【eslint-loader】对项目中js语法进行检查
9.【postcss-loader】经典的loader，用于处理css兼容性问题，需要【postcss】和【postcss-preset-env】配合使用
		备注1：使用的时机为；["css-loader","postcss-loader","less-loader"]
		备注2：需要在package.json中配置browserslist属性指定具体的兼容规则
		备注3：browserslist是一个单独的库，被广泛运用在各种涉及浏览器/移动端的兼容性支持工具中
```

#### 常用plugins：

```
1.【mini-css-extract-plugin】：用于提取项目中的css为单独文件
		备注1：使用实际为：【MiniCssExtractPlugin.loader,"css-loader","post-loader","less-loader"】
		备注2：使用是可以在new时传入具体配置例如：
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					plugins: ["post-preset-env"]
				}
			}
		}
2.【html-webpack-plugin】: 根据指定模块，自动创建html文件，且自动引入外部资源
3.【eslint-plugin-import】: 用于配合eslint-loader
4.【eslint-config-airbnb-base】: 用于引入airbnb配置好语法检查规则，否则需要一个一个配置很麻烦
5.【@babel/polyfill】: 用于处理JS兼容性问题，例如IE浏览器不支持
6.【optimize-css-assets-webpack-plugin】:用于压缩css
```



### 6.webpack中的tree-shaking（树摇）

- 概念：有些时候，我们一个模块向外暴露了n个函数，对象或其他数据，但是我们只是用到了其中的一个或几个，因此在最终打包的时候，我们只希望吧我们所用的打包进行，这时候就要tree-shaking，即：去除无用代码，按需引入
- 配置：同时满足两个条件webpack会自动开启tree-shaking
  1. 使用ES6模块化
  2. 开启production环境