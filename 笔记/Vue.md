# Vue

## 初识Vue

### 初识Vue：

​        1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象(el, data, ......);

​        2.wrap容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法;

​        3.wrap容器里的代码被称为【Vue模板】;

​        4.Vue实例和容器是一一对应的;

​        5.真实开发中只有一个Vue实例，并且会配合着组件一起使用;

​        6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性;

​        7.一旦data中的数据发送改变，那么页面中用到该数据的地方也会自动更新

### JS语句和JS表达式的区别

注意区分：js表达式 和 js代码（语句）

​        1.表达式：一个表达式会产生一个值，可以放在任何一个需要值得地方：

​          (1). a

​          (2). a+b

​          (3). demo(1)

​          (4). x === y ? 'a' : 'b'



​        2.js代码（语句）

​          (1). if(){}

​          (2). for(){}

#### 关于不同版本的Vue

  1.vue.js 与 vue.runtime.xxx.js的区别

  	 (1).vue.js是完整版的Vue，包含：核心功能 + 模板解析器。

​	   (2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能：没有模板解析器。



  2.因为vue.runtime.xxx.js没有模板解析器，所有不能使用template配置项，需要使用

   render函数接收的createElement函数去指定具体内容



## Vue基础知识点

### 一、模板语法

#### 1.插值语法

- 功能：用于**解析标签体内容。**        
- 写法：`{{xxx}}`，xxx是js表达式，切可以直接读取到data中的所以属性。

#### 2.指令语法

- 功能：用于**解析标签**（包括L标签属性、标签体内容、绑定事件......）。
- 举例：`v-bind:href='xxx'` 或 简写为 `:href='xxx'`,xxx同样要写js表达式，且可以直接读取到data中的所有属性
- 备注：Vue中有很多的指令，且形式都是：v-????,此处我们只是拿v-bind举个例子



### 二、数据绑定

#### 1.单向数据绑定

- 单向绑定(v-bind): 数据只能从data流向页面。

- ```
  <input type="text" v-bind:value="name">
  <input type="text" :value="name">
  ```

  



#### 2.双向数据绑定

- 双向绑定(v-model): 数据不仅能从data流向页面，还可以从页面流向data。

- 备注：

  - 双向绑定一般都应用在表单类元素上(如：input、select等)
  - v-model:value 可以简写成 v-model,因为v-model默认的就是value的值  

- ```
  <input type="text" v-model:value="name">
  <input type="text" v-model="name">
  ```



### 三、el与data的2种写法

#### 1.el有2种写法

- (1).new Vue的时候配置el属性。
- (2).先创建Vue实例，随后再通过vm.$mount("#root")指定el的值

#### 2.data有2种写法

- (1).对象式
- (2).函数式
- 如何选择: 目前哪种写法都可以，以后学习到组件时，data必须使用函数式，负责会报错

#### 3.一个重要的原则

- **由Vue管理的函数，一定不能写箭头函数，一旦写了箭头函数，this就不再是Vue实例了**



### 四、MVVM模型

#### 1.MVVM模型

- M: 模型(Model): data中的数据

- V: 视图(View): 模板代码

- VM: 视图模型(ViewModel): Vue实例

- 观察发现：

  - 1.data中的所有属性，最后都出现在了vm身上。

  - 2.vm身上所有属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

    

### 五、数据代理

#### 1.JS-Object.defineProperty

```js
    <script type="text/javascript">
       let number = 18;
       let person = {
        name: '张三',
        sex: '男',
       }
       
       Object.defineProperty(person,'age',{
        // value: 18,
        // enumerable: true, //控制属性是否可以枚举，默认是false
        // writable: true, //控制属性是否可以被修改，默认是false
        // configurable: true //控制属性是否可以被删除，默认是false
        
        // 当有人读取person的age属性时，get函数(get)就会被调用，切返回值就是age的值
        get(){
            console.log('有人读取age属性了');
            return number
        },

        // 当有人修改person的age属性时，set函数(setter)就会被调用，切会收到修改的具体值
        set(value){
            console.log('有人修改了age属性，且值是', value);
            number = value
        }
    })

    </script>
```

#### 2.何为数据代理

```js
<!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写） -->
    <script type="text/javascript">
       let obj  = {x: 100}
       let obj2 = {y: 300}

       Object.defineProperty(obj2, 'x', {
        get(){
            return obj.x;
        },
        set(value){
            obj.x = value;
        }
       })
	</script>
```

#### 3.Vue中的数据代理

- 1.Vue中的数据代理：
  - 通过vm对象来代理data对象中属性的操作(读/写)
- 2.Vue中数据代理的好处：
  - 更加方便操作data中的数据
- 3.基本原理:
  - 通过Object.defineProperty()把data对象中所有属性添加到vm上
  - 为每一个添加到vm上的属性，都指定一个getter/setter
  - 在getter/setter内部去操作(读/写)data中对应的属性



### 六、事件代理

#### 1.Vue中的事件修饰符

- prevent：阻止默认事件(常用)

- stop：阻止事件冒泡(常用)

- once：事件只触发一次(常用)

- capture：使用时间的捕获模式

- self：只有event.target是当前操作的元素时才触发事件

- passive：事件的默认行为立即执行，无需等待事件回调执行完毕

- ```vue
  <!-- 事件修饰符可以连用 -->
  <a href="www.baidu.com" @click.prevent.stop = "showInfo">前往百度</a>
  ```

  

#### 2.Vue键盘事件

- **Vue中常用的按键别名**

  - 回车 => enter
  - 输出 => delete (捕获"输出"和"退格"键)
  - 退出 => esc
  - 空格 => tab (特殊，必须配合 keydown 使用)
  - 上 => up
  - 下 => down 
  - 左 => left
  - 右 => right

- **Vue为提供别名的按键，可以使用按键原始的key值取绑定，但注意要转为kebab-case(短横线命名)**

- **系统修饰符(用法特色)：ctrl、alt、shift、meta**

  - (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事假才被触发
  - (2).配合keydown使用：正常触发事件

- **也可以使用keyCode去指定具体的按键(不推荐)**

- **Vue.config.keyCodes.自定义健名 = 键码，可以去定制按键别名**

- ```js
  <div id="root">
  	<h2>欢迎来到{{name}}的编程世界</h2>
      <input type="text" placeholder="请输入" @keydown.ctrl.y = 'showInfo'>
  </div>
  ```

  

### 七、watch监视属性

#### 一、监视属性：watch

-  1.当被监视的属性变化时，回调函数自动调用，进行相关操作

- 2.监视的属性必须存在，才能进行监视！！

- 3.监视的两种写法：

  -  (1).new Vue时传入watch配置

  -  (2).通过vm.$watch监视

#### 二、深度监视

- (1).Vue中的watch默认不监测对象内部值的改变(一层), 但是外层($watch)可以。

- (2).配置deep:true可以监测对象内部值改变(多层)。

- 备注:

  - (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以
  - (2).使用watch时根据数据的具体结构，决定是否采用深度监测

- ```vue
  <script type="text/javascript">
          Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
  
          const vm = new Vue({
              el: '#root',
              data:{
                  isHot: true,
                  numbers: {
                      a: 1,
                      b: 2,
                      c: 3,
                  }
              },
              methods:{  
                  changeWeather(){
                      this.isHot = !this.isHot;
                  }  
              },
              computed:{
                  info(){
                      return this.isHot ? '炎热' : '凉爽'
                  }
              },
              watch:{
                  isHot:{
                      immediate: true, // 初始化时让handle调用一下
                      // handler什么时候调用？当isHot发送改变时
                      handler(newValue, oldValue){
                          console.log("isHot被修改了", newValue, oldValue);
                      }
                  },
                  'numbers.b':{
                      handler(){
                          console.log('b的值增加了');
                      }
                  },
                  // 监视多级结构中所有属性的变化
                  numbers:{
                      deep: true,
                      handler(){
                          console.log("number中有值发生改变");
                      }
                  }
              }
          })
  
          vm.$watch('numbers.b',{
              handler(){
                  console.log('Vue外层的watch');
              }
          })
      </script>
  ```

#### 三、computed和watch区别

- (1).computed能完成的功能,watch都可以完成

- (2).watch能完成的功能，computed不一定能完成 例如：watch可以进行异步操作

- 两个重要的小原则:

  - **1**.**所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象**

  - **2**.**所有不被Vue所管理的函数(定时器的回调函数、ajax的回调函数等、Promise的回调函数)，最好写成箭头函数，这样this的指向才是vm 或 组件实例对象**

    ​        

### 八、绑定样式

- **class样式**
  - 写法：
  
    - class="xxx" xxx可以是字符串、对象、数组
  
    - 字符串写法适用于：类名不确定，要动态获取
    - 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用
  
- **style样式**

  - :style="{fontSize: xxx}"其中xxx是动态值
  - :style="[a, b]" 其中a、b是样式对象



### 九、条件渲染

#### 一、v-if

-  写法：
  - (1).v-if = "表达式"
  - (2).v-else-if = '表达式'  
  - (3).v-else = '表达式'

- 适用于：切换频率较低的场景
- 特点：不展示的DOM元素直接**被移除**      
- 注意：v-if可以和:v-else-if、v-else 一起使用，但要求结构不能被"打断"

#### 二、v-show

- 写法：v-show = "表达式(true/false)"
- 适用于: 切换频率较高的场景。
- 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
- 备注：
  - 使用v-if时，元素可能无法获取到，而使用v-show一定可以获取到。



### 十、列表渲染与key

#### 1.基本列表

- v-for指令
  - 用于展示列表数据
  - 语法：v-for="(item, index) in xxx" :key = "yyy"
  - 可遍历：数组、对象、字符串(用的很 少)、指定次数(用的很少)

#### 2.key的原理(面试)

```vue
	<div id="root">
		<!-- 遍历数组 -->
            <h2>人员列表</h2>   
            <ul>
                <li><button @click="add">添加人物</button></li>
                <li>姓名--年龄--索引(index)</li>
                <li v-for="(person,index) in persons" :key="index">
                    {{person.name}}-----{{person.age}}-----{{index}}
                    <input type="text">
                </li>
            </ul>
            <hr>            
	</div>
    
    <script type="text/javascript">
        Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
        
        const vm = new Vue({
            el: '#root',
            data:{
                persons:[
                    {id:'001', name:'张三', age:'13'},
                    {id:'002', name:'李四', age:'14'},
                    {id:'003', name:'王五', age:'15'}
                ],
            },
            methods: {
                    add(){
                        const p = {id:'004', name:'老林', age:'22'}
                        this.persons.unshift(p)
                    }
                }
        })
    </script>
```

 **面试题: react、vue中的key有什么作用？(key内内部原理)**

​      1.虚拟DOM中key的作用：

​        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】

​        随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

​      

​      2.对比规则： 

​        (1). 旧虚拟DOM中找到了与新虚拟DOM相同的key：

​           ①.若虚拟DOM中内容没变，直接使用之前的真实DOM!

​           ②.若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

​        

​        (2). 旧虚拟DOM中未找到与新虚拟DOM相同的key

​           创建新的真实DOM，随后渲染到页面。



​      3.用index作为key可能会引发的问题：

​        (1). 若对数据进行：逆序添加、逆序删除等破坏顺序的操作：

​           会产生没有必要的真实DOM更新 ==> 界面效果没问题，但效率低。

​        

​        (2). 如果结构中还包含输入类的DOM：

​          会产生错误DOM更新 ==> 界面有问题。

​      

​      4.开发中如何选择key?：

​        (1). 最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号、学号等唯一值。

​        (2). 如果不存在对数据的逆序添加、逆序删除等破坏操作，仅用于渲染列表用于展示，

​           使用index作为key也是没问题的。



### 十一、Vue数据检测原理

1. vue会监视data中所有层次的数据

2. 如何通过监测对象中的数据？

   - (1).对象中后追加的属性，Vue默认不做响应式处理
   - (2).如需给后添加的属性做响应式，请使用如下API:
     - Vue.set(target, propertyName/index, value)
     - vm.$set(target, propertyName/index, value)

3. 如何监测数据中的数据？

   通过包裹数组更新元素的方法实现，本质就是做了两件事：

   - (1).调用原生对应的方法对数组进行更新。
   - (2).重新解析模板，进而更新页面。

4. 在Vue修改数组中的某个元素**一定**要用如下方法:

   - 1.使用这些API:**push()、pop()、shift()、unshift()、splice()、sort()、reverse()**
   - 2.**Vue.set()**  or  **vm.$set()**

5. **特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！**



### 十二、收集表单数据

1. 若：<input type="text"/>, 则v-model收集的是value值，用户输入的就是value值
2.  若：<input type="radio">, 则v-model收集的是value的值，切要给标签配置value值
3.  若：<input type="checkbox"/>
   - 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
   - 配置input的value属性：

​            	(1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）

​            	(2)v-model的初始值是数组，那么收集的就是value组成的数组

- 备注：v-model的三个修饰符：

​          lazy：失去焦点收集数据

​          number：输入字符串转化为有效的数字

​          tirm：输入首尾空格过滤



### 十三、过滤器

**过滤器**：

-  定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）
- 语法：

​          1.注册过滤器：Vue.filter(name,callback) 或 new Vue(filters:{})

​          2.使用过滤器：{{ xxx | 过滤器名 }} 或 v-bing:属性 = "xxx | 过滤器名"

- 备注：

​          1.过滤器也可以接收额外参数、多个过滤器也可以串联

​          2.并没有改变原来的数据，是产生新的对应的数据



### 十四、内置指令

- v-bind ：单向绑定解析表达式，可简写为 :xxx

- v-model ：双向数据绑定

- v-for ：遍历数组/对象/字符串

- v-on ：绑定事件监听，可简写为 @

- v-if ：条件渲染（动态控制节点是否存在）

- v-else : 条件渲染（动态控制节点是否存在）

- v-show ：条件渲染（动态控制节点是否展示）

- v-text指令：

  1. 作用：向所在的节点中渲染文本内容
  2. 与插值语法的区别：v-text会替换掉节点中的内容，{{xxx}}则不会

- v-html

     1.作用：想指定节点中渲染包含html结构的内容

     2.与插值语法的区别：

  ​          (1).v-html会替换掉节点中所有的内容，{{xxx}}则不会

  ​          (2).v-html可以识别html结构

  3.严重注意：v-html有安全性问题！！！！

  ​          (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击

  ​          (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上!

- v-cloak指令(没有值)：

  ​	1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删除掉v-cloak属性。

  ​	2.使用css配合c-cloak可以解决网速慢时页面展示出{{xxx}}的问题。



- v-once指令：

    1.v-once所在节点在初次动态渲染后，就视为静态内容了。

    2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

- v-pre指令：

    1.跳过其所在节点的编译过程

    2.可以利用他跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

### 十五、自定义命令

#### 1.定义语法：

```
 (1).局部指令
  new Vue({                                   new Vue({
  	dirctives:{指令名: 配置对象}    或          	directives(){}
  })                                          })
 (2).全局指令：
  Vue.directive(指令名，配置对象)   或  		Vue.directive(指令名，回调函数)
```



#### 2.配置对象中常用的3个回调：

​	(1).bind: 指令与元素成功绑定时调用。

​	(2).inserted: 指令所在元素被插入页面时调用。

​	(3).update: 指令所在模板结构被重新解析时调用。



#### 2.备注：

- 指令定义时不加v-，但使用时要加v-；
- 指令名如果是多个单词，要使用kebab-case命名方式(user-name)，不要用camelCase命名(userName)。



### 十六、生命周期

#### 1.什么是生命周期

​        1.生命周期又名：生命周期回调函数、生命周期函数、生命周期钩子、

​        2.生命周期是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。

​        3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。

​        4.生命周期函数中的this指向是vm 或 组件实例对象

![生命周期](D:\transferFile\systemFile\桌面\import\ljc-learning-notes\笔记\Vue资料（含课件）\资料（含课件）\02_原理图\生命周期.png)

#### 2.常用的生命周期钩子：

​        1.**mounted：**发送ajax请求、启动定时器、绑定自定义事件、订阅消息等**【初始化操作】**

​        2.**beforeDestroy：**清除定时器、解绑自定义事件、取消订阅消息等**【收尾工作】**

​      

#### 3.关于销毁Vue实例：

​        1.销毁后借助Vue开发者根据看不到任何信息

​        2.销毁后自定义事件会失效，但原生DOM事件依然有效

​        3.一般不会在beforeDestroy操作，因为即便操作数据，也不会再触发更新流程了



### 十七、Vue—组件

#### 组件(Component)

- **Vue中使用组件的三大步骤：**
  - 一、定义组件(创建组件)
  - 二、注册组件
  - 三、使用组件(写组件标签)
- **如何定义一个组件？**
  - 使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别：
    - 区别如下：
      - 1.el不要写，为什么？———— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器
      - 2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在应用关系
    - 备注：使用template可以配置组件结构
- **如何注册组件？**
  - 1.局部注册：靠new Vue的时候传入components选项
  - 2.全局注册：靠Vue.component('组件名',组件)
- **编写组件标签：**<school></school>







#### 1.非单文件组件

- **关于组件名：**

  - 一个单词组成：

  ​            第一种写法(首字母小写)：school

  ​            第二种写法(首字母大写)：School

  - 多个单词组成：

  ​            第一种写法(kebab-case命名)：my-school

  ​            第二种写法(CamelCase命名)：MySchool（需要Vue脚手架支持）

  - 备注：

  ​            (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。

  ​            (2).可以使用name配置项指定组价在开发者工具中呈现的名字。

- **关于组件标签：**

  - 第一张写法：<school></school>

  - 第二种写法：<school/>

  - 备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

- **一个简写方式:**

  - const school = Vue.extend(options) 可简写为：const school = options



- **关于VueComponent：**

  - school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

  - 我们只需要写<school/>或<school></school>,Vue解析时会帮我们创建school组件的实例对象，

    即Vue帮我们执行的：new VueComponent(options)

  - **特别注意**：每次调用Vue.extend,返回的都是一个全新的VueComponent！！！

  - **关于this指向**：

    - 组件配置中：

      data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】

    - new Vue(options)配置中：

      data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】

  - VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。

    Vue的实例对象，以后简称vm。

- 一个重要的内置关系：**VueComponent.prototype.proto = Vue.prototype =vm.proto**_

  为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue 原型上的属性、方法

​		

#### 2.单文件组件



### 十八、**ref属性**

 1.被用来给元素或子组件注册引用信息（id的替代者）

 2.应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）

 3.使用方式：

```vue
 打标识：<h1 ref="xxx">......</h1> 或 <School rel=xxx></School>
 获取：this.$refs.xxx
```

  	



### 十九、**props配置项**

- 功能：让组件接收外部传过来的数据

```vue
  (1).传递数据：
      <Demo name="xxx"/>
  (2).接收数据：
      第一种方式(只接收)
        props:['name']

      第二种方式(限制类型)
        props:{
          name:String
        }

      第三种方式(限制类型、限制必要性、指定默认值)：
        props:{
          name:{
            type:String, //类型
            required:true, //必要性
            default:'老王' //默认值
          }
        }
  备注：props是只读的，Vue底层会检测你的props的修改，如果进行了修改，就会发出警告，
       若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据
```

### 

### 二十、**mixin(混入)**

-  功能：可以把多个组件共用的配置提取成一个混入对象

- 使用方式：

  - 第一步定义混合，例如：

    ```vue
    export const mixin = {
    	data()	{......}
    	methods:{
                ...
    		}
    	}
    }
    ```

- 第二部使用混入，例如：

  - ```
    (1).全局混入：Vue.mixin(xxx)
    (2).局部混入：mixins:['xxx']
    ```



### 二十一、**插件**

- 功能：用于增强Vue

- 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

- 定义插件：

  ```
  对象.install = function(Vue, options) {
    <!-- 1.添加全局过滤器 -->
    Vue.filter(....)
  
    <!-- 2.添加全局指令 -->
    Vue.directive(...)
  
    <!-- 3.配置全局混入（合） -->
    Vue.mixin(....)
  
    <!-- 4.添加实例方法 -->
    Vue.prototype.@myMethod = function(){...}
    Vue.prototype.@myProperty = xxx
  }
  ```

- 使用插件：Vue.use()

  

### 二十三、**scoped** **样式**

- 作用：让样式在局部生效，防止冲突
  - 对于某一个组件，如果style添加上scoped属性，给当前子组件的结构中都添加一个data-v xxx自定属性
  - vue是通过属性选择器，给需要添加的元素添加上样式
  - 例如：`h3[data-v 7ba5bd90]`
- 写法：<style scoped>
- 如果子组件的根标签（拥有父组件当中自定义属性：一样的），如果子组件的根节点，和父组件中书写的样式相同，也会添加上相应的样式
- 深度选择器：
  - 作用：如果父组件的样式(scoped),而且还想影响到子组件的样式，像这种情况我们可以使用深度选择器
  - 深度选择器可以实现样式穿透
    - 原生CSS: `>>>`
    - less: ` /deep/`
    - scss:   ` ::v-deep`



## web Storage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制

3. 相关API：

   1. ```
      xxxxxxStorage.setItem('key', 'value');
      ```

      ​	该方法接受一个键和值作为参数，会把键值添加到存储中，如果键名存在，则更新其对应的值。

   2. ```
      xxxxxxStorage.getItem('key');
      ```

      ​	该方法接受一个健名作为参数，放回健名对象的值

   3. ```
      xxxxxxStorage.removeItem('key');
      ```

      ​	该方法接受一个健名作为参数，并把该健名从存储中删除

   4. ```
      xxxxxxStorage.clear();
      ```

      ​	该方法会清空存储中的所有数据

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失
   2. LocalStorage存储的内容，需要手动清除才会消失
   3. `xxxx.Storage.getItem(xxx)`如果xxx对应的value获取不到，那么getItem的返回值是null
   4. `JSON.parse(null)`结果依然是null
   4. **不能存储对象**





## Vue案例总结

```
1.如果input框隐藏了(display：none)，focus() 则没办法获取焦点
```



### TodoList案例

1. 组件化编码流程：

   (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突

   (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

   - 一个组件在用：放在组件自身即可
   - 一些组件在用：放在他们共同的父组件上（**状态提升**）

   (3).实现交互：从绑定事件开始。

2. props 适用于：

   (1).父组件 ==> 子组件 通信

   (2).子组件 ==> 夫组件 通信 （要求夫先给子一个函数）

3. 使用 v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。





## 组件的自定义事件

1. 一种组件间通信的方式，适用于：子组件 ==> 父组件

2. 适用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）

3. 绑定自定义事件

   1. 第一种方式，在父组件中：`<Demo @atguigu="test"/>`  或 `<Demo v-on:atguigu="test">`

   2. 第二种方式，在父组件中：

      ```
      <Demo ref="demo"/>
      ......
      mounted(){
      	this.$refs.xxx.$on('atguigu', this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用 `once` 修饰符 或 `$once`方法

4. 触发自定义事件：`this.$emit('atguigu',数据)`

5. 解绑自定义事件：`this.$off('atguigu')`

6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符

7. **注意**：通过 `this.$refs.xxx.$on('atguigu',回调)` 绑定自定义事件时，**回调要么配置在methods，要么使用箭头函数**，否则this指向会出问题



## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于任意组件间通信

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate(){
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
   	......
   })
   ```

3. 使用事件总线

   1. 接收数据：A组件想要接收数据，则在A的组件中给$bus绑定自定义事件，事件的回调留在A组件自身

      ```js
      methods(){
      	demo(data){......}
      }
      ......
      mounted(){
      	this.$bus.$on('xxxx',this.demo )
      }
      ```

   2. 提供数据：`this.$bus.$emit('xxxx',数据)`

4. 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。



## 消息订阅与发布（pubsub）

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 使用步骤：

   1. 安装pubsub：`npm i pubsub-js`

   2. 引入：`import pubsub from 'pubsub-js'`

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

      ```js
      methods(){
      	demo(_,data){......} //订阅回调函数收到第一个参数为发布的名称‘xxx’，第二个参数为data
      }
      ......
      mounted(){
      	this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：`pubsub.publish('xxx',数据)`

   5. 最好在beforeDestro钩子中，用`PubSub.unsubscribe(pid)`去**取消订阅**



## nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：**在下一次DOM更新循环结束后，执行其指定的回调**
3. 什么时候用：**当改变数据后，要基于更新后的新DOM进行操作时，要在nextTick所指定的回调中执行**



## Vue封装的过度与动画





## Vue脚手架配置代理服务器

![image-20220807133345661](C:\Users\86188\AppData\Roaming\Typora\typora-user-images\image-20220807133345661.png)

### 方法一

- 在vue.config.js中添加如下配置：

- ```js
  devServer: {
  	proxy: "http://localhost:5000"
  }
  ```

  

- 说明
  1. 优点：配置简单，请求资源时直接发给前端（8080）即可
  2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
  3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会发给服务器（优先匹配前端资源）



### 方法二

- 编写vue.config.js配置具体规则：

- ```js
  module.exports = {
  	devServer: {
  		proxy: {
  			'/api1':{	//匹配所有以'/api1'开头的请求路径
  			target: 'http://localhost:5000'. //代理目标的基础路径
              pathRewrite: {'^/api1' : ''} // 重写路径，把'^/api1'开头的设为空，否则影响请求
  			changeOrigin: true,
  			},
  		proxy: {
  			'/api2':{	//匹配所有以'/api2'开头的请求路径
  			target: 'http://localhost:5000'. //代理目标的基础路径
              pathRewrite: {'^/api2' : ''}
  			changeOrigin: true,
  			},
  		}
  	}
  }
  /*	“是否撒谎（默认true）”
  	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
  	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
  	changeOrigin默认值为true
  */
  ```

- 说明

  1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
  2. 缺点：配置略微繁琐，请求资源时必须加前缀。



## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于**父组件==>子组件**

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式

   1. 默认插槽

      ```vue
      父组件中：
      		<Category>  // 这是子组件
      			<div>html结构1</div>
      		</Category>
      子组件中:
      		<template>
      			<div>
      				<!--定义插槽 -->
      				<slot>插槽默认内容...</slot>
      			<div>
      		<template>
      ```

   2. 具名插槽

      ```vue
      父组件中：
      		<Category>
      			<template slot="center">
      				<div>html结构1</div>
                  </template>
                  
                  <template v-slot:footer>
                  	<div>html结构2</div>
                  </template>
      		</Category>
      子组件中：
      		<template>
      			<div>
                      <!-- 定义插槽 -->
                      <slot name="center">插槽默认内容...</slot>
                      <slot name="footer">插槽默认内容...</slot>
                  </div>
      		</template>
      ```

   3. 作用域插槽：

      1. 理解 mes数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
                     <template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
                             <li v-for="g in scopeData.games" :key="g">{{g}}</li>
                         </ul>
                     </template>
         		</Category>
         
         		<Category>
                     <template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
                     </template>
         		</Category>
         子组件中：
         		<template>
         			<div>
                         <slot :games="games"></slot>
                     </div>
         		</template>
         		
         		<script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data(){
                             return{
                                 games:[''火锅','烧烤','小龙虾'']
                             }
                         },
         			}
         		</script>
         ```

         

## Vuex

### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。



### 2.何时使用？

​		多个组件需要共享数据时



### 3.搭建vuex环境

1. 创建文件：`src/store/index.js`

   ```js
   // 该文件用于创建Vuex中最为核心的store
   import Vue from 'vue'
   // 引入Vuex
   import Vuex from 'vuex'
   Vue.use(Vuex)
   // 准备actions-用于响应组件中的动作
   const actions = {}
   // 准备mutations-用于操作数据（state）
   const mutations = {}
   // 准备state——用于存储数据
   const state = {}
   
   
   // 创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state,
   })
   
   ```

2. 在`main.js`中创建vm时传入`store`配置项

   ```js
   ......
   // 引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
       el:'#root',
       render: h => h(App),
       store
   })	
   ```



### 4.基本使用

- **dispatch: 异步操作**
- **commit: 同步操作**

![vuex](D:\transferFile\systemFile\桌面\import\ljc-learning-notes\笔记\Vue资料（含课件）\资料（含课件）\02_原理图\vuex.png)

1. 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
       jia(context,value){
           //	console.log('actions中的jia被调用了',miniStore, valye)
           context.commit('JIA',value)
       }
   }
   
   const mutaions = {
       //执行加
       JIA(state,value){
       	// console.log('mutations中的JIA被调用了', state,value)
           state.sum += value
       }
   }
   
   // 初始化数据
   const state = {
   	sum: 0
   }
   
   // 创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state
   })
   ```
   
2. 组件中读取vuex中的数据：`$store.state.sum`

3. 组件中修改vuex中的数据：`$store.dispatch('action中的方法名',数据)`或`$store.commit('mutations中的方法名',数据)`

   - 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写`dispatch`,直接编写`commit`



### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getterss加工

2. 在`store.js`中追加`getters`配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
           return state.sum * 10
       }
   }
   
   //创建并保s存tore
   export default new Vuex.Store({
       ......
       getters
   })
   ```

3. 组件中读取数据：`$store.getters.bigSum`



### 6.四个map方法的使用

1. **mapState方法：**用于帮助我们映射`state`中的数据为计算属性

   - **借助mapState生成计算属性，从state中读取数据**
   
   ```js
   computed: {
   	// 借助mapState生成计算属性：sum、school、subject (对象写法)
       ...mapState({sum:'sum', school:'school', subject:'subject'}),
           
       // 借助mapState生成计算属性：sum、school、subject (对象写法)
       ...mapState(['sum','school','subject'])
   }
   ```
   
2. **mapGetters方法：**用于帮助我们映射`getters`中的数据为计算属性

   - **借助mapGetters生成计算属性，从getters(用于将state中的数据进行加工)中读取数据**

   ```js
   computed: {
   	//借助mapGetters生成计算属性：bigSum	(对象写法)
   	...mapGetters({bigSum:'bigSum'}),
   	
       //借助mapGetters生成计算属性：bigSum	(数组写法)
   	...mapGetters(['bigSum'])
   }
   ```

3. **mapActions方法：**用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

   -  **借助mapActions生成对应的方法，方法中会调用dispatch去联系actions**

   ```js
   methods:{
   	//靠mapActions生成；incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
           
   	//靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. **mapMutations方法：**用于帮助我们生成与`mutations`对话的方法,即：包含`$store.commit(xxx)`的函数

   - **借助mapMutations生成对应的方法，方法中会调用commit去联系mutations**
   
   ```js
   methods:{
   	//靠mapActions生成：increment、decrements（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN'])
   }
   ```

- **备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象(event)**



### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确

2. 修改`store.js`

   ```js
   const countAbout = {
   	namespaced:true, //开启namespaced:true，该模块就成为命名空间模块了
       state:{x:1},
       mutations:{	...	},
       actions: {	...	},
       getters: {
           bigSum(state){
               return state.sum * 10
           }
       }
   }
                  
   const personAbout = {
   	namespaced:true, //开启namespaced:true，该模块就成为命名空间模块了
       state:{	...	},
       mutations:{	...	},
       actions: {	...	},
   }               
   
   const store = new Vuex.Store({
   	modules:{
   		countAbout,
           personAbout
       }
   })               
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一:自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```
   
6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'})
   ```

   



## 路由

### 1.基本使用

1. 安装vue-router，命令：`npm i vue-router`

2. 应用插件：`Vue.use(VueRouter)`

3. 编写router配置项

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入route 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
       routes:[
           {
               path:'/about',
               component:About
           },
           {
           	path:'/home'
               component:Home
           }
       ]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（a标签）（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to='/about'>About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```




### 2.几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了路由组件，默认是被销毁的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的`$router`属性获取到。



### 3.嵌套路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routers: [
   	{
   		path:'/about',
   		component:About
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[	//通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
                   component:News
   			},
               {
                   path:'message',	//此处一定不要写：/message
                   component:Message
               }
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）

   ```vue
   <router-link to='/home/news'>News</router-link>
   ```

   

### 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转路由并携带 -->
   <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转</router-link>
   
   <!-- 跳转路由并携带query参数，to的对象写法 -->
   <router-link :to="{
       path:'/home/message/detail',
       query:{
         id:m.id,
         title:m.title
       }
     }
   ">跳转</router-link>
   ```

2. 接受参数:

   ```vue
   $route.query.id
   $route.query.title
   ```



### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path: 'demo',
      	component: Demo,
      	children:[
      		{
      			path:'test',
                  component:Test,
                  children:[
                      {
                          name:'hello', //给路由命名
                          path:'welcome',
                          component:'Hello',
                      }
                  ]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!-- 简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!-- 简化后，直接通过名字跳转 -->
      <router-link :to='{name:'hello'}'>跳转</router-link>
      
      <router-link
           :to="{
                    name:'hello',
                    query:{
                          id:666,
                          title:'你好'
                    }
             	  }"        
      >跳转</router-link>
      ```
      



### 6.传递参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
       component:Home,
       children:[
           {
               path:'news',
               component:News
           },
           {
               path:'message',
               component:Message
               children:[
               	{
               		name:'xiangqing',
               		path:'detail/:id/:title', //使用占位符声明接收params参数
           		}
               ]
           }
       ]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   
   <!-- 跳转并携带params参数，to的对象写法 -->
   <touter-link
   	:to="{
       	name:'xiangqing'
       	params:{
       		id:666,
       		title:'你好'
       	}
       }"
   >跳转</touter-link>
   ```

   - **特别注意：**路由携带params参数时，若使用 :to  的对象写法，则不能使用path配置项，必须使用name配置！

3. 接受参数：

   ```js
   $route.params.id
   $route.params.title
   ```




### 7.路由的props配置

- 左右：让路由组件更方便的收到参数

- ```js
  {
      name:'xiangqiang',
      path:'detail/:id',
      component:Detail,
  
      //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
      // props:{a:1,b:'hello'},
  
      // props的第二种写法(params)，值为布尔值，若布尔值为真，就会把路由组件收到的所有params参数，以props的形式传给Detail组件
      // props:true
              
      // props的第三种写法(query)，该函数返回的对象中每一组key-value都会通过props传给Detail组件
      props($route){
          return {
              id:$route.query.id,
              title:$route.query.title
          }
      }        
  }
  ```
  
  

### 8.`<router-link>`的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别是为`push`何`replace`， `push`是**追加历史记录**，`replace`是**替换当前记录**。路由跳转时候默认为`push`
3. 如何开启`replace`模式：`<router-link replace ......>News</router-link>`



### 9.编程式路由导航

1. 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
       name:'xiangqing',
       params:{
           id:xxx,
           title:xxx
       }
   })
   
   this.$router.replace({
       name:'xiangqing',
       params:{
           id:xxx,
           title:xxx
       }
   })
   //前进
   this.$router.back()
   //后退
   this.$router.forward()
   //可前进可后退
   this.$router.go(-2)
   ```



### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁

2. 具体编码：

   ```vue
   <keep-alive include='News'>	//include内部写组件名
   	<router-view></router-view>
   </keep-alive>
   ```






### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

   ```js
   ...((to,from,next)=>{
   	to: 获取到要跳转到的路由信息（to.path）
       from:获取到来自哪个路由跳转过来的信息
       next: next() 放行 next(path)放行
   })
   ```

   

3. 全局守卫

   ```js
   import  VueRouter from "vue-router"
   // 路由基本数据   
   export default new VueRouter({
   routes:[
           {
               name:'xiaoxi',
               path:'message',
               component:Message,
               meta:{isAuth:true,title:'消息'},
               children:[
                   {
                       name:'xiangqing',
                       // path:'detail/:id/:title', //使用占位符声明接收params参数
                       path:'detail',
                       component:Detail,
                       meta:{isAuth:true,title:'详情'},
                   }
              ]
           }
       ]
   })
   
   //全局前置守卫，初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
       console.log('beforeEach',to,from)
       if(to.meta.isAuth){	//判断当前路由是否需要进行权限控制
           if(localStorage.getItem('student')=== 'ljc'){	//权限控制的具体规则
   			next() //放行
           }else{
               alert('暂无权限查看')
               //next({name:'guanyu'})
           }
       }else{
           next()	//放行
       }
   })
   
   //全局后置守卫，初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
       console.log('afterEach',to,from)
       if(to.meta.title){
           document.title = to.meta.title //修改网络的title
       }else{
           document.title = 'vue_test'
       }
   })
   ```

4. 独享守卫：

   ```js
   {                  
       path:'news',
       component:News,
       meta:{isAuth:true,title:'新闻'},
       // 没afterEnter   
       beforeEnter:(to,from,next) =>{
           console.log('to:',to,'from:',from)
           if(to.meta.isAuth){
               if(localStorage.getItem('student') === 'ljc'){
                   next()
               }else{
                   alert('学生名不对，无权限！')
               }
           }else{
               next()
           }
       }
   },
   ```

5. 组件内守卫

   ```js
   // 进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter(to,from,next){
       
   }
   // 离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave(to,from,next){
       
   }
   ```
   
   ```js
   <script>
   export default {
       name:'About',
       mounted() {
           console.log('%%%',this.$route);
       },
   
       // 通过路由规则，进入该组件时被调用
       beforeRouteEnter (to, from, next) {
           // ...
           console.log('APP---beforeRouteEnter',to, from);
           if(to.meta.isAuth){
               if(localStorage.getItem('student') === 'ljc'){
                   next()
               }else{
                   alert('学生名不对，无权限！')
               }
           }else{
               next()
           }
       },
   
       // 通过路由规则，离开该组件时被调用
       beforeRouteLeave (to, from, next) {
           // ...
           console.log('APP---beforeRouteLeave',to, from);
           next()
       }
   }
   </script>
   ```
   
   

### 13.路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— **#**及其后面的内容就是hash值
2. hash值不会包含在HTTP请求中，即：hash值不会带给服务器
3. hash模式：
   1. 地址中永远带着#号，不美观
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
   3. 兼容性较好
4. history模式：
   1. 地址干净，美观。
   2. 兼容性和hash模式相比略差
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题



# Vue2项目实战

## 面试题

### 路由组件

1. **路由传递参数（对象写法）path是否可以结合params参数一起使用？**

   路由跳转传参的时候，对象写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用

2. **如何指定params参数可传可不传？**

   - 如果路由要求传递params参数，但是你就不传递params参数，发生一件事情，URL会有问题的

   - **如何指定params参数可以传递或不传递，在配置路由的时候，可以在占位的后加一个问号【?】**

   - ```js
     path:'/search/:keyword?', //使用占位符声明接收params参数
     ```

3. **params参数可以传递也可以不传递，但是如果传递是空串，如何解决？**

   - 使用undefined解决：params参数可以传递or不传递（空的字符串）

   - ```js
     this.$router.push({
         name:'search',
         params:{keyword:''|| undefined},
         query:{k:this.keyword.toUpperCase()}
     })
     ```

4. **路由组件能不能传递props数据**

   ```js
   {
       path:'/search/:keyword?', //使用占位符声明接收params参数
       component:Search,
       meta:{show:true},
       name:"search",
       // 路由组件能不能传递props数据
       // 1.布尔值写法：params参数作为路由组件的参数(需声明接收)
       props:true,
       // 2.对象写法
       props:{a:1,b:2}
       // 3.函数写法：可以params参数、query参数，通过props传递给路由组件
       props:($route)=>{({keyword:$route.params.keyword, k:$route.query.k})}
   },
   ```




### 防抖&节流

- JS：闭包 + 延迟器

1. **防抖：前面的所有触发都被取消，最后一直执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次**

   - 用户操作很频繁，但是只执行一次

   - 使用定时器`SetTimout`

   - lodash插件：https://www.lodashjs.com/
     - **`_.debounce(func, [wait=0], [options=])`**

   

2. **节流：在规定时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发**

   - 用户操作很频繁，但是规定的时间只执行一定次数操作【可以给浏览器充裕的时间解析代码】

   - ### `_.throttle(func, [wait=0], [options=])`

   - ```js
     button.onclick = _.throttle(function(){
     	// 节流：5s内只执行一次
     	count++;
     	span.innerHTML = count;
     	console.log('执行')
     }，5000)
     ```

     

### 跨域



### 组件通信方式

- props：用于父子组件通信
- 自定义事件：@on @emit 可以实现子给父通信
- 全局事件总线 $bus  **全能**
- pubsub-js：vue当中几乎不用 **全能**
- 插槽
- vuex



### Promise

- 支持链式调用，可以解决回调地狱的问题



### 深拷贝与浅拷贝

- <a href="https://blog.csdn.net/zhouyuzhu666/article/details/120516317?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166342919616782414995781%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166342919616782414995781&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-120516317-null-null.142^v47^control_1,201^v3^control_2&utm_term=forof%E3%80%81forin%E3%80%81foreach%E5%8C%BA%E5%88%AB&spm=1018.2226.3001.4187">学习链接</a>

- 

### 数组应用

- <a href="https://www.w3school.com.cn/jsref/jsref_obj_array.asp">数组参考手册</a>

#### indexOf( )

- 数组去重

  - indexOf

  - ```js
    // 数组去重
    if(this.searchParams.props.indexOf(props) == -1){  // 没有
      this.searchParams.props.push(props)
    }
    ```

#### delete( )

- `delete` 运算符来*删除*：使用 `delete` 会在数组留下未定义的空洞。请使用 `pop()` 或 `shift()` 取而代之。

- ```js
  var fruits = ["Banana", "Orange", "Apple", "Mango"];
  delete fruits[0];           // 把 fruits 中的首个元素改为 undefined
  ```

  

#### splice( )

- `splice()` 方法可用于向数组添加新项(拼接数组)

  - ```js
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    fruits.splice(2, 0, "Lemon", "Kiwi");
    ```

  - <a href="https://www.w3school.com.cn/tiy/t.asp?f=eg_js_array_splice">测试一下</a>

  - 第一个参数（2）定义了应添加新元素的位置（拼接）。

    第二个参数（0）定义应删除多少元素。

    其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。

    

- `splice()` 方法返回一个包含已删除项的数组：

  - ```js
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    fruits.splice(2, 2, "Lemon", "Kiwi");
    ```

  - <a href="https://www.w3school.com.cn/tiy/t.asp?f=eg_js_array_splice_return">测试一下</a>



- `splice()` 删除元素 ：

- 通过聪明的参数设定，您能够使用 `splice()` 在数组中**不留“空洞”**的情况下移除元素：

  - ```js
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    fruits.splice(0, 1);        // 删除 fruits 中的第一个元素
    ```

  - <a href="https://www.w3school.com.cn/tiy/t.asp?f=eg_js_array_splice_remove">测试一下</a>

  - 第一个参数（0）定义新元素应该被*添加*（接入）的位置。

    第二个参数（1）定义应该*删除多个*元素。

    其余参数被省略。没有新元素将被添加。



#### every( )

- 遍历数据原理：只要数组里面isCheck属性都为1 ==》true；一个不是为1==》false

- ```js
  let isCheck = this.cartInfoList.every(item => item.isChecked == 1) // return true || false
  ```



#### slice( )

- [slice](https://so.csdn.net/so/search?q=slice&spm=1001.2101.3001.7020)(start,end)：方法可从已有数组中返回选定的元素，返回一个新数组，包含从start到end（不包含该元素）的数组元素。

- **注意**：该方法不会改变原数组，而是返回一个子数组，如果想删除数组中的一段元素，应该使用Array.splice()方法。

  - start参数：必须，规定从何处开始选取，如果为负数，规定从数组尾部算起的位置，-1是指最后一个元素。

  - end参数：可选（如果该参数没有指定，那么切分的数组包含从start倒数组结束的所有元素，如果这个参数为负数，那么规定是从数组尾部开始算起的元素）。

  - 

  - ```js
    var arr = [1,2,3,4,5];
    console.log(arr.slice(1));//[2,3,4,5]  选择序列号从1到最后的所有元素组成的新数组。
    console.log(arr.slice(1,3))//[2,3]  不包含end，序列号为3的元素
    console.log(arr.slice(0,-1)) //[1,2,3,4] 不包含end，选择数组索引为0到数组最后一位
    ```



#### find( )

- 查找数组中符合条件的元素返回，为最终结果

- ```js
  return this.addressInfo.find(item => item.isDefault == '1')
  ```

  

#### some()

- 判断是否重复

- ```js
  let isReapet = this.attrInfo.attrValueList.some(item =>{ 
      if(row !== item){ // 先排除自身
        return row.valueName == item.valueName
      }
    })
  ```



#### filter()

- 数组过滤，return true留下，false过滤掉





### 字符串方法

#### split( )

- split() 方法用于把一个字符串分割成字符串数组。

- ```js
  var str="How are you doing today?";
  var n=str.split(" "); // [How,are,you,doing,today]
  ```

  

### 正则式

- 去除所有空格
  - row.valueName = row.valueName.replace(/\s*/g,"") // 去除所有空格



## 笔记

### 路由

1. 编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误

   - 路由跳转有两种形式：声明式导航、编程式导航
   - 声明式导航没有这类问题，因为vue-router底层已经处理好了

2. 为什么编程式路由导航进行路由跳转时，会出现这种警告

   - 'vue-router':"^3.5.4"：最新的vue-router引入promise

3. 通过给push方法传递相应的成功、失败回调函数，可以捕获到当前错误，可以解决

4. 通过底层代码，可以实现错误解决

   - ```js
     this.$router.push({name:'search', params:{keyword:this.keyword}, query:{k:this.keyword.toUpperCase()}}, ( )=>{ }, ( )=>{ })
     ```

   - 这种写法：治标不治本，将来在别的组件中的push|replace，编程式导航还是有类似错误

5. 完美解决，可以重写push方法，一劳永逸

   - ```js
     // 重写push|replace
     // 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
     VueRouter.prototype.push = function (location, resolve, reject) {
         if (resolve && reject) {
             // call || apply区别
             // 相同点：都可以调用函数函数一次，都可以篡改函数的上下文移除（修改this指向）
             // 不同点：call与apply传递参数：call传递参数用逗号隔开；apply方法执行，传递数组
             originPush.call(this, location, resolve, reject)
         } else {
             originPush.call(this, location, () => { }, () => { })
         }
     }
     
     VueRouter.prototype.replace = function (locations, resolve, reject) {
         if (resolve && reject) {
             originReplace.call(this, location, resolve, reject);
         } else {
             originReplace.call(this, location, () => { }, () => { })
         }
     }
     ```



### axios二次封装

- XMLHttpRequest、fetch、JQ、axios

1. 为什么需要进行二次封装axios？
   - 请求拦截器：请求拦截器，可以在发请求之前处理一些业务
   - 响应拦截器：当服务器数据返回以后，可以处理一些事情
2. 在项目当中经常API文件夹【axios】
   - 接口当中：路径都带有/api,因此设置：baseURL:"/api",默认携带了api





## 实用插件

### nprogress进度条

- 浏览器刷新时，上方出现进度条

```js
// 引入进度条
import nprogress from "nprogress";
// start:进度条开始 done:进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"
```



### MookJS前端假数据

- 使用步骤：
  1. 在项目当中src文件夹中创建mock文件夹
  2. 准备JSON数据（mock文件夹中创建响应的JSON文件）-----格式化一下，别留空格（负责跑不起来）
  3. 把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中】
  4. 创建mockServe.js通过mockjs插件实现模拟数据
  5. mockServer.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）



### Swiper轮播图

- 移动端|PC端
- https://www.swiper.com.cn/usage/index.html
- 实用步骤
  - 1.首先加载插件，需要用到的文件有swiper-bundle.min.js和swiper-bundle.min.css文件，不同[Swiper版本](https://www.swiper.com.cn/about/us/index.html#version-different)用到的文件名略有不同。可下载[Swiper文件](https://www.swiper.com.cn/download/index.html#file1)或使用[CDN](https://www.swiper.com.cn/cdn/index.html)
  - 2.添加HTML内容。Swiper7的默认容器是'.swiper'，Swiper6之前是'.swiper-container'。
  - 3.你可能想要给Swiper定义一个大小，当然不要也行。
  - 4.初始化Swiper。



### vue-lazyload图片懒加载

- 网站：npm 中

- 使用步骤：

  1. 下载插件

     npm i vue-lazyload@1.3.3 -S

  2. 引入插件

     import VueLazyload from 'vue-lazyload'    （在main.js中）

     import dog from '@/assets/1.gif'     （引入图片）

  3. 使用插件

     Vue.use(VueLazyload,{

      // 懒加载默认图片

      loading:dog

     })



### lodash/cloneDeep(深拷贝)

- import cloneDeep from 'lodash/cloneDeep'





# Vue2原理

## 组件高级通信

### 组件通信方式

1. props

   - 适用的场景：父子组件通信
   - 注意事项：
     - 如果父组件给子组件传递数据（函数）；本质其实是子组件给父组件传递数据
     - 如果父组件给子组件传递数据（非函数）；本质就是父组件给子组件传递数据
   - 书写方式：3种
     - ['todos'],{type:Array},{type:Array,default:[]}
     - 小提示：路由props
     - 书写形式：布尔值，对象，函数形式

2. 自定义事件

   - 适用场景：子组件给父组件传递数据
   - $on与$emit

3. 全局事件总线$bus

   - 适用场景：万能
   - Vue.prototype.$bus = this

4. pubsub-js,在React框架中使用的比较多。（发布与订阅）

   - 适用场景：万能

5. Vuex

   - 适用场景：万能

6. 插槽

   - 适用场景：父子组件通信-------（一般结构）
   - 分类：默认插槽，具名插槽，作用域插槽

   

### v-model

- v-model它是Vue框架中指令，他主要结合表单元素一起使用（文本框，复选框，单选等）

  他主要的作用是收集表单数据

  - 实现原理：value与input实现实现，**还可以通过v-model实现父子组件数据同步**



### 属性修饰符sync

- 可以实现父子组件数据同步
- :money.sync，代表父组件给子组件传递props【money】，给子组件绑定一个自定义事件【update:money】



### $attrs与$listeners

- 两者是组件实例的属性，可以获取父组件给子组件传递props与自定义事件
- 必须严格使用：
  - v-bind=‘$attrs’
  - v-on='$listerners'
- $attrs
  - 属于组件的一个属性，可以获取到父组件传递过来的props数据
  - 对于子组件而言，父组件给得数据可以利用props接受，都是需要注意，如果子组件通过props接受的属性，在$attrs属性当中是获取不到的
- $listeners
  - 属于组件实例自身的一个属性，可以获取到父组件传递给子组件传递的自定义事件



### $children与$parent

- ref可以获取到某一个组件，子组件
- $children组件实例的属性，可以获取到当前组件的全部子组件【数组】
- $parent组件实例的属性，可以获取到当前组件的父组件，进而可以操作父组件的数据与方法



### 混入mixin

- 如果项目当中出现很多结构类似功能，想要组件复用
- 如果项目当中很多的组件JS业务逻辑类似，想到mixin。【可以把多个组件JS部分重复、相似地方】



### 插槽

- 插槽：可以实现父子组件通信（通信的结构）
- 分类：
  - 默认插槽
  - 具名插槽
  - 作用域插槽：子组件的数据来源父组件，但是子组件决定不了他的外观和结构







