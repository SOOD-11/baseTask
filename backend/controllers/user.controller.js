//----user api----- //
//---signup--//
//--login--//
//---getUserdetails---//
const express = require('express');
const db = require("../models");
const jwt=require("jsonwebtoken");
const ApiError = require('../utilities/ApiError');
const asyncHandler = require('../utilities/asyncHandler');
const validationResult=require("express-validator");


const options={
httpOnly: true,
secure:true,
sameSite:'none'
};

const generateAccessandRefreshToken=async(id)=>{
    const user= await db.User.findByPk(id);

    const accessToken=  user.generateAccessToken();
    const refreshToken=  user.generateRefreshToken();
    console.log("AccessToken",accessToken);
    console.log("RefreshToken",refreshToken);

user.refreshToken=refreshToken;
   await  user.save({validate:false});

return {accessToken,refreshToken};
}
const UserSignIn = asyncHandler(async (req, res, next) => {

    const { email, password, username, role } = req.body;

 //   const errors = validationResult(req);

 //   if (!errors.isEmpty()) {
       // throw new ApiError(400, { errors: errors.arrays() });
  //  }
    if (
        [username, password, email, role].some((superman) => {
            return superman.trim() === "";
        })){
            throw new ApiError(404,"missing user details");
        }
        const checkUserExist=await db.User.findOne({
            where: {
                email
            }
        }
        );

    if(checkUserExist){
throw new ApiError(409,"user already exists");
    }


        const user =await  db.User.create({
            username,
            password,
            role,
            email


        });



    return res.status(200).json({user});




});


const UserLogin=asyncHandler(async(req,res,next)=>{

/*const errors=validationResult(req);
if(!errors.isEmpty()){



res.status(400).json({errors: errors.Arrays});
}
*/
const {email,password}=req.body;


const loggedInUser=await db.User.findOne({

    where:{
        email

    }
}
);

if(!loggedInUser){



    throw new ApiError("404","No Such User Exists");
}

const Authenticate=loggedInUser.isPasswordCorrect(password);


if(!Authenticate){

    throw new ApiError(423,"email or password is incorrect");
}
const {accessToken,refreshToken}=await generateAccessandRefreshToken(loggedInUser?.id);

res.status(201).
cookie("AccessToken",accessToken,options).
cookie("RefreshToken",refreshToken,options).
json({message:"user logged in successfully",loggedInUser});

});

const getUserDetails=asyncHandler(async(req,res,next)=>{




const user=await db.User.findByPk(req.user.id);

const safeUser=user.toJSON();

delete safeUser.password;
delete safeUser.refreshToken;



if(!user){
throw new ApiError(401,"unable to fetch user details");
}

return res.status(200).json({safeUser});


});


const RefreshTokens=asyncHandler(async(req,res,next)=>{

const incomingRefreshToken= req.cookies?.RefreshToken ;
if(!incomingRefreshToken){

    throw new ApiError(404,"No tokens found");
}
const decodedToken=await jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);

if(!decodedToken){

throw new ApiError(400, "token expired ");

}
const user=await db.User.findByPk(decodedToken?.id);

if(incomingRefreshToken!== user.refreshToken){


throw new ApiError(400,"refresh token expired");

}

const {accessToken,refreshToken}= await generateAccessandRefreshToken(user.id);

return res.status(201).cookie("AccessToken",accessToken,options).cookie("RefreshToken",refreshToken,options).json({message:"tokens Refreshed Successfully"});

});

module.exports={UserSignIn,UserLogin,getUserDetails,RefreshTokens};