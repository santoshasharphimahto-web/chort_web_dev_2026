import express from "express";

function block_2_server(){
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(express.json());

        // 1. Send Text Route
        app.get('/text', (req, res) => {
            res.send("kasye ho bhiii");
        });

        // FIX: (res, req) ko badalkar standard (req, res) kiya
        app.get('/json', (req, res) => {
            res.json([1, 2, 3]);
        });

        // FIX: Status 505 se badalkar standard 404 (Not Found) kiya
        app.get('/no-route', (req, res) => {
            res.status(404).json({ error: "no routes find" });
        });

        // Health route (SendStatus 200 OK bhejta hai aur body me 'OK' likh deta hai)
        app.get('/health', (req, res) => {
            res.sendStatus(200);
        });

        // Bad Gateway ya Server Error route (Aapka puraana 502 logic)
        app.get('/no-rout', (req, res) => {
            res.status(502).end();
        });

        // FIX: XML Response me thoda content daal diya taaki check ho sake
        app.get('/xml', (req, res) => {
            res.type('xml').send('<message>kasye ho bhiii</message>');
        });

        // FIX: Callback arrow function me (req, res) missing tha, use add kiya
        app.get('/custimazie', (req, res) => {
            res.set("x-found", "chai aur code"); // Custom Header
            res.json({ message: "cutomized headers" });
        });

        // Server Start aur Client Requests Execution
        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;
            
            try {
                // Test 1: GET Text (FIX: .json() ki jagah .text() use kiya)
                const resTest = await fetch(`${base}/text`);
                const testData = await resTest.text(); 
                console.log("Text Response:", testData);
                console.log("++++++++++++++++");

                // Test 2: GET JSON
                const resJson = await fetch(`${base}/json`);
                const testJson = await resJson.json();
                console.log("JSON Response:", JSON.stringify(testJson));
                console.log("++++++++++++++++");

                // Test 3: GET Custom Headers (Header access karke check karte hain)
                const resCustom = await fetch(`${base}/custimazie`);
                const customData = await resCustom.json();
                console.log("Custom Header Data:", JSON.stringify(customData));
                console.log("Custom Header 'x-found':", resCustom.headers.get("x-found"));
                console.log("++++++++++++++++");

                // Test 4: GET XML
                const resXml = await fetch(`${base}/xml`);
                const xmlData = await resXml.text();
                console.log("XML Content-Type:", resXml.headers.get("content-type"));
                console.log("XML Data:", xmlData);
                console.log("++++++++++++++++");

                // Test 5: GET Health Status
                const resHealth = await fetch(`${base}/health`);
                console.log("Health Status Code:", resHealth.status); // 200

            } catch (error) {
                console.error("Testing me koi galti hui:", error);
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
    await block_2_server();
    process.exit(0);
}
main();