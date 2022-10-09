// 统一暴露
function foo2(){
  console.log('module2:foo');
}
function bar2(){
  console.log('module2:bar');
}
export {bar2,foo2}