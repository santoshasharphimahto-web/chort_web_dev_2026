
// you know exact number of repetaion of the code 
for(let i=1;i<=5;i++){
    console.log(i)
}
// while , use when number of loop in not conformed only decsion on codition 

let count =10
while(count >= 0){
  console.log(count);
  count--;

}
console.log("blast Boom!!!")

// do..while() , on time block of code will regaless of cndition is true or false 

do{
   var bomsetertime =  5
    
}while(bomsetertime>=0){

    console.log(bomsetertime)
    bomsetertime--;

}
console.log("blast")

// for..in  is object pe usr kar array pye avoid karo ,it is used to iretate over properite(key)of an object ,

// // syntax for ( let key in bject )
// {
    // code part 
// }


// ex:-
const project= {
    title:"page",
    color:"white",
}

for(let key in project){

    console.log(key + ":"+ project[key]); // dynamic property accessin in object 
}


// sada bhar sabpye chaltha hai []

const tools =["hammer",'scredriver',"Wrench"]

for(const tool of tools){
    console.log(tool)
}