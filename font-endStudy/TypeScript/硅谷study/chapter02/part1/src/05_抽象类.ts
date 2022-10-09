(function (){
    // 抽象类，无法被实例化，只能继承
    abstract class Animal {
        name:string
        constructor(name:string){
            this.name = name
        }
        // 抽象方法，没有方法体
        // 子类必须对抽象方法进行重写
        abstract say():void
    }
    class Dog extends Animal{
        say(){
            console.log('汪汪汪');
        }
    }
    let dog1 = new Dog('小黑')
    console.log(dog1.say())
})()