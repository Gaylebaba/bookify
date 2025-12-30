import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { sppic1 } from "../../assets";


function Regis() {

    const nav = useNavigate();
    const [form, setform] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const [success, setsuccess] = useState(false);
    const [error, setError] = useState("");


    const setchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    const handle = (e) => {
        e.preventDefault();

        if (!form.role) {
            setError("Please select a role");
            return;
        }
        setError("");

        localStorage.setItem("registereduser", JSON.stringify(form));

        alert("registered succesfully");

        console.log("Registered user:", form);

        setsuccess(true);

        setTimeout(() => {
            nav("/login");
        }, 2000);

    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-indigo-950">
            <div className="flex items-center justify-center">
                <form
                    onSubmit={handle}
                    className="w-[360px] bg-white/95 p-8 rounded-3xl 
          shadow-[0_30px_80px_rgba(0,0,0,0.25)] space-y-5">

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-black-7000 tracking-wide">
                            Bookify
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Create your account
                        </p>
                    </div>

                    <br />
                    <FormControl>
                        <FormLabel
                            sx={{ fontSize: "14px", color: "black", marginBottom: "6px" }}
                        >
                            Register as
                        </FormLabel>

                        <RadioGroup
                            row
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

                    <br />


                    name:<input type="text" name="name" onChange={setchange} className="w-full border border-gray-300 p-1.5 rounded-lg" />

                    email:<input type="email" name="email" onChange={setchange} className="w-full border border-gray-300 p-1.5 rounded-lg" />

                    password <input type="password" name="password" onChange={setchange} className="w-full border border-gray-300 p-1.5 rounded-lg " />

                    <button type="submit" name="button" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg ">register</button>

                    <p className="text-sm text-center text-gray-500">
                        Already have an account?
                        <span
                            onClick={() => nav("/login")}
                            className="text-indigo-600 cursor-pointer hover:underline ml-1"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>

            <div
                className="hidden md:block bg-cover bg-center relative"
                style={{ backgroundImage: `url(${sppic1})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-indigo-900/60"></div>

                <div className="relative z-10 flex items-center h-full px-12">
                    <div className="text-white max-w-md">
                        <h1 className="text-4xl font-extrabold mb-4">
                            Join Bookify Today
                        </h1>
                        <p className="text-gray-300">
                            Create your account and start booking sports venues instantly.
                        </p>
                    </div>
                </div>
            </div>

        </div>


    );
}

export default Regis;