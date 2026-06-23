const {v2}= require('cloudinary');
const fs=require("fs");


v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret :process.env.CLOUDINARY_API_SECRET
}
);

const cloudinaryUpdater= async (localpath)=>{
try {
    if(!localpath){
    
        return null;
    }
    const response=await  v2.uploader.upload(localpath,{resource_type:"auto"});

    console.log("file uploaded succsesfully",response);
    return response;
} catch (error) {
    await fs.unlink(localpath,cb);
    console.log("file not uploaded succsesfully",error);
    
}





};

module.exports=cloudinaryUpdater;