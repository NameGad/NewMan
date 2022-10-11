// 完整引入(全部)
// import 'core-js';
// 按需加载(手动)
// import "core-js/es/promise"

import count from "./js/count.js";
import sum from "./js/sum.js";
// import {mul} from "./js/math.js";
// 想要webpack打包资源，必须引入改资源
import "./css/index.css"; 
import "./less/index.less";
import "./sass/index.scss";
import "./css/iconfont.css";

const result = count(100,1);
// console.log(mul(10,1));
console.log(count(2,1));
console.log(sum(1,2,3,4));
console.log(result);

if(module.hot) {
    // 判断是否支持热模块替换功能
    module.hot.accept("./js/count");
    module.hot.accept("./js/sum");
}

document.getElementById('btn').onclick = ()=>{
    // eslint 不能识别动态导入需要，需要额外追加配置
    // /*webpackChunkName: "math"*/ webpack魔法命名
    import(/*webpackChunkName: "math",webpackPreload: true*/'./js/math.js').then(({mul}) => {
        console.log(mul(3,9));
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}