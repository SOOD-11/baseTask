import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

enum EventType {
  COMEDY = "COMEDY",
  SEMINAR = "SEMINAR",
  CONCERT = "CONCERT",
  SPORTS = "SPORTS",
  HACKATHON = "HACKATHON",
  WORKSHOP = "WORKSHOP",
}

type CreateEventProps = {
  onSuccess: () => void;
  onClose: () => void;
};

const CreateEventForm = ({ onSuccess, onClose }: CreateEventProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formdata, setFormdata] = useState({
    name: "",
    eventType: " ",
    Description: "",
    Venue: "",
    eventDate: "",
  });

  const [banner, setBanner] = useState<File>();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("name", formdata.name);
      form.append("eventType", formdata.eventType);
      form.append("eventDate", formdata.eventDate);
      form.append("Venue", formdata.Venue);
      form.append("Description", formdata.Description);
      if (banner) {
        form.append("banner", banner);
      }

      setLoading(true);
      setError("");
      const submit = await axiosInstance.post(
        `/events/create-event`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(submit.data);
      onSuccess();
      onClose();
      setLoading(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.response.data?.errors?.[0].msg;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40  z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl flex flex-col min-w-full gap-4"
      >
        {error && <div className="bg-white text-red">{error}</div>}
        <input
          type="text"
          placeholder="Enter the Name for event "
          value={formdata.name}
          className="p-2 bg-white border-2  text-black"
          onChange={(e) => {
            setFormdata({ ...formdata, name: e.target.value });
          }}
        />
        <select
          name="eventType"
          value={formdata.eventType}
          className="p-2 bg-white border-2  text-black"
          onChange={(e) => {
            setFormdata({ ...formdata, eventType: e.target.value });
          }}
        >
          {Object.values(EventType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
          ;
        </select>
        <input
          type="text"
          placeholder="Venue"
          name="Venue"
          value={formdata.Venue}
          className="p-2 bg-white border-2  text-black"
          onChange={(e) => {
            setFormdata({ ...formdata, Venue: e.target.value });
          }}
        />
        <textarea
          placeholder="Description of event"
          name="Description"
          value={formdata.Description}
          className="p-2 bg-white border-2 text-black "
          onChange={(e) => {
            setFormdata({ ...formdata, Description: e.target.value });
          }}
        />
        <input
          type="date"
          placeholder="enter event date"
          name="eventDate"
          className="p-2 bg-white border-2  text-black"
          value={formdata.eventDate}
          onChange={(e) => {
            setFormdata({ ...formdata, eventDate: e.target.value });
          }}
        />

        <input
          type="file"
          accept="image/*"
          className="border-2 p-2 text-black"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setBanner(e.target.files[0]);
            }
          }}
        ></input>

        <button
          type="submit"
          className="bg-blue-600 p-3 text-white"
          disabled={loading}
        >
          {loading ? "creating" : "Submit"}{" "}
        </button>
        <button
          type={"button"}
          className="bg-red-600 p-3 text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default CreateEventForm;
