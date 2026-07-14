import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

type user = {
  username: string;
  email: string;
};
type Booking = {
  id: number;
  tickets: number;
  User: user;
};

type showEventsBookingProps = {
  eventId: number;

  onClose: () => void;
};

const ShowEventsBooking = ({ eventId, onClose }: showEventsBookingProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const showBooking = async (eventId: any) => {
      try {
        const response = await axiosInstance.get(
          `/booking/get-bookings/${eventId}`,
        );

        console.log(response);
        setBookings(response.data.Bookings);
      } catch (error) {
        console.log(error);
      }
    };
    showBooking(eventId);
  }, []);


   
return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl p-6">
    
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Event Bookings
        </h1>

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">
          No bookings found for this event.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left text-gray-700">
                  #
                </th>
                <th className="border px-4 py-3 text-left text-gray-700">
                  Username
                </th>
                <th className="border px-4 py-3 text-left text-gray-700">
                  Email
                </th>
                <th className="border px-4 py-3 text-center text-gray-700">
                  Tickets
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-3">{index + 1}</td>

                  <td className="border px-4 py-3 font-medium">
                    {booking.User.username}
                  </td>

                  <td className="border px-4 py-3">
                    {booking.User.email}
                  </td>

                  <td className="border px-4 py-3 text-center font-semibold">
                    {booking.tickets}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
                
      

  );
};

export default ShowEventsBooking;
