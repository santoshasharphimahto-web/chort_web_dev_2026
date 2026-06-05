// javascript is single threaded language ,ekk hi thread pye sara kaam hotha 
// synchronous :- code line by line execute hotha hai , ek operation complet ke badh next opernation or line shru ho thi hia 

// tham future me banyethye hai promise,network call ye promise lythe hai , aur asa kam gidko karnye me time lagtha hai 
//- usye ham promis ko deyethye hai aur bolthye ,dekh bhi gasye hi kamho gye ga tho hamye batha denye na 

// promise sye phal CallBack 

// setTimeout(()=>{}) , execute fuction when specific time expires 

// callBack sye he shru lathye hai 


function prepareOderCB(dish , cb){
 
    setTimeout(()=>
       cb(null,{dish,status:"perpared"})
    ,2000)
}
function pickUpOderCB(oder,cb){
 
   setTimeout(()=>cb(null,{...oder,status:"picked_up"}),2000) 
}
function deliverOrderCB(oder,cb){
    setTimeout(()=>cb(null,{...oder,status:"deliver"}),1000)


}



prepareOderCB("briyani",(err,order)=>{

    if(err) return console.log(err)
        pickUpOderCB(order,(err,oder)=>{
        if(err) return console.log(err)
            deliverOrderCB(oder,(err,order)=>{
        if(err) return console.log(err)
            console.log(`${order.dish} has ${oder.status},`)
             
        })
    })

})
 

// draw back of callBack hell
// - readability issue 
//-chainng issue 
//-call back hell


// Revesion of the callback into a promises mmm
//Promises :1)Pending 2) fullfiled 3) rejected
function  PrepareOder1 (dish){

return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(!dish){
          reject(new Error("no dish ois available!!!"));
          return
        }
        console.log(`${dish} is ready`)
        resolve({dish,status:"prepared"})
    },2000)

})
}

function pickUpOderCB1(oder){
  return new Promise((resolve,reject)=>{

    setTimeout(()=>{
        console.log(`${oder.dish} is ready to pickup `)
        resolve({...oder,status:"pickedUP"},)
    },2000)
  })
}
function deliverOrder2(oder){
    return new Promise( (resolve,rej)=>{
      setTimeout(()=>{
      
        console.log(`${oder.dish} is at readty to diliver`)
        resolve({...oder,staus:"delivered"})
        console.log(`${oder.dish} is at hoime`)

      },2000)

    })

}

// consumtion of promise
PrepareOder1("briyani")
.then((oder)=>pickUpOderCB1(oder))
.then((oder)=>
    {
         console.log(oder)
        deliverOrder2(oder)})

//  gabhi ap chathye ho ekparticular function complet ho aur data return karye ,aur us data pye koi aur function dependant ho tho 
//- ho us case me function with promis return banye ,aur call back ke us function ko call usdata ke saktha

// promises:- 
// 3 states hothye hai :-  pending  ,done(fufullfied,resovle),nope(not,reject,naka)
// promises ko new key word sye call kye gatha hai 
//-by default promises pending sates me ho thye hai 

// .then me resolve() ke value ko handle kye jatah hai 
//.cath me rejection() ke value ko handle kye jatha hai 
// promis ke pass ek callback function ho thai do par cb hothye hai res(),rej()


const promise= new Promise((res,rej)=>{

    setTimeout(()=>{
      res("chai aur cod3e");
      rej(new Error("NO choice other than this"));
    },2000)
})

console.log(promise)
promise.then((value)=>{
    let newdata=value.toUpperCase()
    return newdata
})
.then((data)=>{
    return data + ".com"
}).then((da)=>{
console.log(da)
})// .then kitnye bhi laga sakth but make sure ap reture karo datathabhi agla wala .then ko acces lar sktha hai 

promise.catch((value)=>{
    console.log(value)
})



// Fetch() :- networkcaliling tools :- returns a promise

// 1- it returns a refereance of the promises
// 2- create aa entire object or data refreance 
// obj={
//    status=panding|resolve|reject,
//    thenArray[fn]
//    catchArray[fn]
// }

//   fetch():- ke andhar go bhi value hogi ,usko acces karnye ke lye uska refreance ka hona graru hai

// thenArray:- array of the function , ekye andher
//- app  gitnye chawo utthnye fn rakh sakthye ,but prima=riy job is go value resolve sye 
//ayega usye fn ke data me inster ki ye gye ga
// catchARry: is ka bhi primirely job is gitna bhi data ,rejection ke through aye ga wo
//- sab ko vahtch Array me insterkiye gye ga 

// 3) os gye ga server ke pass data ko lnye 
// ex - os gyega chaiaur code ke pass ,
// 4) agar data aye then ke undee ,or eroe aye tho cathe ke under udate hogaa
// 5) stat ko change lkarye gaaa
// 6) fir fn ke under vakue dyega 

// promise ke method
// promise.all[promise]:- wait for all promis fullied if any rejected all e=will rejected
// promise.allSeteld[]:_   wait for the alpromes complet it doesn't care abot failur or sccess it wait to complet aall
// promise ,any:- wait any of the promise to fullfilled,reject when all the promise reject


//  async & awit 
// - awit tabhi hi use karsakthye ho jab function asnchronous ho 

// ex
     
const hpromise = new promise((res,rej)=>{
    setTimeout(()=>{
        res("masterjiii");
    },3000)
})

 async function nive(){
const result = await hpromise;
console.log(result)
}
nice();

// note :- await me error ko handle nhi karskathye kqu ki awit wait karth hai promise ko re
// -resolve honye ka tabhi code agye badhye ga 

// in case of the rejection 

// async function nice(){

//     try{
//         const result= awit hpromise;
//         console.log(result);

//     }catch(erroe){
//         console.log("err agye ji",err)
//     }
// }