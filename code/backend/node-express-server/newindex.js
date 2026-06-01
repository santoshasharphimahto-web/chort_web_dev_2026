const express=require("express")

const app=express()
app.use(express.json())
app.get("/menu",(req,res)=>{
    res.json({iteam:["kasye","kela"]})

})
app.post("/oder",(req,res)=>{
    res.status(200).json({
        status:"recived",
        order:req.body
    })
})