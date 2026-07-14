const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const db = require("../models");

const { toDefaultValue } = require("sequelize/lib/utils");

const Booking = (sequelize, DataTypes) => {
  class Booking extends Model {}

  Booking.associate = (db) => {
    Booking.belongsTo(db.User, {
      foreignKey: "userId",
    });

    Booking.belongsTo(db.Event, {
      foreignKey: "eventId",
    });
  };

  Booking.init(
    {
      tickets: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "Booking",
      freezeTableName: true,
    },
  );
  return Booking;
};

module.exports = Booking;
