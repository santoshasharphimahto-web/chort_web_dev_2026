// class 
class Cricketer{

    constructor(name,role){
        this.name=name;
        this.role=role;
        this.matchesPlayed=0;
        this.stamina=100;


    }
            introduce(){
            return `${this.name} ${this.role} | mathcedPlayed:${this.matchesPlayed}
            |stamina:${this.stamina}
            `
        }

}

const player1=new Cricketer("virat","Bastman");
const player2 = new Cricketer("Bumrha ","Bowler");
console.log(player1)
console.log(player2)

console.log(player1.hasOwnProperty("name"));
console.log(player1.hasOwnProperty("introduce"))

console.log(typeof Cricketer)// class are just syntaic sugue of the function 
console.log(player1.name)
console.log(player2.name)
console.log(player1.introduce());
console.log(player2.introduce());

// Interview Question 
// "gotchas"

class debutant{
    constructor (name){
        this.name=name;
        this.walkOut =()=>{
           return `${this.name} walks out to bat for the First time `
        }
    }
}

const newPlayer = new debutant("shubham");
console.log(newPlayer);
console.log(newPlayer.walkOut())
const somthingFromTheLastClass = newPlayer.walkOut;
console.log(somthingFromTheLastClass());


// symbol-data Type hai , primitives,unique and immutable, conflit avoid used in object keys 
const aadhar_of_mayur=Symbol("aadhar");
const aadhar_of_piyush =Symbol("aadhar");
console.log(typeof aadhar_of_mayur)
console.log(aadhar_of_mayur === aadhar_of_piyush)// it gives value alway unique lable will be the same but not a value
console.log(aadhar_of_mayur.toString())// explicitly you need to see the string repersantion ocf the symbbol

console.log(aadhar_of_mayur.description);// the .descrption properyty helps in indenntifiaction and debuding ,it gives the lable 

// Interview question
const nonIndian= Symbol();
console.log(nonIndian.description)// undefinedd beacuse level has symbol has no value 

const biometricHash= Symbol("biometriHash");
const bllodGroup = Symbol("bllodGroup");

const chembra ={
    id:1223,
    name:"santosh",
    [biometricHash]:"gdqbbbqwxu122324",
    [bllodGroup]:"hbxsxsxhuqwnjqwn123",
}

console.log(chembra);
console.log(chembra[biometricHash]);
console.log(Object.keys(chembra));// it will gives onlya a two key beacuse ,symbo key are invisiable you cannot see them directly 

console.log(Object.getOwnPropertySymbols(chembra)) // this methods retus array , conataing all tge symbol property which directly used in the object key 

// ex:- 

const govermentScheme={
    name:"pm Kisan yog",
    pepole:54,
    [Symbol.toPrimitive](hint){// this is the that of symbol taht covert a object into corresponding primitives value 
        if(hint==="string") return this.name
        if(hint==="number") return 88;

    }
}
// a method that converts an objects to a coresponding primitive Value
console.log(+govermentScheme)
console.log(`${govermentScheme}`)


// Error handeling
// (error ko  grasseFully handely karnye ke , jo code ram bharosye jho ,chalye ga ye nhi )

// ex:- data base connecton (hosktha ,nhi bhi hoskatha hai )

function bootNavigation(mapLoaded){
     
    try{
        console.log(`Is Navigation Loaded:${mapLoaded}`);
        if(!mapLoaded){
            throw new Error("map was not passed in the function")
        }
        return "Nav_Ok";
    }catch(error){
    console.log(error)
    console.log(`Navigation Failed:${error.message}`)

    }finally{
        console.log("navigation sequence is completed")
    }

}
const status = bootNavigation(false)







