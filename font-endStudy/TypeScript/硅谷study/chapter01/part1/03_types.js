"use strict";
/* // 可以直接使用字面量类型(if:a只能为10)
let a: 10

// 联合类型(if:b可为如下两种类型)
let b: string | boolean

// any 表示任意类型，一个变量设置为any后相对于关闭了TS的类型检测（不建议使用）
let c: any
c = 10
c = 'hello'
c = true
// unknown 表示未知类型（安全的any）
let d: unknown
d = 10;
d = 'hello'
d = true

let s:string
// any与unknown的区别
// c的类型是any,他可以赋值给任意变量(同时也关闭了s的类型检查)
// 但是unknown不可以，不能把未知类型给已知类型赋值
s = c

// 类型断言，可以用来告诉解析器变量的实际类型
s = d as string
s = <string>d

// void 用来表示空，一函数为例，就表示没有返回值的函数(undefined)
function fn(): void{
    return undefined
}

// never 表示永远不会返回结果(少用)
function fn2(): never{
    throw new Error("出错了");
}
 */
