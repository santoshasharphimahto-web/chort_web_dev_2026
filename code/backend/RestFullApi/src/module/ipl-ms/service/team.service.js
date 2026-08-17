import ApiError from "../../../common/utiles/res/api-error.js";

import team from "../models/team.model.js";

const createTeam=async({name, ownerId})=>{
    const teamExist=await team.findOne({name:name});
    if(teamExist){
        throw ApiError.conflict("team already exists");
    }
    const teamavailable=await team.create({name:name,ownerId:ownerId});
    return teamavailable;
};
const getAllTeam=async()=>{
    const teams=await team.find().populate("OwnerId","name");
    return teams;
}

const getTeamById=async(id)=>{
    const teamExist=await team.findById(id);
    if(!teamExist){
        throw ApiError.notFound("team not found");
    }
    return teamExist;
}

const updateTeam=async(id,{name})=>{
    const teamExist=await team.findById(id);
    if(!teamExist){
        throw ApiError.notFound("team not found");
}
    
    const updatedTeam=await team.findByIdAndUpdate(id,{name:name},{new:true});
    return updatedTeam;
}
const deleteTeam=async(id)=>{
    const teamExist=await team.findById(id);
    if(!teamExist){
        throw ApiError.notFound("team not found");
    }
    await team.findByIdAndDelete(id);
    return null;
}
export {
    createTeam,
    getAllTeam,
    getTeamById,
    updateTeam,
    deleteTeam
}