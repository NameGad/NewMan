// 引入 fs 模块
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

// fs.readFile('resources/李白', (err, data1)=>{
//     fs.readFile('resources/明日诗', (err, data2)=>{
//         fs.readFile('resources/为学', (err,data3)=>{
//             let result = data1 + '\r\n' + data2 + '\r\n'+ data3;
//             console.log(result);
//         })
//     })
// })

// 使用 promise 实现
const p = new Promise((resolve, reject) => {
    fs.readFile("resources/李白",(err,data) => {
        resolve(data);
    });
});

p.then(value => {
    return new Promise((resolve, reject)=>{
        fs.readFile("resources/明日诗",(err,data) => {
            resolve([value, data]);
        });
    })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile("resources/为学", (err,data) => {
            //压入
            value.push(data);
            resolve(value);
        });
    })
}).then(value => {
    console.log(value.join());
})