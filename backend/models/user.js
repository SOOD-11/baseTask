const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

const booking=require('../models/booking');

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const User=(sequelize,DataTypes)=>{

class User extends Model{



async isPasswordCorrect(password){
    return  await bcrypt.compare(password,this.password);
}

generateAccessToken(){
return jwt.sign({
id: this.id,
role: this.role


},
    process.env.ACCESS_TOKEN_SECRET,
    {

expiresIn: process.env.ACCESS_TOKEN_EXPIRY

    }
);


}


generateRefreshToken(){
return jwt.sign({
id: this.id,
email: this.email,
username: this.username,
role: this.role


},
    process.env.REFRESH_TOKEN_SECRET,
  
    {
expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
);


}
}


User.associate = (db) => {
    User.hasMany(db.Booking, {
        foreignKey: "userId",
        onDelete: "CASCADE"
    });
};
User.init({


email:DataTypes.STRING,
username:DataTypes.STRING,
password:DataTypes.STRING,
role:DataTypes.ENUM("HOST","ATTENDEE"),
refreshToken:DataTypes.STRING,
 

},
{
sequelize,
modelName: "User",

hooks:{

async beforeCreate(userA){

    userA.password= await bcrypt.hash(userA.password,12);
},

async beforeUpdate(userB){
    if(userB.changed("password")){

userB.password= await userB.password(userB.password,12);
    }


}
}
});


return User;

}

module.exports=User;