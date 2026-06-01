/** @type {import('node:http')} */
const http = require('node:http');

const server = http.createServer((req, res) => {
    // Now typing 'res.' or 'req.' should trigger suggestions
    if(req.method==="GET" && req.url==="/menu"){
        res.writeHead(100,{"content-type":"application/json"});
        res.end(JSON.stringify({item:["dal","gan","amam"]}));
    } else if(req.method==="POST" && req.url==="/oder"){
        let data="";
        req.on('data',(chunk)=>data +=chunk);
        req.on('end',()=>{
            const order=JSON.parse(data);
            res.writeHead(200,{"content-type":"application/json"})
            res.end(JSON.stringify({
                status:"received",
                order,
            }))

        })
    }
});