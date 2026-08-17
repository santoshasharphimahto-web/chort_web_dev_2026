import *as ownerService from "../service/owner.service.js";
import ApiResponse from "../../../common/utiles/res/api-respons.js";


const createOwner=async(req,res)=>{
const owner=await ownerService.createOwner(req.body);
ApiResponse.ok(res,"owner created successfully",owner)

};

const getAllOwner=async(req,res)=>{
    const owners=await ownerService.getAllOwner();
    ApiResponse.ok(res,"owners retrieved successfully",owners)
};
const getOwnerById=async(req,res)=>{
    const owner=await ownerService.getOwnerById(req.params.id);
    ApiResponse.ok(res,"owner retrieved successfully",owner)
};
const updateOwner=async(req,res)=>{
    const owner=await ownerService.updateOwner(req.params.id,req.body);
    ApiResponse.ok(res,"owner updated successfully",owner)
};
const deleteOwner=async(req,res)=>{
    const owner=await ownerService.deleteOwner(req.params.id);

    res.status(204).json({message:"owner deleted successfully",data:owner})
};

export {
    createOwner,
    getAllOwner,
    getOwnerById,

    updateOwner,
    deleteOwner
}