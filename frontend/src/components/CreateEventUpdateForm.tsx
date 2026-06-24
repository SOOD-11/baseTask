import axios from "axios";
import React, { useState } from "react";

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
  eventType: string;
  eventDate: string;
  eventDescription: string;
  Venue: string;
  bannerUrl: string;
};

type UpdateEventProps = {
  event: Event;
  onSuccess: () => void;
  onClose: () => void;
};

const UpdateEventForm = ({ event, onSuccess, onClose }: UpdateEventProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formdata, setFormdata] = useState({
    name: event.Name,
    eventType: event.eventType,
    Description: event.eventDescription,
    Venue: event.Venue,
    eventDate: event.eventDate.split("T")[0],
  });

  const [banner, setBanner] = useState<File>();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const form = new FormData();

      form.append("Name", formdata.name);
      form.append("eventType", formdata.eventType);
      form.append("Venue", formdata.Venue);
      form.append("eventDescription", formdata.Description);
      form.append("eventDate", formdata.eventDate);

      if (banner) {
        form.append("banner", banner);
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/events/update-event/${event.id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);

      onSuccess();
      onClose();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Failed to update event";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-4 w-[600px]"
      >
        <h2 className="text-2xl font-bold">Update Event</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
        )}

        <img
          src={event.bannerUrl}
          alt="Current Banner"
          className="w-full h-40 object-cover rounded"
        />

        <input
          type="text"
          placeholder="Event Name"
          value={formdata.name}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              name: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <select
          value={formdata.eventType}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              eventType: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          {Object.values(EventType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Venue"
          value={formdata.Venue}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              Venue: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={formdata.Description}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              Description: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={formdata.eventDate}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              eventDate: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setBanner(e.target.files[0]);
            }
          }}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
