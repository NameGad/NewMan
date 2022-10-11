import {sum} from "./math.js";
// import count from './count.js';

console.log("hello main");
console.log(sum(3,4,5));

document.getElementById('btn').onclick = () => {
    console.log(123);
    // import 动态导入：会将动态导入的文件代码分割（拆分成单独模块），在需要使用的时候自动加载
    import('./count.js')
        .then((res)=>{
            console.log('模块加载成功',res.default(100,1));
        })
        .catch((err)=>{
            console.log('模块加载失败', err);
        })
}