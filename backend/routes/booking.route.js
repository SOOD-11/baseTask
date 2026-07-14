const express = require("express");
const verifyJwt = require("../middlewares/Authentication.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const {
  createBooking,
  fetchAttendeeBooking,
  fetchEventBookings,
} = require("../controllers/booking.controller");

const bookingRouter = express.Router();

bookingRouter.post(
  "/create-Booking",
  verifyJwt,
  authorizeRoles("ATTENDEE"),
  createBooking,
);
bookingRouter.get(
  "/my-bookings",
  verifyJwt,
  authorizeRoles("ATTENDEE"),
  fetchAttendeeBooking,
);
bookingRouter.get(
  "/get-bookings/:eventId",
  verifyJwt,
  authorizeRoles("HOST"),
  fetchEventBookings,
);

module.exports = bookingRouter;
