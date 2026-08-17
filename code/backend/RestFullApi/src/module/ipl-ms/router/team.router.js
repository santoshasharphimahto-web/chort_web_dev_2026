import Router from "express";
import TeamController from "../controller/team.controller.js";

const router=Router();


router.post("/", TeamController.createTeam);
router.get("/", TeamController.getAllTeam);
router.get("/:id", TeamController.getTeamById);
router.put("/:id", TeamController.updateTeam);
router.delete("/:id", TeamController.deleteTeam);

export default router;