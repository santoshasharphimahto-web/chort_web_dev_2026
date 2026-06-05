// how to desgin a arrayy 
const carriage1=["veer","Ayush","ravi"];
console.log(carriage1);
const emptyCarrage=[];
console.log(emptyCarrage)

const threeEmptySets=Array(3)//array constructor
console.log(threeEmptySets)//array of three empty itemes
console.log(threeEmptySets.length)

const passagnger = Array("verr","ayush","Ravi")
console.log(passagnger)

const singlePassanger = Array.of(4)
console.log(singlePassanger);// the methods create  an arrry with the given item


//notes:- empty slots is not undefined or not a null in the array 

// creating a array using a different values 

const trainCode = Array.from("DUST");// this methods convertss diffrent datatypes into stand array formate 
console.log(trainCode)

//truncate of the array 
const temTrain=["a","b","c","d"]
console.log(temTrain)
temTrain.length=3;
console.log(temTrain)
temTrain.length=4;
console.log(temTrain)



//array metods :- mutating array  methos

//push()

const fruits =["apple","babnana"];
console.log(fruits)
fruits.push("ornage ");
console.log(fruits)

//pop()

const mal =["moger mal","Tiklo_mal","pakal_ama"];
console.log(mal);
const breakupmal=mal.pop()
console.log(mal)
console.log(breakupmal);


//shift()

const animals = ["dog","cat","rabbite"];
console.log(animals)
console.log(animals.shift())
console.log(animals);

//unshift() ,vip system

const fruitsw =
 ['apple',"babnana"];
 fruitsw.unshift("orange")
 console.log(fruitsw)
 

//  splice():- ading , removing , repllacing 
//#removing
const users=["user1","user2","user3","user4"];

// users.splice(1,1);
// console.log(users)


// // #adding
// users.splice(3,0,"kasdfef","cscascwcss")
// console.log(users)

// replacing    

users.splice(1,1,"grapsh")
console.log(users)

// unmutating method in the array
// (returns a new array without toucheing the original arry)

// 1) cancat()
const  array1=[1,2,3,4]
const array2= [5,6,7,8]

const merageArry=array1.concat(array2);
console.log(merageArry);
console.log(array1);

// merged a multiple array

const array3=["1","2","3"];
const array4=["4","5","6"];
const array5=["7","8","9"];

const marged2=array3.concat(array4,array3)
console.log(marged2);

// merginng by a vlaue to the array

const  arrayValue =[1,2,3]
const mergevalue=arrayValue.concat(4,5,6)
console.log(mergevalue);


// 2)slice

const animal3=["cat","dog","kangaro","pupeet","ramdogesh"];
const ani=animal3.slice(1,2)
console.log(ani)

// 3) flat

const nestarray=[2,3,[4,5,[4,9,[4,5]]]]
const flatarray= nestarray.flat();
const infinityFlatarry= nestarray.flat(Infinity);
console.log(flatarray)
console.log(infinityFlatarry)

// 4:-> flatMap

const arraFlatmap=[1,2,3,4,5]
const ans=arraFlatmap.flatMap((x)=>[x*2]);

console.log(ans)


// serching methods in array/

// 1) indexOf

const finfOfarray= [23,4,56,4]
console.log(finfOfarray.indexOf(56))

// 2) include()
const includArray=[1,45,67,655,333,2]
const valueinclude = includArray.includes(655)
console.log(valueinclude)
console.log(includArray.includes(8))

// 3)array.isArray()

console.log(Array.isArray([1,2,3]))
console.log(Array.isArray("[]"))
console.log(Array.isArray([]))
console.log(Array.isArray({}))

//  Array of an objects :-
const orders=[
    {dish:"pasta Carbonara",Price:14,Spicy:false,qty:2},
    {dish:"Dragon Ramen",Price:12,Spicy:true,qty:3},

    {dish:"Caser  Salad",Price:9,Spicy:false,qty:1},
    {dish:"Truffle",Price:18,Spicy:true,qty:1}
    
]

const mydta=orders.forEach((order,index)=>{
  
    console.log(`#${index + 1}: ${order.qty*2} X ${order.dish}`)
})

console.log(orders) // unmutable
console.log(mydta)//undefined because it retun nothing



// 2) MAP

const receiptiness = orders.map((o)=>(
    `${o.dish}: ${o.Price * o.qty}`
))

console.log(receiptiness)


// 3) filter 

const spicyoderOnly= orders.filter((o)=>o.Spicy)
console.log(spicyoderOnly)

// 4) reduce 

const totalRevnew = orders.reduce((sum,order)=>{
    return sum + order.Price * order.qty;
},0)
console.log(totalRevnew)

// groued 

const grouped = orders.reduce((acc,order)=>{
    console.log(order)
    const categories = order.Spicy?"spicy":"mild";
    acc[categories].push(order.dish);
    return acc
},{spicy:[],mild:[]})

console.log(grouped)


// gotchos:- "trickey behaviours";

// sort()

const fruitsSorts = ['bananan ',"apple","cheery"];
// const arranged=fruits.sort()
// console.log(arranged)

console.log(fruitsSorts)

const ticketNumber = [100,25,3,442,8]
const sorted =[...ticketNumber].sort((a,b)=>b-a);// sorts accet a call back for the numbers because its treats a number as a strong

console.log(sorted)


//  toSorted 

const kitchenOrders=[
     
    {dish:"pasta Carbonara",Price:14,Spicy:false,qty:2},
    {dish:"Dragon Ramen",Price:12,Spicy:true,qty:3},

    {dish:"Caser  Salad",Price:9,Spicy:false,qty:1},
    {dish:"Truffle",Price:18,Spicy:true,qty:1}
];

const mildReport = kitchenOrders
.filter((o)=>!o.Spicy)
.map((o)=>({
    dish:o.dish,
    total: o.Price*o.qty
})).sort((a,b)=>a-b)
console.log(mildReport)


