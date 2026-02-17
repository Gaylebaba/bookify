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
    role: ""
  });

  const setchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find(user => user.email === form.email);

    if (emailExists) {
      alert("User already exists");
      return;
    }

    users.push(form);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful");
    nav("/login");
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

        name:
        <input
          type="text"
          name="name"
          onChange={setchange}
          className="w-full border border-gray-300 p-2.5 rounded-lg"
        />

        email:
        <input
          type="email"
          name="email"
          onChange={setchange}
          className="w-full border border-gray-300 p-2.5 rounded-lg"
        />

        password
        <input
          type="password"
          name="password"
          onChange={setchange}
          className="w-full border border-gray-300 p-2.5 rounded-lg"
        />

        <FormControl>
          <FormLabel sx={{ fontSize: 13, color: "#4B5563" }}>
            Register as
          </FormLabel>

          <RadioGroup
            name="role"
            value={form.role}
            onChange={setchange}
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

        <p className="text-sm text-center text-gray-500">
          already have account?
          <span
            onClick={() => nav("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            login
          </span>
        </p>
      </form>
    </Authlay>
  );
}

export default Regis;
