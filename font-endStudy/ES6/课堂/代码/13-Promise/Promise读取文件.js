// 1. 引入 fs 模块
const fs = require('fs');

// 2. 调用方法读取文件
// fs.readFile('resources/为学', (err, data) =>{
//     // if error 抛出 throw
//     if(err) throw err;
//     //if no problem, z则输出内容
//     console.log(data.toString( ));
// });

// 3. 使用Promise封装
const p = new Promise(function(resolve, reject){
    fs.readFile('resources/为学', (err, data)=>{
        //判断如果失败
        if(err) reject(err);
        //如果成功
        resolve(data);
    });
});
p.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log('读取失败！！');
})