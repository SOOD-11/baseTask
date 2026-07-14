import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const { setUser, user } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData();
    form.append("email", formdata.email);
    form.append("password", formdata.password);

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/user/login", formdata);
      if (response.status === 201 || response.status === 200) {
        setUser(response.data.loggedInUser);

        if (response.data.loggedInUser.role.trim() === "HOST") {
          console.log("Navigating to HOST");
          navigate("/Dashboard");
        }

        if (response.data.loggedInUser.role.trim() === "ATTENDEE") {
          console.log("Navigating to ATTENDEE");
          navigate("/all-events");
        }
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-1 min-w-full  bg-white flex items-center justify-around">
      <h1 className=" text-red-500">Login</h1>
      <h1 className="text-black"> To book Events</h1>
      <form
        onSubmit={handleSubmit}
        className=" z-5 flex flex-col justify-around items-center min-w-2xl gap-y-4 gap-4"
      >
        {error && <div className="bg-white text-red">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={formdata.email}
          className=" bg-white border-2 text-black"
          onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
        />

        <input
          type="password"
          value={formdata.password}
          placeholder="password"
          className="rounded-2xl border-2 text-black"
          onChange={(e) =>
            setFormdata({ ...formdata, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-red-500 text-shadow-black px-6 py-2"
        >
          {loading ? "logging in" : "logIn"}
        </button>
      </form>
    </div>
  );
};
export default Login;
