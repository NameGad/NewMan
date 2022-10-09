(function (){
    class Animal {
        name:string
        constructor(name:string){
            this.name = name
        }
        say(){
            console.log('Animal叫');
        }
    }
    class Dog extends Animal{
        say(){
            super.say()
        }
    }
    let dog1 = new Dog('小黑')
    console.log(dog1.say())
})()