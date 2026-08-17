import ApiError from "../../../common/utiles/res/api-error.js";
import team from "../models/team.model.js";
import player from "../models/player.model.js";


// transfer player from one team to another
const transferplayer=async(playerId, newTeamId)=>{
    const playerExist=await player.findById(playerId);
    if(!playerExist){
        throw ApiError.notFound("player not found");
    }
    const newTeam=await team.findById(newTeamId);
    if(!newTeam){
        throw ApiError.notFound("new team not found");
    }
    const updatedPlayer=await player.findByIdAndUpdate(
        playerId,
        {teamId:newTeamId},
        {new:true}
    ).populate("teamId","name");
    return updatedPlayer;
}


    const teamExist=await team.findById(teamId);
    if(!teamExist){
        throw ApiError.notFound("team not found");
    }


// getplayer by teamId
const getPlayersByTeamId=async(teamId)=>{
    const players=await player.find({teamId:teamId});
    return players;
}


// update player by role
const updatePlayerRole=async(playerId, newRole)=>{
    const playerExist=await player.findById(playerId);
    if(!playerExist){
        throw ApiError.notFound("player not found");
    }
    const updatedPlayer=await player.findByIdAndUpdate(
        playerId,
        {role:newRole},
        {new:true}
    );
    return updatedPlayer;
}

export {
    transferplayer,
    getPlayersByTeamId,
    updatePlayerRole
}