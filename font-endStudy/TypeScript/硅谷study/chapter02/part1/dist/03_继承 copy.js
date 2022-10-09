"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        say(say) {
            console.log(say);
        }
    }
    class Dog1 extends Animal {
    }
    const dog1 = new Dog1('dog1');
    console.log(dog1.say('wwww'));
})();
