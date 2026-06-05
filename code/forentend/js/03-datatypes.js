// const { contentType } = require("express/lib/response");

const wapeanName="falgement shoterr";
console.log("wapeanName:",wapeanName,"|type:",typeof wapeanName)

const attackPoer=75;
console.log("attackPoer:",attackPoer,"|type: ", typeof attackPoer)

const attackNumber = 75.2;
console.log("attackNumber:",attackNumber,"|type:" ,typeof attackNumber)

// Nameing Variabes:

let shipSeep=22; // camplecase for readability
let _privateLog="secreayte " // private variable starte with te underscroe

let MONOGODB_URO=""   //  ENVIROMENTAL VARIABLE 


const isloggedIn = true
console.log("isloggedin:" , isloggedIn,"|type",typeof isloggedIn)

let bonousEEffect = undefined;
console.log("bonousEEfect:", bonousEEffect,"|type", typeof bonousEEffect)

let caresStatus= null;
console.log("carestatuse:",caresStatus,"|types",typeof caresStatus);

let wetherapp= null
console.log( wetherapp);

// let weatherAPiResponse=null;
// console.log(weatherAPiResponse);


const uinqueRuneId = Symbol("rune-of_fire")
console.log("Rune:",uinqueRuneId.toString(),"|type:",typeof uinqueRuneId)


//non primitibe data tyes

const obj={
    id:1,

    name:"santosh",
    roll:"01234",
    staus:"moniter"
}

console.log("objtye:",obj,"|type:",typeof obj);


// array 

const inventry = ["flamebort","tommey","jerfy"];
console.log("invertr:",inventry,"|type:",typeof inventry);


function speelType(){

    return "fireball";
}
console.log("spellTye:",typeof speelType)


// primitive :-copy by the value 
// refreance  :- copy by  the refreance 


console.log(typeof "chai aur code ")

console.log(typeof 42);
console.log(typeof 42n);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof  null);
console.log(typeof Symbol() );
console.log(typeof {});
console.log(typeof []);
console.log(typeof function(){})





const originalObj={
    
    id:2,
    name:"jangu",
    status:"active",
    relatioShipStaus:"wo kya ho tha hai"
}

const copyObj=originalObj;
console.log("copyObj:",copyObj);

copyObj.relatioShipStaus="breakup"
console.log("originaObj:",originalObj);
console.log("copyObj:",copyObj);


// copy of the refreance DataTyes

 const originalMal = {
    id:1,
    name:"anshi",
    beatylevelTop:"kashowho",
    behabior:{
        beaty:"kala maal",
        leve:2
    }
 }

//  const copyMal={...originalMal};
//  console.log(copyMal);
//   copyMal.name="anshu";

//   copyMal.behabior.leve=3;
//   console.log(copyMal);
//   console.log(originalMal);
  

//   soution stuructured clone 
 
const copyMal=structuredClone(originalMal);
console.log(copyMal);
copyMal.behabior.leve=3
console.log(copyMal)
console.log(originalMal)