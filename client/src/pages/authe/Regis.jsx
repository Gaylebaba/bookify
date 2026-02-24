import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import sppic2 from "../../assets/images/sppic2.jpeg";
import Authlay from "../../layouts/Authlay";

function Regis() {

  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const setChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful");
      nav("/login");

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Authlay image={sppic2}>
      <form
        onSubmit={handleSubmit}
        className="w-[380px] bg-white/95 p-8 rounded-2xl shadow-2xl"
      >

        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Bookify
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Book sports venues effortlessly
          </p>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={setChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={setChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={setChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mb-4"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={setChange}
          className="w-full border border-gray-300 p-2.5 rounded-lg mb-4"
        />

        <FormControl className="mb-6">
          <FormLabel sx={{ fontSize: 13, color: "#4B5563" }}>
            Register as
          </FormLabel>

          <RadioGroup
            name="role"
            value={form.role}
            onChange={setChange}
          >
            <FormControlLabel
              value="enduser"
              control={<Radio />}
              label="End User"
            />
            <FormControlLabel
              value="owner"
              control={<Radio />}
              label="Venue Owner"
            />
          </RadioGroup>
        </FormControl>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2.5 rounded-lg font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have account?
          <span
            onClick={() => nav("/login")}
            className="text-indigo-600 cursor-pointer hover:underline ml-1"
          >
            Login
          </span>
        </p>

      </form>
    </Authlay>
  );
}

export default Regis;