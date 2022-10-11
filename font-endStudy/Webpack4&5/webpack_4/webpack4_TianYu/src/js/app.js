/*
app.js是webpack的入口，所有外部文件（js、json、css、lees等等）都需要在这里引入使用
*/
import { add, sub } from './modules/module2';
import school from './modules/module1';
import data from '../json/test.json';
import '../css/index.css';
import '../css/demo.scss';
import '../css/iconfont.css';

sub(100, 1);
add(87, 1);
console.log(school);
console.log(data);
const obj = { a: () => { console.log(school); } };
const { a } = obj;
a();

// const p = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log(900);
//   }, 1000);
// });
// p.then(
//   (value) => { console.log('c成功了', value); },
//   (reason) => { console.log('失败了', reason); },
// );
// console.log(p);
