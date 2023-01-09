"use strict";
(function () {
    // 抽象类，无法被实例化，只能继承
    class Animal {
        constructor(name) {
            this.name = name;
        }
    }
    class Dog extends Animal {
        say() {
            console.log('汪汪汪');
        }
    }
    let dog1 = new Dog('小黑');
    dog1.say()
})();
