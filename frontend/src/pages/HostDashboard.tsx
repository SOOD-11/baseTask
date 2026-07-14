import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateEventForm from "../components/CreateEventForm";

import UpdateEventForm from "../components/CreateEventUpdateForm";
import ShowEventsBooking from "../components/showEventsBooking";
import axiosInstance from "../utils/axiosInstance";

enum EventType {
  COMEDY = "COMEDY",
  SEMINAR = "SEMINAR",
  CONCERT = "CONCERT",
  SPORTS = "SPORTS",
  HACKATHON = "HACKATHON",
  WORKSHOP = "WORKSHOP",
}
type Event = {
  id: number;
  Name: string;
  eventType: EventType;
  eventDate: string;
  eventDescription: string;
  Venue: string;
  bannerUrl: string;
};

const HostDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>();
  const [createForm, setshowCreateForm] = useState<boolean>(false);
  const [banner, setBanner] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateForm, setShowUpdateForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>();
  const [showBooking, setshowBooking] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/events/delete-event/${id}`,
      );
      getAllEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/events/get-events`,
      );
      setEvents(response.data.Events);
      console.log(events);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="max-h-screen p-8">
      {createForm && (
        <CreateEventForm
          onSuccess={getAllEvents}
          onClose={() => setshowCreateForm(false)}
        ></CreateEventForm>
      )}
      {showBooking && (
        <ShowEventsBooking
          eventId={selectedEvent?.id}
          onClose={() => setshowBooking(false)}
        />
      )}
      {updateForm && selectedEvent && (
        <UpdateEventForm
          event={selectedEvent}
          onSuccess={getAllEvents}
          onClose={() => {
            setShowUpdateForm(false);
            setSelectedEvent(null);
          }}
        />
      )}
      <div>
        <h1 className="text-blue-600">Events listed</h1>
        <button
          type="button"
          className="bg-red-600 p-3 text-white rounded-2xl"
          onClick={() => setshowCreateForm(true)}
        >
          Create New Event
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black border-4">
          {events?.length === 0 ? (
            <h3> NO EVENTS LISTED</h3>
          ) : (
            events.map((Event) => {
              return (
                <div
                  key={Event?.id}
                  className=" bg-white   rounded-xl shadow-md overflow-hidden hover:shadow-xl transition "
                >
                  <img
                    src={Event.bannerUrl}
                    className="w-full h-48 object-cover"
                  ></img>
                  <div className="border-2 bg-black text-white">
                    <h2>{Event.Name}</h2>
                    <h4>{Event.eventType}</h4>
                    <p> Location:{Event.Venue}</p>
                    <h4>{Event?.eventDescription}</h4>
                    <button
                      type="button"
                      onClick={() => handleDelete(Event.id)}
                      className="border-2 bg-red-200"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        (setSelectedEvent(Event), setShowUpdateForm(true));
                      }}
                      className="border-2 bg-red-200"
                    >
                      update
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        (setSelectedEvent(Event), setshowBooking(true));
                      }}
                      className="border-2 bg-red-200"
                    >
                      View Bookings
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default HostDashboard;
