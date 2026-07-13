const ApiError = require("../utilities/ApiError");
const asyncHandler = require("../utilities/asyncHandler");

const authorizeRoles=(...roles)=>asyncHandler((req,res,next)=>{

if(!req.user.role){


    throw new ApiError(401,"No roles assigned");
}

if(!roles.includes(req.user.role)){


throw new ApiError(402," acceess denied to this user");

}

next();

}

);


module.exports=authorizeRoles;