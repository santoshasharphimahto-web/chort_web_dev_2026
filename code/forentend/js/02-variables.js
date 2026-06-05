 var shipName =  "The Amber";
 console.log("shipName:",shipName);

 let crewCount =12;
 console.log("crewCount:",crewCount)

 crewCount=20;// if you to changethe value i the future  
 console.log("crewCount:",crewCount)

 const captainName= "amberJackecaptaion";
 console.log("captainName:",captainName);
//  captainName = "dabuguliaa"; you can not the value of variable const onece it assine in the  programme

// Manuplating to the const 

const treasureTest={

    goodi:50,
    gold:10,
    name:"sharwatiPasges",
}


console.log(treasureTest);
treasureTest.gold=19;// you can manupalte in the content or propert inner side manupaltion 
console.log(treasureTest);

// treasureTest={
//     goodi:4
// }   can not change a complet refreance of the object 
// console.log(treasureTest)

// similary behaver in array in js 
 
const crewRouster = ["abahy","piyused","mohit","derbendra"]
crewRouster.push("santosh")
console.log(crewRouster)
console.log(crewRouster[0])
crewRouster[0]="parmadhanyam";
console.log(crewRouster)

crewRouster=["skf"];