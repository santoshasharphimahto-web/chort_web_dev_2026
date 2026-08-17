import Router from "express";
import *as controller from "../controller/owner.controller.js";
const router=Router();

// create a new owner
router.post("/", controller.createOwner);


// get all owner
router.get("/", controller.getAllOwner);

// get a single owner by id
router.get("/:id", controller.getOwnerById);

// update a owner by id
router.put("/:id", controller.updateOwner);
// delete a owner by id
router.delete("/:id", controller.deleteOwner);

export default router;