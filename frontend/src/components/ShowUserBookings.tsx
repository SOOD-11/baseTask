import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

type user = {
  username: string;
  email: string;
};

type event = {
  Name: String;
  Venue: String;
  eventDate: Date;
};
type Booking = {
  id: number;
  tickets: number;
  Event: event;
};

type showUserBookingProps = {
  onClose: () => void;
};

const ShowUserBooking = ({ onClose }: showUserBookingProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const showBooking = async () => {
      try {
        const response = await axiosInstance.get(`/booking/my-bookings`);

        console.log(response);
        setBookings(response.data.bookings);
      } catch (error) {
        console.log(error);
      }
    };
    showBooking();
  }, []);

  return (
    <div className="p-3 x-50 y-50 bg-white flex flex-col items-center">
      <div className="text-2xl text-black">
        <h1 className="text-black">MY Bookings</h1>
      </div>
      {bookings.length === 0 ? (
        <h2> No Booking for USER </h2>
      ) : (
        bookings.map((booking, index) => {
          return (
            <div key={booking.id}>
              <div className="bg-white text-2xl text-black flex flex-row justify-around">
                <>
                  <p>{index + 1}</p>
                </>
                <>
                  <p>{booking.Event.Name}</p>
                </>
                <>
                  <p>{booking.Event.Venue}</p>
                </>
                <>
                  <p>{booking.tickets}</p>
                </>
              </div>
            </div>
          );
        })
      )}

      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );
};

export default ShowUserBooking;
