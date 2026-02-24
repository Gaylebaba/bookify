import { useNavigate } from "react-router-dom";
import { useState } from "react";
import sppic2 from "../../assets/images/sppic2.jpeg";
import Authlay from "../../layouts/Authlay";

function Loginn() {

  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const setChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handle = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // 🔐 Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggeduser", JSON.stringify(data.user));

      // 🔁 Redirect based on role
      if (data.user.role === "admin") {
        nav("/admin");
      } else if (data.user.role === "owner") {
        nav("/owner");
      } else {
        nav("/home");
      }

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Authlay image={sppic2}>
      <form
        onSubmit={handle}
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
          className="w-full border border-gray-300 p-2.5 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have account?
          <span
            onClick={() => nav("/regis")}
            className="text-indigo-600 cursor-pointer hover:underline ml-1"
          >
            Register
          </span>
        </p>

      </form>
    </Authlay>
  );
}

export default Loginn;