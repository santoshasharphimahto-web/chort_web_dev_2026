console.log(this)// -node enviorment empt object
// on browser window objects

// ex
function ranveerOnGlobalStage(){
    return typeof this

}

const arrow= (arr)=>{
    return this;

}
console.log("arrow:",arrow())// this ka acces nhi hotha hai arrow ke pass 
console.log(ranveerOnGlobalStage()) // typeof "this" is object 

// this() keywords refers to the current contex ,wher a pice of code suppose to run,function or obuject

// Interview question 
// in function this ka value no strict and stric 
function ranverrwithNoScript(){
  "use strict";
    return this ;
}
console.log(ranverrwithNoScript())// undefiend because it dosen't allowed a binding the the golobal object of the node 



// in object 

const bollywoodFlim ={

    name :"Bajirsao mastaini",
    lead:"Renveer",
    introduce(){
        return `${this.name} perorms ${this.lead}`
    }
};

console.log(bollywoodFlim.introduce())

// note:- defult stricmode he  nhi chltha hia 

const flimSet ={
    crew:"sport boys",
    prepareProps(){
        console.log(`outre this.crew: ${this.crew}`);

        function arrangeChairs(){
            console.log(`Inner this.crew:${this.crew}`);// regural nested function can not inherit this fro the parents 
        }
        arrangeChairs();
    

     const  arrangeLights = ()=>{
        console.log(`arrow this.crew:${this.crew}`);// functio inside a srrow function can inherit a this from the parants 
      }
      arrangeLights();

    },
}

flimSet.prepareProps();
// analaysis the code
// -crew ke string hai gis ka value sposrts boys hai 
// -prepareProps ek fuction hai gike kye pass this ka access hai 


// or this current object ko point kar rhe hai 
//prepare pores ke ander go function hai uskye pass this ka assces nhi ho ga 
// -kuki reglaar nested fuction doesn't inherrit this ,islye undefinne hoga 

// notes arrow function ke this ka acces nhi hoth par kucch case me this ka asscess ho tha javascript ki  specila behacvio haiu bhii 
// ex:-
 
const obj={

    nam:"santosh",
    status:"active",
    mode:"chill",
    arr:()=>{
        return `${this.nam}:is a good progrmae `
    }
}
console.log(obj);
console.log(obj.arr())

// Interview function 

const flimDirector={

    name:"sanjay Leelea Bhansali",
    cast:["Ranverr","deepak","priyank"],
    
    announceCast(){
        this.cast.forEach((e)=>{
           console.log(`${this.name} has introduce  a cast${e}`);
        })
    }


}

flimDirector.announceCast()
//analysis of the code 
// -flim dirator ek onbject hoai 
//- name ek string  hai , ppobject ki property hai 
//- cast ek array hai,obj ka  property hai 
//-announce ek regural function hai ,aur es kye ass this ka acces ho  tha hai 
//-this .cast sye cate property ko acces kaeye hai 
//-this.cast .forecah loop kaeye ga arrya pye lop karye gga 
//this.name arroew function kye ander hai kya es kye [ass this ka acces nhi hona chye tha , ye sa kuchhh nhi ho tha hai 

// detached Methods :- extracting the object methods from ther context and stoing int a other varible  

// ex:-
const actor ={
    name:"Ranveer",
    bow(){
       return `${this.name} takes a bow` 
    },

}

const detachedMethosds=actor.bow// funct\ refrenace
console.log(detachedMethosds());// detached method ke pass this ka refreance nhi ho tha hai 

// notes yad rakhnye ki cheeze 
// i) this kha par run ho rha ho rha agear node par tho node ka globle object ,agar broser me run hu aa th window object
//i) this ka typeof :- object 
//iii) "Use Strict" me this undefine dyega 

// iv) arrow function ke pass this nhi ho tha hai 
// v)  function ke ander regural function ke passs thisr refreance nhi  ho thahai ,
// vI) function ke ander arrow function ke this ka acces ho tha hai ,
// vii) dethaed method ke pass this ka refrance nhi ho th hai 


// 2) call,bind(),apply()

// I) call and apply :- basic chef (kitechen ka shara saman dena padye ga ako) immedeatly cook  karye ga 

// 2) bind =< alsway retaurn a  new function (es kye team sye kooi ek bandh aye ga)

// ex,
  function cookDish(ingredient,style){
    return `${this.name} prepare ${ingredient} in ${style} style!`;

  }
  const sharmaKitechen = {name:"sharma ji ka kitechen "}
  const gupthaKitecheen={name:"gutha ji ka kitchen "}
  console.log(cookDish.call(sharmaKitechen,"paner and sppices","Muglai"))

//   note:- call() subke liye use Karo parr,array ke lye apply use karo hamesa 
 const gupthaOder=["choleKulchye","dabaStyle"];
 console.log(cookDish.apply(gupthaKitecheen,gupthaOder) )


 function reportDelivery(location , status){
  return `${this.name} at ${location} :${status}`;

 }

 const deliveryBoy ={name:"Ranveer"};
console.log(reportDelivery.call(deliveryBoy,"layara","oderded"));
console.log(reportDelivery.apply(deliveryBoy,["Mars","pickup"]))
// console.log(reportDelivery.bind(deliveryBoy,"haridwar","what"));// bind doesn't work this way it gives [function:reportdiliver specefird with the refreance]

// const bindReport = reportDelivery.bind(deliveryBoy,"haridaer","what")
// console.log(bindReport());
//both are same 
 const bindReport= reportDelivery.bind(deliveryBoy);
 console.log(bindReport("haridwar","whata"))

// new key Words 
// //fuction constructor are used to crete and inititialize a object withe specific properties and methods 
// new():-  the new keywored is used to create a instance of object ,that has a construtor

function Tata( chassisNumber,modelName){
    this.chassisNumber=chassisNumber;
    this.modelName= modelName;
    this.fuel=100;

}

Tata.prototype.status=function(){

    return `Tata ${this.chassisNumber} #${this.modelName} | ${this.fuel}`
}

const Car1=new Tata("MH-101","Nexon");
console.log(Car1)
const car2 = new Tata("DL-290","Harrier");
console.log(car2)

console.log(Car1.modelName);
console.log(car2.modelName);
console.log(car2.status());
console.log(Car1.status());

//   Notes 
// 1) new key word sye empty object create hoga 
//2) emty obj ka prototype and tata ka prototype linke ho ga ,thabhi tho this use point karye ga object ko

// 3) this ka value decide hoga ,this ko go call karha ho ga usye bind karlye gi,
// 4) implelectly counstruct retuen kar de ga object ko 


//this is not same as above 

function autoRiskha(id,route){
return{
    id,
    route,
    run(){
        return `Auto ${this.id} is runing on route ${this.route}`;
    }
}
}

const auto1=autoRiskha("uh-445","upke bha");//

const auto2=autoRiskha("UK-j77","madhyepardesh")
console.log(auto1);// ecah instance is geting a copy
console.log(auto2);
console.log(auto1.run());
console.log(auto2.run());


// Prototype
// Object.Creat :-  this method is used to create a obejet ,with specify prototype object and  additional properties  

//you can add ye set a property 

const Prithviraj={
    name:"Prihviraj",
    generation:"grandFather",
    cookTradionalDish(){
        return `${this.name} cooks an ancient family recipe`
    }
}
const raj = Object.create(Prithviraj);
console.log(raj)
raj.name="raj";
raj.generation="father";
raj.business=function(){
    return `${this.name} run the familyBunesss`
}
console.log(raj)
console.log(raj.cookTradionalDish())
console.log(raj.name)


const ranber = Object.create(raj);
ranber.name="ranbier";
ranber.generation="son";
ranber.makeFlim=function(){
    return `${this.name} make a blockBuster flim`;
}
console.log(ranber)
console.log(ranber.makeFlim())
console.log(ranber.cookTradionalDish())
console.log(ranber.business())

Array.prototype.last=function(){
    return this[this.length-1];
}
console.log([1,2,3].last())