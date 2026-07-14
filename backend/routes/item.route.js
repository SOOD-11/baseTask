const express = require("express");
const itemsRouter = express.Router();
const {
  getItemByDate,
  getAllitems,
  getItemsByName,
} = require("../controllers/items.controller");

itemsRouter.get("/", getAllitems);
itemsRouter.get("/search", getItemsByName);
itemsRouter.get("/by-date", getItemByDate);

module.exports = itemsRouter;
