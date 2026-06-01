import { Router } from "express";
import { ToDo } from "./controler.js";
const route = Router();
const todocontroller = new ToDo();
route.get("/", todocontroller.getallTodo.bind(todocontroller));
route.post("/setTod", todocontroller.setTodo.bind(todocontroller));
export default route;
//# sourceMappingURL=route.js.map