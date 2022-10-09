class Promise{
    // 构造方法
    constructor(executor){
         // 添加属性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        // 声明属性
        this.callbacks = []
        // 保存实例对象的 this 的值
        const self = this // self _this than
        // resolve函数
        function resolve(data){
            // 判断状态
            if(self.PromiseState !== 'pending') return
            // 1. 修改对象的状态 (promiseState)
            self.PromiseState = 'fulfilled'
            // 2. 设置对象的结果值 (promiseResult)
            self.PromiseResult = data
            // 调用成功的回调函数
            setTimeout(() => {
                self.callbacks.forEach(items => {
                    items.onResolved(data)
                })   
            });
        }
        // reject函数
        function reject(data){
            // 判断状态
            if(self.PromiseState !== 'pending') return
            // 1. 修改对象的状态 (promiseState)
            self.PromiseState = 'rejected'
            // 2. 设置对象的结果值 (promiseResult)
            self.PromiseResult = data
            // 调用成功的回调函数
            setTimeout(() => {
                self.callbacks.forEach(items => {
                    items.onRejected(data)
                })   
            });
        }

        // 同步调用执行器函数
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    // 添加 then 方法
    then(onResolved, onRejected){
        const self = this
        // 判断回调函数参数
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason
            }
        }
        if(typeof onResolved !=='function'){
            onResolved = value => value;
        }
        return new Promise((resolve,reject) => {
            // 封装函数
            function callback(Type){
                try {
                    // 获取回调函数的执行结果
                    let result = Type(self.PromiseResult)
                    // 判断
                    if(result instanceof Promise){
                        result.then(v => {
                            resolve(v);
                        }, r => {
                            reject(r)
                        })
                    }else{
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            // 调用回调函数 PromiseState
            if(this.PromiseState === 'fulfilled'){
                setTimeout(() => {
                    callback(onResolved)
                });
            }
            if(this.PromiseState === 'rejected'){
                setTimeout(() => {
                    callback(onRejected)
                });
            }
            // 判断 pending 状态
            if(this.PromiseState === 'pending'){
                // 保存回调函数
                this.callbacks.push({
                    onResolved: function(){
                        callback(onResolved)
                    },
                    onRejected: function(){
                        callback(onRejected)
                    }
                })
            }
        })
    }
    // 添加 catch 方法
    catch(onRejected){
        return this.then(undefined, onRejected)
    }
    // 添加 resolve 方法
    static resolve(value){
        // 返回promise对象
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v)
                }, r=>{
                    reject(r)
                })
            }else{
                // 状态设置为成功
                resolve(value)
            }
        })
    }
    // 添加 reject 方法
    static reject(reason){
        return new Promise((resolve, reject)=>{
            reject(reason)
        })
    }
    // 添加 all 方法
    static all(promises){
        // 返回结果为promise对象
        return new Promise((resolve, reject) => {
            // 声明变量
            let count = 0
            let arr = []
            // 遍历
            for(let i = 0; i<promises.length; i++){
                promises[i].then(v => {
                    // 得知对象的状态是成功
                    // 每个promise对象 都成功
                    count++;
                    // 将当前promise对象成功的结果存入数组
                    arr[i] = v
                    // 判断
                    if(count === promises.length){
                        // 修改状态
                        resolve(arr)
                    }
                }, r => {
                    reject(r)
                })
            }
        })
    }
    // 添加 race 方法
    static race(promises){
        return new Promise((resolve, reject) => {
            for(i = 0; i<promises.length; i++){
                promises[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            }
        })
    }
}








