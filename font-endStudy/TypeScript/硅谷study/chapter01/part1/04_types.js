"use strict";
// object表示一个对象（只指定意义不大）
let a;
a = {};
a = function () {
};
// {}用来指定对象中可以包含哪些属性
// 语法：{属性名：属性值,属性名：属性值}
let b; // 多了少了都不行,加？变为可选属性
b = { name: '孙悟空' };
//  [propName:string]:any 表示任意类型的属性
let c;
c = { name: '孙悟空', age: 19, gender: 'nan' };
/*
    设置函数接口的类型声明
        语法：(形参:类型, 形参:类型,...) => 返回值
*/
let d;
d = function (n1, n2) {
    return n1 + n2;
};
// string[] 表示字符串数组
let e;
e = ['a', 'b', 'c'];
// number[] 表示数值数组
let f;
let g;
// 元组：就是固定长度与类型的数组
let h;
h = ['hello', 123];
// enum 枚举
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Feamle"] = 1] = "Feamle";
})(Gender || (Gender = {}));
let i;
i = {
    name: 'xiaoming',
    gender: Gender.Male
};
// console.log(i.gender === Gender.Male);
// & 表示同时
let j;
j = { name: 'ljc', age: 22 };
let k;
let l;
