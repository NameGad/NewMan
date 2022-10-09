// object表示一个对象（只指定意义不大）
let a: object
a = {}
a = function (){

}
// {}用来指定对象中可以包含哪些属性
// 语法：{属性名：属性值,属性名：属性值}
let b: {name: string, age?: number} // 多了少了都不行,加？变为可选属性
b = {name:'孙悟空'}

//  [propName:string]:any 表示任意类型的属性
let c: {name:string, [propName:string]:any}
c = {name:'孙悟空',age:19,gender:'nan'}

/* 
    设置函数接口的类型声明
        语法：(形参:类型, 形参:类型,...) => 返回值
*/
let d: (a:number,b:number)=>number;
d = function(n1,n2):number{
    return n1 + n2
}

// string[] 表示字符串数组
let e: string[]
e = ['a','b','c']
// number[] 表示数值数组
let f: number[]
let g: Array<number>

// 元组：就是固定长度与类型的数组
let h :[string,number]
h = ['hello',123]

// enum 枚举
enum Gender{
    Male = 0,
    Feamle = 1
}

let i:{name:string,gender:Gender};
i = {
    name:'xiaoming',
    gender:Gender.Male
}
// console.log(i.gender === Gender.Male);

// & 表示同时
let j : { name: string} & {age : number}
j = {name:'ljc', age:22}

// 类型的别名
type myType = string
type myType2 = 1 | 2 | 3
let k : myType
let l : myType2 

