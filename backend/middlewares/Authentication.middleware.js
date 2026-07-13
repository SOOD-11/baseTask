const express=require("express");
const JWT=require("jsonwebtoken");
const asyncHandler = require("../utilities/asyncHandler");
const ApiError = require("../utilities/ApiError");
const db = require("../models");

 const verifyJwt=asyncHandler(async(req,res,next)=>{


    const token=req.cookies.AccessToken ;
    console.log("decoding the token from verify jwt",token);

    if(!token){

        throw new ApiError(401,"Access denied");
    }
const decodeToken=JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
const authorisedUser= await  db.User.findByPk(decodeToken?.id);

if(authorisedUser){
req.user=authorisedUser;


}
else{

    throw new ApiError(401,"Unauthorised Access");
}


next();





 });


 module.exports=verifyJwt;