const { DataTypes, Model } = require("sequelize");


const  Event =(sequelize,DataTypes)=>{
    class Event extends Model {}

// what should an event have 
// event name 
// event genere
//banner - image link 
// event date
//event venue 
    Event.init(
        
        {



Name:DataTypes.STRING,
  

    eventType:DataTypes.ENUM(
'COMEDY',
'SEMINAR',
'WORKSHOP',
'SPORTS',
'HACKATHON',
'CONCERT'
    ),


bannerUrl:DataTypes.STRING,


eventDate:DataTypes.DATE


,
    Venue: DataTypes.STRING
,
eventDescription:DataTypes.TEXT

},{
sequelize,
modelName:"Event"

})


return Event ;


}
module.exports=Event;