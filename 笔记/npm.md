

## npm

### 简介

»npm（全称Node Package Manager，即node包管理器）

»是Node.js默认的、以JavaScript编写的软件包管理系统

»npm 来分享和使用代码已经成了前端的标配

»官网： https://www.npmjs.com

»npm被全球超过1100万开发人员所依赖

»拥有超过一百万个软件包，是世界上最大的软件注册表

### npm使用命令

```bash
npm -v  #通过查看版本，看npm是否安装成功

npm install <Module Name>   #使用 npm 命令安装模块

npm install <Module Name> -g  #可以直接在命令行里使用，全局安装

npm list -g #查看所有全局安装的模块

npm list vue #查看某个模块的版本号

npm -g install npm@5.9.1 （#@后跟版本号）这样我们就可以更新npm版本

npm uninstall jqeury #卸载

npm install -save moduleName   # -save 在package文件的dependencies节点写入依赖。（运行时依赖;在npm5之前，不加的话就不写进package.json）

npm install -save-dev moduleName # -save-dev 在package文件的devDependencies节点写入依赖(-D == -dev,开发时依赖)

dependencies：#运行时的依赖，发布后，即生产环境下还需要用的模块

devDependencies：#开发时的依赖。里面的模块是开发时用的，发布时用不到它,比如项目中使用的 gulp ，压缩css、js的模块。这些模块在我们的项目部署后是不需要的
```

```bash
NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。
使用npm help <command>可查看某条命令的详细帮助，例如npm help install。
在package.json所在目录下使用npm install . -g可在本地安装当前命令行程序，可用于发布前的本地测试。
使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。
使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。
使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。
```



### npm镜像的设置与查看

```bash
#搭建环境时通过如下代码将npm设置成淘宝镜像
	npm config set registry https://registry.npm.taobao.org --global
	npm config set disturl https://npm.taobao.org/dist --global
	
#设置当前地址（设置为默认地址）
	npm config set registry https://registry.npmjs.org/
#你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
	$ npm install -g cnpm --registry=https://registry.npm.taobao.org

#查看镜像的配置结果
	npm config get registry 
    npm config get disturl  
       	
#使用nrm工具切换淘宝源
	npx nrm use taobao
	
#如果之后需要切换回官方源可使用
	npx nrm use npm

```

### **Package.json 属性说明**

```bash
package.json文件中版本号的说明，安装的时候代表不同的含义：
"5.0.3"    表示安装指定的5.0.3版本
"~5.0.3"  表示安装5.0.X中最新的版本
"^5.0.3"  表示安装5.X.X中最新的版本

name - 包名。
version - 包的版本号。
description - 包的描述。
homepage - 包的官网 url 。
author - 包的作者姓名。
contributors - 包的其他贡献者姓名。
dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
main - main 字段指定了程序的主入口文件，requiNPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。
使用npm help <command>可查看某条命令的详细帮助，例如npm help install。
在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。
使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。
使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。
使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。
re('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
keywords - 关键字
```



### babel

- 兼容表：http://kangax.github.io/compat-table/es6/

- IE10+、Chrome、FireFox、移动端、NodeJS现在都支持

- 兼容低版本浏览器
  - 在线转换（这种编译会加大页面渲染的时间）
  - 提前编译（强烈建议这种方式，不影响浏览器渲染时间）

- 用法

  ```bash
  使用NPM全局安装babel-cli包 。（babel -V）
  找一个目录，用npm来初始化一个项目，用来搭建我们的babel环境。（npm init ）或 （npm init -y）
  babel提供的一个编译工具babel-node，也可执行我们的js代码 (babel-node index.js)
  在项目目录下新建.babelrc文件（这是babel的配置文件） 
  { 
      "presets": ["es2015", "stage-2"],  //设置转码规则
      "plugins": ["transform-runtime"]  //设置插件 
  }
    这里我们需要转换成es2015，安装我们需要的库：
  npm install babel-core babel-preset-es2015 babel-plugin-transform-runtime babel-preset-stage-2 –save-dev
  我们再打开我们babel项目下的package.json文件，做如下修改
                      
       "scripts": { "build": "babel src -w -d lib"   },
  
  编译整个 src 目录并将其输出到 lib 目录。这里的src指的是需要转换的目录，lib指的是输出的内容的存放目录，-w其实是-watch的意思，就是监听文件，实时编译输出
  新建src目录和lib目录，记得一定要建，不然会报错，然后我们启动我们的babel工程。
  命令行输入npm run build。
  
  ```

  

## Yarn

### 简介

“Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。因为NPM5以下会出现下面的问题：

–npm install的时候巨慢。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。

–同一个项目，多人开发时，由于安装的版本不一致出现bug

 官网：www.yarnpkg.com

### 优点

- 速度快 

- 安装版本统一

- 更简洁的输出

- 多注册来源处理

- 更好的语义化

![image-20220529201917979](C:\Users\86188\AppData\Roaming\Typora\typora-user-images\image-20220529201917979.png)

### 安装

```bash
下载node.js，使用npm安装

npm install -g yarn

查看版本：yarn --version


安装node.js,下载yarn的安装程序:

提供一个.msi文件，在运行时将引导您在Windows上安装Yarn


Yarn 淘宝源安装，分别复制粘贴以下代码行到黑窗口运行即可

yarn config set registry https://registry.npm.taobao.org -g

yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

### 基本用法

```bash
yarn init                    //初始化项目   同npm init，执行输入信息后，会生成package.json文件
yarn install                //安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
yarn install --flat       		 //安装一个包的单一版本
yarn install --force		 	//强制重新下载所有包
yarn install --production 		//只安装dependencies里的包
yarn install --no-lockfile		 //不读取或生成yarn.lock
yarn install --pure-lockfile 		//不生成yarn.lock
yarn add [package] 		// 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]@[version]   // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
yarn add [package]@[tag] 		// 安装某个tag（比如beta,next或者latest）
yarn add --dev/-D 			// 加到 devDependencies
yarn add --peer/-P		 	// 加到 peerDependencies
yarn add --optional/-O 		// 加到 optionalDependencies

//默认安装包的主要版本里的最新版本，下面两个命令可以指定版本：
yarn add --exact/-E 		// 安装包的精确版本。例如yarn add foo@1.2.3会接受1.9.1版，但是yarn add foo@1.2.3 --exact只会接受1.2.3版
yarn add --tilde/-T 		//安装包的次要版本里的最新版。例如yarn add foo@1.2.3 --tilde会接受1.2.9，但不接受1.3.0
发布包  yarn publish
移除一个包  yarn remove <packageName>     会自动更新package.json和yarn.lock
更新一个依赖  yarn upgrade 用于更新包到基于规范范围的最新版本
运行脚本  yarn run 用来执行在 package.json 中 scripts 属性下定义的脚本
显示某个包的信息 yarn info <packageName> 可以用来查看某个模块的最新版本信息
缓存  yarn cache
yarn cache list      	# 列出已缓存的每个包 
yarn cache dir  	# 返回 全局缓存位置 
yarn cache clean	 # 清除缓存

```

### **从 npm 迁移到 yarn**

可以从npm迁移到yarn，也可以从yarn迁移到npm。

有了yarn的压力之后，npm做了一些类似的改进，在npm5.0之前，yarn的优势特别明显。但是在npm之后，通过以上一系列对比，我们可以看到 npm5 在速度和使用上确实有了很大提升，值得尝试。

如果你已经在个人项目上使用 yarn，并且没有遇到更多问题，目前完全可以继续使用。但如果有兼容 npm 的场景，以及还没有切到 yarn 的项目，那现在就可以试一试 npm5 了。