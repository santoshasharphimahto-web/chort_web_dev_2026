import express from "express";
import todoroute from "./todo/route.js";
export function creatServerapp() {
    const app = express();
    app.use(express.json());
    app.use("/todo", todoroute);
    return app;
}
//# sourceMappingURL=index1.js.map