"use strict";
class Dog {
    constructor(name, age) {
        // console.log('this指向对象本身',this.age);
        this.name = name;
        this.age = age;
        console.log('this指向对象本身', this.age);
    }
}
var dog1 = new Dog('小兵', 12);
var dog2 = new Dog('笑话人', 20);
console.log(dog1);
// console.log(dog2);
