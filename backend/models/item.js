const { Model}=require('sequelize');

const Item=(sequelize,DataTypes) =>{
class Item extends Model {} 

Item.init({
name: DataTypes.STRING

},{
 sequelize,
modelName:'Item'

});


return Item;

};

module.exports=Item;

