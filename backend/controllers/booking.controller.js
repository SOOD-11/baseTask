// Booking Apis
//---create a booking of the event  ---//
//---fetch all booking for particular event---//
//--fetch alll booking of the user --//
//--cancel the booking --//

const calculatePrice = require("../services/Booking.services.jsx");
const ApiError = require("../utilities/ApiError");
const asyncHandler = require("../utilities/asyncHandler");
const db = require("../models");

const createBooking = asyncHandler(async (req, res, next) => {
  const { eventId, tickets } = req.body;
  const userId = req.user.id;

  const booking = await db.Booking.create({
    eventId,
    userId,
    tickets,
    totalPrice: 0,
  });

  return res
    .status(200)
    .json({ message: "Registered for the  Event succsesfully" });
});

const fetchAttendeeBooking = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const bookings = await db.Booking.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: db.Event,
        attributes: ["Name", "Venue", "eventDate"],
      },
    ],
  });
  if (!bookings) {
    throw new ApiError(404, "no bookings found");
  }

  return res.json({ bookings });
});

const fetchEventBookings = asyncHandler(async (req, res, next) => {
  const { eventId } = req.params;

  const Bookings = await db.Booking.findAll({
    where: {
      eventId,
    },

    include: [
      {
        model: db.User,

        attributes: ["username", "email"],
      },
    ],
  });

  if (Bookings.length === 0) {
    throw new ApiError(404, "No bookings for this event");
  }

  return res.status(200).json({ Bookings });
});

const cancelBooking = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await db.Booking.findByPk(bookingId);
  await booking.destroy();

  return res.status(200).json({ message: "Booking cancelled" });
});

module.exports = {
  createBooking,
  fetchAttendeeBooking,
  fetchEventBookings,
  cancelBooking,
};
