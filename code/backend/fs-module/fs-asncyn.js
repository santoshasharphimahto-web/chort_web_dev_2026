import fs from "node:fs";
// #understanding a  fs-asyanc style of fs 
// write file 
fs.writeFile('test_1.txt',"i am from async",(err)=>{
    if(err){
        console.log(err);
    }
    console.log("file writte successfUll ");

})

// reading fie asychronusly 
fs.readFile('test_1.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log('Data',data)
})

// unlinking file async

fs.unlink('copy.txt',(err,data)=>{
    if(err){
        console.log(err)
    }
    console.log('file deletio completed ');
})

//  already async availail ,why promes - to prvent calll backs hellll

fs.readFile('test_1.txt','utf-8',(err,data)=>{
  if(err){
    console.log(err);
  }
  fs.writeFile("b.txt",data,(err)=>{
    if(err){
        console.log(err);
    }
    fs.appendFile('b.txt',' fasgye clla backe haell',(err)=>{
        if(err){
            console.log(err)
        }
        fs.unlink('test_1.txt',(err)=>{
       if(err){
        console.log(err)
       }
       console.log("finally file hath gye hai bhiii!!!")
        })
        
    })
  })
})

