import ApiResponse from "../../../common/utiles/res/api-respons.js";
import *as teamService from "../service/team.service.js";
const createTeam=async(req,res)=>{
    const team=await teamService.createTeam(req.body);
    ApiResponse.ok(res,"team created successfully",team)
}
const getAllTeam=async(req,res)=>{
    const teams=await teamService.getAllTeam();
    ApiResponse.ok(res,"teams fetched successfully",teams)
};
const getTeamById=async(req,res)=>{
    const team=await teamService.getTeamById(req.params.id);
    ApiResponse.ok(res,"team fetched successfully",team)
};
const updateTeam=async(req,res)=>{
    const team=await teamService.updateTeam(req.params.id,req.body);
    ApiResponse.ok(res,"team updated successfully",team)
};
const deleteTeam=async(req,res)=>{
    await teamService.deleteTeam(req.params.id);
    res.status(204).send();
};
export default {
    createTeam,
    getAllTeam,
    getTeamById,
    updateTeam,
    deleteTeam
}
