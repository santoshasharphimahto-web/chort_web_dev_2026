import ApiError from "../../../common/utiles/res/api-error.js";
import Owner from "../models/owner.model.js";

const createOwner=async({name,company})=>{
  const owner=await Owner.create({name,company})
  return owner;
}
const getAllOwner=async()=>{
  const owners=await Owner.find();
  return owners;
};

const getOwnerById=async(id)=>{
    const owner=await Owner.findById(id);
    if(!owner){
        throw ApiError.noFound("owner not found")
    }
    return owner;
};
const updateOwner=async(id,updateData)=>{
    const owner=await Owner.findByIdAndUpdate(id,updateData,{new:true,runValidators:true});
    if(!owner){
        throw ApiError.noFound("owner not found")
    }
    return owner;
};
const deleteOwner=async(id)=>{
    const owner=await Owner.findByIdAndDelete(id);
    if(!owner){
        throw ApiError.noFound("owner not found")
    }
    return owner;
};

export {
    createOwner,
    getAllOwner,
    getOwnerById,
    updateOwner,
    deleteOwner
}