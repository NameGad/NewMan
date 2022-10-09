(function (){
    class Animal {
        name:string
        constructor(name:string){
            this.name = name
        }
        say(say:string){
            console.log(say);
        }
    }
    
    class Dog1 extends Animal{
    
    }
    const dog1 = new Dog1('dog1')
    console.log(dog1.say('wwww'));
    
})()