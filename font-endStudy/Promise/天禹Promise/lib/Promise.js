(function () {
  // Promise 构造函数
  function Promise(excutor) { // 接收一个执行器函数

  }

  // resolve，用于：1.将pending状态改为fulfilled（resolved） 2.保存成功的value
  function resolve(value){

  }

  // reject，用于：1.将pending状态改为rejected 2.保存成功的reason
  function reject(reason){

  }
  // Promise原型对象上的then方法，供实例使用，用于指定onResolved、onRejected
  Promise.prototype.then = function(onResolved, onRejected){

  }

  // Promise原型对象上的catch方法，供实例使用，用于指定onRejected
  Promise.prototype.catch = function(onRejected){

  }

  // Promise身上的resolve，给自己用，用于快速返回一个状态为resolved的Promise实例
  Promise.resolve = function(){

  }

  // Promise自己身上的reject，给自己用，用于快速返回一个状态为rejecte的Promise实例
  Promise.reject = function(){

  }

  /* 
    Promise身上的all，静态方法
      1.返回值是一个新的Promise实例
      2.接收一个数组，数组中每一项都是一个Promise实例
      3.只有全部的Promise成功，才成功，值为所有成功的value组成的数组
      4.只要有一个失败，就失败，值为失败的那个Promise实例的reason
  */
  Promise.all = function(){

  }

  /* 
    Promise身上的race，静态方法
      1.返回值是一个新的Promise实例
      2.接收一个数组，数组中每一项都是一个Promise实例
      3.返回的那个新的Promise实例状态和数据，由最先执行完毕的Promise实例决定
  */
  Promise.race = function(){

  }
  
  // 调用执行器函数，注入resolve，reject，供promise使用者使用
  excutor(resolve, reject)
  window.Promise = Promise
}) ()