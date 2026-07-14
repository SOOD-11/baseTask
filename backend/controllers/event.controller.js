const express = require("express");
const db = require("../models");
const asyncHandler = require("../utilities/asyncHandler");
const ApiError = require("../utilities/ApiError");
const cloudinaryUpdater = require("../utilities/cloudinary");
const { validationResult } = require("express-validator");

// need to  create the controller that will control
const createEvent = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, eventType, eventDate, Venue, Description } = req.body;

  if (
    [name, eventType, eventDate, Venue, Description].some((superman) => {
      return !superman || String(superman)?.trim() === "";
    })
  ) {
    throw new ApiError(400, "fill all the event details");
  }

  const bannerFile = req.files?.banner?.[0]?.path;
  const bannerUrl = await cloudinaryUpdater(bannerFile);
  if (!bannerUrl) {
    throw new ApiError(404, "not uploaded ");
  }
  const event = await db.Event.create({
    Name: name,
    eventType,
    eventDescription: Description,
    Venue,
    userId: req.user.id,
    bannerUrl: bannerUrl?.url,
    eventDate,
  });

  res.status(201).json(event);
});

const deleteEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const event = await db.Event.findByPk(id);

  if (!event) {
    throw new ApiError(404, "eevent not found");
  }

  await event.destroy();

  return res.status(200).json({
    message: "event deleted succsessfully",
  });
});
const updateEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const event = await db.Event.findByPk(id);
  if (!event) {
    throw new ApiError(404, "event not found");
  }

  const banner = req.files?.banner?.[0]?.path;
  if (banner) {
    const bannerFile = await cloudinaryUpdater(banner);
    event.bannerUrl = bannerFile.url;
    await event.save();
  }

  await event.update(req.body);

  res.status(200).json({ message: "event updated succsessfully" });
});

const getAllEventsByHost = asyncHandler(async (req, res, next) => {
  const Events = await db.Event.findAll({


    where:{
        userId:req.user.id
    }
  }

  );

  if (!Events) {
    throw new ApiError(404, "No events listed");
  }

  res.status(200).json({ Events });
});
const getAllEvents = asyncHandler(async (req, res, next) => {
  const Events = await db.Event.findAll();

  if (!Events) {
    throw new ApiError(404, "No events listed");
  }

  res.status(200).json({ Events });
});

module.exports = { createEvent, deleteEvent, updateEvent, getAllEventsByHost ,getAllEvents};
