console.log(brewPortion("Healing herbs",3))
function brewPortion(ingredient,dose){
    return `breing portion with ${ingredient},(x${dose}..portio ready)`
}


// function expression

const micxtilica =  function axulia(ingridents , dose){
return `${ingridents} : ${dose} are all implement`
}

const mixcutia = (ingridents,dose)=>{
return `${ingridents} : ${dose} are all implement`
    
}

console.log(micxtilica("cdcd",3) )
console.log(mixcutia("dambrq",3))

//both are the same ,but arrow function doe ni=ot have a this and objects of agruments 


function oldBrewingLogs(){
    console.log("type: ", typeof arguments);
    console.log("IsArray: ",Array.isArray(arguments));
    console.log(arguments)
}
oldBrewingLogs("sage","rosemaery")

// convert into a Array
const argsArray= Array.from(arguments);
// console.log(argsArray)

// IIFE:- Immediately Invoke function Expression :_ ek asa function go turanth execuite kad dye 
// syntax (function(){})()



// higher odernfn :- passfunction as arguments(callback) or retun a function 

// // ex
// function anotherFunctionforCalss(brewAndCount){
//     return function newBrew(){
//         //code 
//     }
// }
//  or, callback
// function count(cb){
// //code 
// }
// count(function(){

// })

// iife example 
const potishop =(function(){
    let invetory=0;
    return{
        brew(){
            invetory++;
            return `Brew portion # ${invetory}`
        },
        getStock(){
            return invetory;
        }
    }
})()
console.log(potishop)
console.log(potishop.brew())
console.log(potishop.getStock()) 

// closure ,it is a combination of th fun bundel together with refreane to its surrunding state ,(memory ka refreance sth me lekar gathye hai tiffin box sath me leksr gaythye hai  )
function makfun(){
    const name ="Mozila";
    function display(){
        console.log(name);
    }
    return display;
}
const myfun=makfun();
myfun();

