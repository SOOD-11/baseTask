const express=require("express");
const verifyJwt = require("../middlewares/Authentication.middleware");
const { UserSignIn, UserLogin, getUserDetails, RefreshTokens } = require("../controllers/user.controller");
const userRoute=express.Router();



userRoute.post('/signIn',UserSignIn);
userRoute.post('/login',UserLogin);
userRoute.get('/me',verifyJwt,getUserDetails);
userRoute.post('/refresh-token',RefreshTokens);


module.exports=userRoute;