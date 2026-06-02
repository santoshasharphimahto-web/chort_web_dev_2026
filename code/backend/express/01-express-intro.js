
import express from "express";
import { json } from "body-parser";

function block_1_server(){
    return new Promise((resolve, reject) => {
        const app=express()
        app.use(express.json());
        app.get("/menu",(req,res)=>{
            res.json({
                item:["briyani","chaipathi"],
            })
        })
        // query routes | query parameter/parms
        app.get("/menuOrder",(req,res)=>{
            const{q,limit}=req.query
            res.json({
                q:"briyani",
                limit:limit||"10"
            })
        })
        //router parmes
        app.get('/menue/:id',(req,res)=>{
            const {id}=req.params
            res.json({
                id:id,
                price:124

            })

        })
    //  sending body with the client 
       app.post('/oder',(req,res)=>{
        const oder=req.body
        res.status(201).json({
          item:"received",
          order,  
        })
       })

    // creating a server
    const server =app.listen(0,async()=>{
        const port=server.address().port;
        const base=`http://127.0.0.1:${port}`;
        try{

            const menuRes=await fetch(`${base}/menu`)
            const menData=await menuRes.json(menuRes)
            console.log("get/menu",JSON.stringify(menData))
           console.log("++++++++++++++++");
           const serchRes=await fetch(`${base}/menuOrder?q=kasye&limit=10`)
           const serchData= serchRes.json(serchRes)
            console.log("get/menuOder",JSON.stringify(serchData))
            console.log("+++++++++++")
            const parmsRes=await fetch(`${base}/menu/42`)
           const parmsData= parmsRes.json(parmsRes)
            console.log("get/parmes",JSON.stringify(parmsData))
            console.log("+++++++++++")

            const oderRes= await fetch(`${base}/oder`,{
            
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    body:JSON.stringify({
                        dish:"briyani",
                        qnty:2,
                    })
                }
            })



        }catch(error){
            console.log(error)
        }
    })



    })
}

async function main() {
    await block_1_server()
    process.exit(0)
}