# Promise

## Promise的状态

- 实例对象中的一个属性 【PromiseState】
  - pending 未决定
  - resolved / fullfilled  成功
  - rejected  失败

## Promise对象的值

- 实例对象中的另一个属性【PromiseResult】
  - 保存异步任务【成功/失败】的结果
  - resolve(**data**)
  - reject(**err**)

## API

1. **Promise构造函数**：Promise(excutor){}

   - excutor函数：执行器（resolve, reject）=>{ }
   - reslve函数：内部定义成功时我们调用的函数 value => { }
   - reject函数：内部定义失败时我们调用的函数 reason => { }

   - **说明**：executor会在Promise内部**立即同步调用**，异步操作在执行器中执行

2. **Promise.prototype.then** 方法：（onResolved，onRejected）=> { }

   - onResolved函数：成功的回调函数（value）=> { }
   - onReject函数：失败的回调函数（reason）=> { }
   - **说明**：指定用于得到成功value的成功回调和用于得到失败reason的回调函数，**并返回一个Promise对象**

3. **Promise.prototype.catch** 方法：（onRejected）=> { }

   - onRejected 函数：失败的回调函数（reason）=>{ }
   - **说明**：then( )语法糖，相当于：then(undefined,onRejected),由then封装而来

4. **Promise.resolve** 方法：（value）=> { }

   - value：成功的数据或Promise对象
   - **说明**：返回一个成功/失败的Promise对象  

5. **Promise.reject** 方法：（reason）=>{ }

   - reason：失败的原因
   - **说明**：返回一个失败的 Promise 对象

6. **Promise.all** 方法：（promise）=> { }

   - promises: 包含 n 个 promise 的数组

   - **说明**：返回一个新的Promise，只有所有成功才成功，一个失败就直接失败

   - ```js
     let p2 = Promise.reject('Oh No!!!')
     let p3 = Promise.resolve('Oh Yeah')
     
     // 全部成功则成功；一个失败则失败，返回的为该失败的值
     const result = Promise.all([p2,p3])
     ```

7. **Promise.race** 方法：（promise）=> { }

   - promise：包含 n 个promise 的数组
   - **说明**：返回一个新的promise，第一个完成的完成的结果状态就是最终的结果状态



## Promise的几个关键问题

1. **如何改变promise的状态**

   - resolve(value): 如果当前是 pending 就会变为 resolved

   - reject(reason): 如果当前是 pending 就会变为 rejected

   - 抛出异常：如果当前是 pending 就会变为 rejected
2. **一个promise指定多个成功/失败回调函数，都会调用？**

   - 当promise改变为对应状态时都会调用
3. **改变promise状态（resolve，reject）和指定回调函数（then）执行谁先谁后？**

   - 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调

   - **如何先改状态再指定回调？**

     1. 在执行器中直接调用 resolve( )/reject( )，不使用异步
     2. 延迟更长时间才调用 then( )

   - **什么时候才能得到数据？**

     - 如果先指定的回调，那么状态发生改变时，回调函数就会调用得到数据
     - 如果先改变状态（立即调用resolve/reject），那当指定回调时，回调函数就会调用，得到数据

     - **说明：都是等到状态改变结束才拿到数据**
4. **promise.then( )返回的新promise的结果状态由什么决定？**

   - 简单表达：由 then( ) 指定回调函数执行的结果决定
   - 详细表达：
     1. 如果抛出异常，新的promise变为rejected，reason为抛出异常
     2. 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值
     3. 如果返回的是另一个新promise，此promise的结果就会变为新promise的结果
5. **promise如何串联多个操作任务？**

   - promise 的 then( ) 返回一个新的promise，可以生成 then 的链式调用
   - 通过 then 的链式调用串联多个同步/异步任务



## 文章

### async

- async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。因此对async函数可以直接then，返回值就是then方法传入的函数。

- ```js
  // async基础语法
  async function fun0(){
      console.log(1);
      return 1;
  }
  fun0().then(val=>{
      console.log(val) // 1,1
  })
  
  async function fun1(){
      console.log('Promise');
      return new Promise(function(resolve,reject){
          resolve('Promise')
      })
  }
  fun1().then(val => {
      console.log(val); // Promise Promise
  })
  ```

  

### await

- await 也是一个修饰符，只能放在async定义的函数内。可以理解为**等待**。

- await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），**且取到值后语句才会往下执行!**

- 如果不是Promise对象：把这个非promise的东西当做await表达式的结果。

- ```js
  async function fun(){
      let a = await 1;
      let b = await new Promise((resolve,reject)=>{
          setTimeout(function(){
              resolve('setTimeout')
          },3000)
      })
      let c = await function(){
          return 'function'
      }()
      console.log(a,b,c)
  }
  fun(); // 3秒后输出： 1 "setTimeout" "function"
  ```

- ```js
  function log(time){
      setTimeout(function(){
          console.log(time);
          return 1;
      },time)
  }
  async function fun(){
      let a = await log(1000);
      let b = await log(3000);
      let c = log(2000);
      console.log(a);
      console.log(1)
  }
  fun(); 
  // 立即输出 undefined 1
  // 1秒后输出 1000
  // 2秒后输出 2000
  // 3秒后输出 3000
  ```



### async/await 的正确用法

```js
// 使用async/await获取成功的结果

// 定义一个异步函数，3秒后才能获取到值(类似操作数据库)
function getSomeThing(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('获取成功')
        },3000)
    })
}

async function test(){
    let a = await getSomeThing();
    console.log(a)
}
test(); // 3秒后输出：获取成功
```



### 其他知识点-理解

- async+await就是为了把异步变成同步呢，比如下一步操作需要用到上一步处理的结果，而上一步结果又是个异步，如果不是呀async,那只能层层嵌套；

  async/await 多了一个功能，就是把 promise 语法简化

1. **await只能获取成功的值**
   - 所以一般用try catch 获取失败的值啊
   - 
