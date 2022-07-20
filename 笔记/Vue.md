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



## 一、模板语法

### 1.插值语法

- 功能：用于**解析标签体内容。**        
- 写法：{{xxx}}，xxx是js表达式，切可以直接读取到data中的所以属性。

### 2.指令语法

- 功能：用于**解析标签**（包括L标签属性、标签体内容、绑定事件......）。
- 举例：v-bind:href='xxx' 或 简写为 :href='xxx',xxx同样要写js表达式，且可以直接读取到data中的所有属性
- 备注：Vue中有很多的指令，且形式都是：v-????,此处我们只是拿v-bind举个例子



## 二、数据绑定

### 1.单向数据绑定

- 单向绑定(v-bind): 数据只能从data流向页面。

- ```
  <input type="text" v-bind:value="name">
  <input type="text" :value="name">
  ```

  



### 2.双向数据绑定

- 双向绑定(v-model): 数据不仅能从data流向页面，还可以从页面流向data。

- 备注：

  - 双向绑定一般都应用在表单类元素上(如：input、select等)
  - v-model:value 可以简写成 v-model,因为v-model默认的就是value的值  

- ```
  <input type="text" v-model:value="name">
  <input type="text" v-model="name">
  ```



## 三、el与data的2种写法

### 1.el有2种写法

- (1).new Vue的时候配置el属性。
- (2).先创建Vue实例，随后再通过vm.$mount("#root")指定el的值

### 2.data有2种写法

- (1).对象式
- (2).函数式
- 如何选择: 目前哪种写法都可以，以后学习到组件时，data必须使用函数式，负责会报错

### 3.一个重要的原则

- **由Vue管理的函数，一定不能写箭头函数，一旦写了箭头函数，this就不再是Vue实例了**



## 四、MVVM模型

### 1.MVVM模型

- M: 模型(Model): data中的数据

- V: 视图(View): 模板代码

- VM: 视图模型(ViewModel): Vue实例

- 观察发现：

  - 1.data中的所有属性，最后都出现在了vm身上。

  - 2.vm身上所有属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

    

## 五、数据代理

### 1.JS-Object.defineProperty

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

### 2.何为数据代理

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

```

### 3.Vue中的数据代理

- 1.Vue中的数据代理：
  - 通过vm对象来代理data对象中属性的操作(读/写)
- 2.Vue中数据代理的好处：
  - 更加方便操作data中的数据
- 3.基本原理:
  - 通过Object.defineProperty()把data对象中所有属性添加到vm上
  - 为每一个添加到vm上的属性，都指定一个getter/setter
  - 在getter/setter内部去操作(读/写)data中对应的属性



## 六、事件代理

### 1.Vue中的事件修饰符

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

  

### 2.Vue键盘事件

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

  

## 七、监视属性

### 一、监视属性：watch

-  1.当被监视的属性变化时，回调函数自动调用，进行相关操作

- 2.监视的属性必须存在，才能进行监视！！

- 3.监视的两种写法：

  -  (1).new Vue时传入watch配置

  -  (2).通过vm.$watch监视

### 二、深度监视

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

### 三、computed和watch区别

- (1).computed能完成的功能,watch都可以完成

- (2).watch能完成的功能，computed不一定能完成 例如：watch可以进行异步操作

- 两个重要的小原则:

  - **1**.**所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象**

  - **2**.**所有不被Vue所管理的函数(定时器的回调函数、ajax的回调函数等、Promise的回调函数)，最好写成箭头函数，这样this的指向才是vm 或 组件实例对象**

    ​        

## 八、绑定样式

- **class样式**

  - 写法：

    - class="xxx" xxx可以是字符串、对象、数组

    - 字符串写法适用于：类名不确定，要动态获取
    - 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用

- **style样式**

  - :style="{fontSize: xxx}"其中xxx是动态值
  - :style="[a, b]" 其中a、b是样式对象



## 九、条件渲染

### 一、v-if

-  写法：
  - (1).v-if = "表达式"
  - (2).v-else-if = '表达式'  
  - (3).v-else = '表达式'

- 适用于：切换频率较低的场景
- 特点：不展示的DOM元素直接被移除      
- 注意：v-if可以和:v-else-if、v-else 一起使用，但要求结构不能被"打断"

### 二、v-show

- 写法：v-show = "表达式"
- 适用于: 切换频率较高的场景。
- 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
- 备注：
  - 使用v-if时，元素可能无法获取到，而使用v-show一定可以获取到。



## 十、列表渲染与key

### 一、基本列表

- v-for指令
  - 用于展示列表数据
  - 语法：v-for="(item, index) in xxx" :key = "yyy"
  - 可遍历：数组、对象、字符串(用的很 少)、指定次数(用的很少)

### 二、key的原理(面试)

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



## 十一、Vue数据检测原理

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
   - 2.Vue.set() or vm.$set()

5. **特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！**



## 十二、收集表单数据

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



## 十三、过滤器

**过滤器**：

-  定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）
- 语法：

​          1.注册过滤器：Vue.filter(name,callback) 或 new Vue(filters:{})

​          2.使用过滤器：{{ xxx | 过滤器名 }} 或 v-bing:属性 = "xxx | 过滤器名"

- 备注：

​          1.过滤器也可以接收额外参数、多个过滤器也可以串联

​          2.并没有改变原来的数据，是产生新的对应的数据



## 十四、内置指令

- v-bind ：单向绑定解析表达式，可简写为 :xxx

- v-model ：双向数据绑定

- v-for ：遍历数组/对象/字符串

- v-on ：绑定事件监听，可简写为@

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

## 十五、自定义命令

### 一、定义语法：

```
 (1).局部指令
  new Vue({                                   new Vue({
  	dirctives:{指令名: 配置对象}    或          	directives(){}
  })                                          })
 (2).全局指令：
  Vue.directive(指令名，配置对象)   或  		Vue.directive(指令名，回调函数)
```



### 二、配置对象中常用的3个回调：

​	(1).bind: 指令与元素成功绑定时调用。

​	(2).inserted: 指令所在元素被插入页面时调用。

​	(3).update: 指令所在模板结构被重新解析时调用。



### 三、备注：

- 指令定义时不加v-，但使用时要加v-；
- 指令名如果是多个单词，要使用kebab-case命名方式(user-name)，不要用camelCase命名(userName)。



## 十六、生命周期

### 一、什么是生命周期

​        1.生命周期又名：生命周期回调函数、生命周期函数、生命周期钩子、

​        2.生命周期是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。

​        3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据1需求编写的。

​        4.生命周期函数中的this指向是vm 或 组件实例对象

![生命周期](D:\transferFile\systemFile\桌面\import\ljc-learning-notes\笔记\Vue资料（含课件）\资料（含课件）\02_原理图\生命周期.png)

### 二、常用的生命周期钩子：

​        1.mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】

​        2.beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

​      

### 三、关于销毁Vue实例：

​        1.销毁后借助Vue开发者根据看不到任何信息

​        2.销毁后自定义事件会失效，但原生DOM事件依然有效

​        3.一般不会在beforeDestroy操作，因为即便操作数据，也不会再触发更新流程了