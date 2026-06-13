const db= require("../models");
const  {Op}= require('sequelize');


// get api items
 const getAllitems= async(req,res)=>{

try {
    const items= await db.Item.findAll();
    
    res.json(items);
    
} catch (error) {
console.log(db);
    res.status(500).json({error: error.message});
    
}




 }

 const getItemsByName= async(req,res)=>{
try {
    const {name}=req.query;
    const items=await db.Item.findAll({
    
        where: {

            name:{ [Op.like]:  `%${name}%`}
        }
    
    });
    res.json(items);
} catch (error) {

    res.status(500).json({error: error.message});
    
}



 };

 const getItemByDate =async(req,res) =>{

try {
    const {date}=req.query;
    const startDate=new Date(date);
    const endDate=new Date(date);
    endDate.setDate(endDate.getDate()+1);
    const items=await db.Item.findAll({
        where:{
            createdAt: {
     [Op.gte]: startDate,
     [Op.lt]:  endDate
            }
        }
    
    
    
    });
    
    res.json(items);
     
} catch (error) {

    res.status(500).json({error: error.message});
    
}




 }









 
module.exports={getAllitems,getItemByDate,getItemsByName};