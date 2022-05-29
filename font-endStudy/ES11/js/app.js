// 静态import
// import * as mi from "./hello.js";

// 动态import()
// var btn = document.getElementById('button');
var btn = document.getElementsByTagName('button')[0];
btn.onclick = function(){
    console.log('ing');
    import("./hello.js").then(module =>{
       module.hello();
    }) 
}