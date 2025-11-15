function hey(abstractPet: Cat | Dog): string {
    return "hey! i'm " + abstractPet.name();
}

class Cat {
    petName:string;
    isTrue:boolean;    
    constructor (petName:string, isTrue:boolean) {
        this.petName = petName;
        this.isTrue = isTrue;
    }
    name(){
        return this.petName
    }    
}

class Dog {
    petName:string;
    id:number;
    constructor (petName:string, id:number){
        this.petName = petName;
        this.id = id;
    }
    name(){
        return this.petName
    }
}

let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey(a)
hey(b)



