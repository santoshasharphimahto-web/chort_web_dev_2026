import ApiError from "../../../common/utiles/res/api-error.js";

import team from "../models/team.model.js";
import sponser from "../models/owner.model.js";
import teamSponser from "../models/team-sponser.model.js";


const attchSponserToTeam=async(teamId,sponserId)=>{
    const teamExist=await team.findById(teamId);
    if(!teamExist){
        throw ApiError.notFound("team not found");
    }
    const sponserExist=await sponser.findById(sponserId);
    if(!sponserExist){
        throw ApiError.notFound("sponser not found");
    }
    const newTeamSponser=await teamSponser.create({
        teamId,
        sponserId
    });
    return newTeamSponser;
}