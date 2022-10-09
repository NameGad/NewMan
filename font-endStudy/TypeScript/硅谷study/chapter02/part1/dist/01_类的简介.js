"use strict";
class Person {
    constructor() {
        this.name = '李嘉诚';
    }
}
Person.age = 39;
let p1 = new Person();
console.log(p1);
console.log(p1.name);
console.log(Person.age);
