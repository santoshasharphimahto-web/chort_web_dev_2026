import fs from "fs";
console.log("hello");
fs.readFile('sample.txt','utf-8',(err,data)=>{
    console.log("file reading is completing")

});
setImmediate(()=>console.log("hello setimmidate"))
setTimeout(()=>console.log("from settiimout"),0);
const a=2+2;
console.log("a",a)
console.log("a",a)

console.log("a",a)
