// 定义没有依赖的模块
define(function(){
  let name = 'dataService.js'
  function getName(){
    return name;
  }
  // 返回模块
  return {getName}
})