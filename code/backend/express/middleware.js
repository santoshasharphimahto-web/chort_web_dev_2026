// custom midddle ware 

//request logger

// app.use(), built midddleware
import express from "express";

function block_3_server(){
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(express.json());// 
        // app.use({limit:"15kb"})// limit the user req,limted data 
        // app.use(express.urlencoded({extends:true,limit:"15kb"}))

        app.use((req,res,next)=>{
           const  logEntry = [];
           // calling db
           // file readin operatio 
           // loging everythigs 

           const logEntryData= `${req.method}:{${req.url}`
           logEntry.push(logEntryData)
           console.log(logEntry[0])
           //if request hanag for ever it means need to check a next
           next()
        })
      // wisteler fn ,time calcutaion, req proceesss honye kitna tim lag  
     
      app.use((req,res, next)=>{
        const startTime= Date.now();
        res.on('finish',()=>{
            const duration = startTime - Date.now()-startTime
            const sec=duration/1000
            console.log(`[timeTaken- ${req.url}:{req.method} to process ${sec}]`)
        })
        next()
      })
       // auth middle ware for authentication  // custm not using app.use
       // required routes implementation 

       function authMe(req,res,next){

        const token = req.headers["x-token"];
        if(!token) return res.status(401).json({error:"plse,login"})
        if(!token==="secreateChai") res.status(401).json({error:"token not match"})
       const  {id,name,role,verified}=token;
        req.user={id,name,role,verified}; //dhort hand notation 
        next();       
       }
      // role basaed accessedd 
      //- as a middeleware kucch accept kargye ga parmeter me 
      //- check kargye ke kya user hai ,agar hai tho  role kya hai match kargye give value par
    
      //- agar nhi tho agye nhi badhnye dgye 
      //- agar role match ki tho agye ga sakthhai 

      function roleBasedAcess(role){
        return(req,res,next)=>{
            if(!req.user||!["admin","teacher","student"].includes(req.user.role)) {
                return res.status(403).json({error:"unauthenticted request"})
            }
            next()

        }

      }




    //    bulding a ratelimeter 
    // - // referance rakhna hoga ki user kitne bar vist
     // - hame vale decedi karna ho ga , kitna barr acess dena hai 
     //- user kitne barr hai hamye count kara hoga 
     //- contion check, limit exceed tho nhi hu hai 
     //- agar true ,retun kardgye bhi limit samth ho gya 

    //  function  ratelimiter(maxlimit){
    //     const count =0;
    //     return (req,res,next)=>{
    //         count++;
    //         if(count>maxlimit) return res.status(401).json(
    //             {error:"maximu limit excedd ho gye hai "}
    //         )

    //         next();
           
    //     }

    //  }

        
       






        // Database
        const TrainData = {
            1: { id: 1, traiName: "lakhinder", route: "delhi" },
            2: { id: 2, traiName: "stahadiExpess", route: "raya" },
            3: { id: 3, traiName: "dhrunderExpress", route: "paragJn" },
        };
        
        // FIX: 4 se shuru kiya taaki id:3 wala data delete na ho jaye
        let netxtId = 4; 

        // Get all trains
        app.get('/train', (req, res) => {
            res.json(Object.values(TrainData));
        });

        // Get single train
        app.get('/train/:id', (req, res) => {
            const { id } = req.params;
            if (!TrainData[id]) return res.status(404).json({ error: "invalid id" });
            res.status(200).json(TrainData[id]);
        });

        // FIX: POST route ka response aur ID binding sahi ki
        app.post('/train',authMe,roleBasedAcess("admin"), (req, res) => {
            const trainInfo = req.body;
            const currentId = netxtId; // Current ID ko capture kiya
            
            // Object ke andar bhi ID insert kar di
            TrainData[currentId] = { id: currentId, ...trainInfo }; 
            netxtId++; // Baad me barhaya
            
            res.status(201).json(TrainData[currentId]); // Sahi save hua data return kiya
        });

        // Put route
        app.put('/train/:id', (req, res) => {
            const { id } = req.params;
            if (!TrainData[id]) return res.status(404).json({ error: "invalid Message" });
            TrainData[id] = { ...req.body, id: Number(id) };
            res.status(201).json(TrainData[id]);
        });  

        // Patch route
        app.patch('/train/:id', (req, res) => {
            const { id } = req.params;
            if (!TrainData[id]) return res.status(404).json({ error: "invalid Message" });
            const prvObj = TrainData[id];
            TrainData[id] = { ...prvObj, ...req.body };
            res.status(201).json(TrainData[id]);
        });  

        // Delete route
        app.delete('/train/:id', (req, res) => {
            const { id } = req.params;
            if (!TrainData[id]) return res.status(404).json({ error: "invalid Message" });
            delete TrainData[id];
            res.status(204).end(); // Delete ke liye 204 No Content behtar hai
        });  

        // Server setup aur Client tests
        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;
            try {
                // Test GET All
                const resTrain = await fetch(`${base}/train`);
                const DataTrain = await resTrain.json();
                console.log("GET All:", JSON.stringify(DataTrain));
                console.log("+++++++++++++++");

                // Test GET Single
                const resSingleTrain = await fetch(`${base}/train/1`);
                const DataSingleTrain = await resSingleTrain.json();
                console.log("GET Single:", JSON.stringify(DataSingleTrain));
                console.log("+++++++++++++++++");

                // Test POST
                const creatTrain = await fetch(`${base}/train`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json','x-token':"secreateChai",
                        'id':'2','role':'admin','name':'santosh','verified':'true'
                    },
                    body: JSON.stringify({ traiName: "gagebndar", route: "haulaa" })
                });
                const CreatedData = await creatTrain.json();
                console.log("POST Result:", JSON.stringify(CreatedData));
                console.log("+++++++++++");

                // Test PUT
                const creatTrainput = await fetch(`${base}/train/2`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ traiName: "Shatabdi Rajdhani", route: "Raya-Kolkata" })
                });
                const CreatedDataput = await creatTrainput.json();
                console.log("PUT Result:", JSON.stringify(CreatedDataput));
                console.log("+++++++++++");

                // Test PATCH
                const creatTrainPatch = await fetch(`${base}/train/3`, {
                    method: "PATCH",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ route: "Updated ParagJn" })
                });
                const CreatedDataPatch = await creatTrainPatch.json();
                console.log("PATCH Result:", JSON.stringify(CreatedDataPatch));
                console.log("+++++++++++");

                // Test DELETE
                const creatTrainddelet = await fetch(`${base}/train/2`, { method: "DELETE" });
                console.log("DELETE Status:", creatTrainddelet.status);

            } catch (error) {
                console.log("Kuch error aaya:", error);
            } finally {
                server.close(() => {
                    console.log("ho gya bhiii");
                    resolve();
                });
            }
        });
    });
}

async function main() {
    await block_3_server();
    process.exit(0);
}
main();