// 1. 引入 fs 模块
const fs = require("fs");

// 读取【李白】
function readLiBai( ){
    return new Promise((resolve, reject)=>{
        fs.readFile("./resources/李白", (err,data) => {
            // 如果失败
            if(err) reject(err);
            // 如果成功
            resolve(data);
        })
    })
}

function readMingRiShi( ){
    return new Promise((resolve, reject) =>{
        fs.readFile("./resources/明日诗", (err,data) => {
            // 如果失败
            if(err) reject(err);
            // 如果成功
            resolve(data);
        })
    })
}

function readWeiXue( ){
    return new Promise((resolve, reject) =>{
        fs.readFile("./resources/为学", (err,data) => {
            // 如果失败
            if(err) reject(err);
            // 如果成功
            resolve(data);
        })
    })
}


// 声明一个async 函数
async function main( ){
    let libai = await readLiBai();
    let mingrishi = await readMingRiShi();
    let weixue = await readWeiXue();

    console.log(libai.toString( ));
    console.log(mingrishi.toString( ));
    console.log(weixue.toString( ));
}
main()