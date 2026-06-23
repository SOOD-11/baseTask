'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("Events",{
Id:{
type:Sequelize.INTEGER,
allowNull:false,
autoIncrement:true,
primaryKey:true

},

Name:{

type:Sequelize.STRING,
allowNull:false


},
eventDate:{


  type:Sequelize.DATE,
  
},
bannerUrl:{

type: Sequelize.STRING

},

Venue:{


  type:Sequelize.STRING
},
eventDescription:{

type:Sequelize.TEXT,
allowNull: false

},
eventType:{
  type:Sequelize.ENUM(
'COMEDY',
'SEMINAR',
'WORKSHOP',
'SPORTS',
'HACKATHON',
'CONCERT'
    ),
allowNull:false




},
createdAt:{
type: Sequelize.DATE,
allowNull: true

},
updatedAt:{
type:Sequelize.DATE,
allowNull:true

}

   });
  },

  async down (queryInterface, Sequelize) {



      await queryInterface.dropTable('Events');

  }
};
