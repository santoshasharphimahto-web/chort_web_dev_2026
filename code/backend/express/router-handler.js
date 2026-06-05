import express from "express";

function block_3_server(){
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(express.json());
        
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
        app.post('/train', (req, res) => {
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
                    headers: { 'Content-Type': 'application/json' },
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