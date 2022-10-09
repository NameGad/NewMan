const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile)

// 回调函数实现
/* fs.readFile('../resources/李白', (err, data1)=>{
    if(err) throw err;
    fs.readFile('../resources/明日诗', (err, data2)=>{
        if(err) throw err;
        fs.readFile('../resources/为学', (err, data3)=>{
            if(err) throw err;
            console.log(data1.toString() + data2.toString() + data3.toString());
        })
    })
})
 */
// async 与 await
async function main(){
    // 读取第一个文件
    try {
        let data1 = await mineReadFile('../resources/明日诗')
        let data2 = await mineReadFile('../resources/为学')
        let data3 = await mineReadFile('../resources/为学')
        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e);
    }
}
main()