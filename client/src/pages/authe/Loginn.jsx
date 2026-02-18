import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import sppic2 from "../../assets/images/sppic2.jpeg";
import Authlay from "../../layouts/Authlay";

function Loginn() {

    const nav = useNavigate();

    const [form, setform] = useState({
        email: "",
        password: "",
        role: ""
    });

    const setchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handle = (e) => {
        e.preventDefault();

        if (!form.email || !form.password || !form.role) {
            alert("All fields are required");
            return;
        }

        // 🔥 ADMIN LOGIN
        if (
            form.email === "admin@gmail.com" &&
            form.password === "admin123" &&
            form.role === "admin"
        ) {
            localStorage.setItem(
                "loggeduser",
                JSON.stringify({
                    email: form.email,
                    role: "admin"
                })
            );
            nav("/admin");
            return;
        }

        // 🔥 GET USERS ARRAY
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 🔥 FIND MATCHING USER
        const foundUser = users.find(
            (u) =>
                u.email === form.email &&
                u.password === form.password &&
                u.role.toLowerCase() === form.role.toLowerCase()
        );

        if (!foundUser) {
            alert("Invalid email, password, or role");
            return;
        }

        // 🔥 CHECK BLOCKED
        if (foundUser.blocked) {
            alert("Your account is blocked by admin");
            return;
        }

        // 🔥 SAVE LOGGED USER
        localStorage.setItem("loggeduser", JSON.stringify(foundUser));

        // 🔥 REDIRECT
        if (foundUser.role === "enduser") {
            nav("/home");
        } else if (foundUser.role === "owner") {
            nav("/owner");
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
                    onChange={setchange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={setchange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4"
                />

                <FormControl className="mb-6">
                    <FormLabel sx={{ fontSize: 13, color: "#4B5563" }}>
                        Login as
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
                        <FormControlLabel
                            value="admin"
                            control={<Radio />}
                            label="Admin"
                        />
                    </RadioGroup>
                </FormControl>

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
