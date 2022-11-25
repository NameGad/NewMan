// 分别暴露
export function add(a, b) {
  console.log(a + b);
}
export function sub(a, b) {
  console.log(a - b);
}

// 2. 统一暴露, m2.js
let school = 'gc';

function findJob() {
    console.log("m2---我们可以帮助你找工作!!");
};

export {school, findJob};