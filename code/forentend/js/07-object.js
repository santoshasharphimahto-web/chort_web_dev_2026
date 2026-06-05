// const { name } = require("ejs");

const hero ={
    name:"Lana the Brave",
    class:"mage",
    level:"12",
    health:85,
    mana  :120,
    isAlive:true,
}; 
console.log(hero.health)
console.log(hero.isAlive)
console.log(hero.mana)

console.log(hero.mana)
console.log(hero.name)

// object me ye tho property add karsaktho or delet kar sakthye hooo !!!

// i) add karna
hero.weapone ="fire";
// 2 delet karnye kye lye 

delete hero.name
console.log(hero) 

const ranger ={
    name:"Lakshay the swift",
    agiliy:80,
    stealth:undefined
}

console.log("name" in ranger)
console.log("agiliy" in ranger)
console.log("toString" in ranger) // ye prototype chaning hai ye value ko inharitance kartha hai 


// reality ke ly ham log hasOWNproerty use kartye hai 
console.log(ranger.hasOwnProperty("toString")); // it specifie the objects its own property 

// objects methods 

const artifact ={
  name :"obsidian Crawn",
  era:'ancient',
  value:5000,
  materials:"volcaninc"

};

//access ll the keys in object

const key=Object.keys(artifact)
console.log(key)// it retus a array of the keys of the given object

// for the values 

const values= Object.values(artifact)
console.log(values)// it returns a array of the valus of the given object

// for entries= key valuee paire 
 const entries = Object.entries(artifact)
 console.log(entries) //it returns  a arry of an array consting key value paire of the given object

 // object me most of the case me for of loop  use ho tha hai 

 for (const [key,value] of Object.entries(artifact)){
    console.log(`${key} : ${value}`)
 }

// es traha sye object ko array me convert kyr gtha hai 


// array ko object me covet karna 
// note:- array of array = enties same enties =fromenties = converted into object 

const priceList = [
    ["obsibdion crown",50000],
    ["ruby Pendant",30000],
    ["Iron shield",5000],
];

const priceObject = Object.fromEntries(priceList)
console.log(priceObject)



// Intervew Question 

const displaycase={
    artifact:"Obsidian",
    location:"hall A,Case 3",
    locked:"true",
};

Object.freeze(displaycase);
delete displaycase.artifact
displaycase.newprp="test";
console.log(displaycase)// print the samae as the object 

// object.Seal()

const catelogEntry={
    id:"ART-001",
    description:"Ancient Crows",
    verified:true,
}
Object.seal(catelogEntry)
delete catelogEntry.id,
catelogEntry.newprop="test",
console.log(catelogEntry)

// diffrenve b/w  both ,only edit in valye can't change the structure 

catelogEntry.id="weewww"
console.log(catelogEntry);

 // Interview Question 

 const secureArtificates = {name:"Ruby Pandant"};
 Object.defineProperty(secureArtificates,"catelogID",{
    value:"sec-999",
    

    writable:false,//chnage nhi kar skthye ho agar true ho tho chanje ka skthy hai 
    enumerable:true,// loop kar saakthye ho by defalut har oject ki true agsr flas hi tho nhi 
    conFigurable:false// delete ye redine kar sakthye ho ye nhi 
 })


 console.log(secureArtificates)

//  or/
// const secureArtificates={
//      name:"Ruby Pendant",
//      catlogId:"-sec"
// }

console.log(secureArtificates.catelogID)
secureArtificates.catelogID="HACKED";// sileltely fail because of define property
console.log(secureArtificates.catelogID)//

// for of loop

for(const [key,value] of Object.entries(secureArtificates)){

    console.log(`${key} : ${value}`)
}

// ab catlog ki details nikalo 
const desc=Object.getOwnPropertyDescriptor(secureArtificates,"catelogID")
console.log(desc);//ek object ki propert ki sare value retun kartha hai 


