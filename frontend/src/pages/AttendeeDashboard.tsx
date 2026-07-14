import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ShowUserBooking from "../components/ShowUserBookings";

type Event = {
  id: number;
  Name: string;
  eventType: string;
  eventDate: string;
  eventDescription: string;
  Venue: string;
  bannerUrl: string;
};

const AttendeeDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showBookings, setshowBookings] = useState(false);
  const [showTicketCounter, setShowTicketCounter] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/events/get-events-all`,
      );

      setEvents(response.data.Events);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowTicketCounter(true);
  };

  const handleBookTicket = async () => {
    if (!selectedEvent) return;

    setLoading(true);

    try {
      await axiosInstance.post("/booking/create-booking", {
        eventId: selectedEvent.id,
        tickets: ticketNumber,
      });

      alert("Booking Successful");

      setShowTicketCounter(false);
      setSelectedEvent(null);
      setTicketNumber(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-blue-600 text-2xl font-bold mb-5">Events Listed</h1>
      <button
        type="button"
        onClick={() => setshowBookings(true)}
        className="px-2 py-5 bg-green-600 text-2xl text-black"
      >
        {" "}
        MY BOOKINGS
      </button>

      {showBookings && (
        <ShowUserBooking
          onClose={() => setshowBookings(false)}
        ></ShowUserBooking>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <h3>No Events Listed</h3>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={event.bannerUrl}
                alt={event.Name}
                className="w-full h-48 object-cover"
              />

              <div className="bg-black text-white p-4">
                <h2 className="text-xl font-bold">{event.Name}</h2>

                <h4>{event.eventType}</h4>

                <p>Location: {event.Venue}</p>

                <p>{event.eventDescription}</p>

                {showTicketCounter && selectedEvent?.id === event.id && (
                  <>
                    <input
                      type="number"
                      min={1}
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(Number(e.target.value))}
                      className="border text-white p-2 my-3 w-full"
                    />

                    <button
                      onClick={handleBookTicket}
                      disabled={loading}
                      className="bg-green-500 px-4 py-2 rounded"
                    >
                      {loading ? "Booking..." : "Book Ticket"}
                    </button>
                  </>
                )}

                {!showTicketCounter && (
                  <button
                    onClick={() => handleRegister(event)}
                    className="bg-red-500 px-4 py-2 rounded mt-3"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendeeDashboard;
