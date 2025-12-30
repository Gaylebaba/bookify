import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { sppic1 } from "../../assets";


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

        const saveduser = JSON.parse(localStorage.getItem("registereduser"));

        if (!saveduser) {
            alert("no user found");
            return;
        }

        console.log(form);

        if (
            form.email === saveduser.email &&
            form.password === saveduser.password &&
            form.role === saveduser.role
        ) {

            localStorage.setItem("loggeduser", JSON.stringify(saveduser));

            if (form.role === "enduser") nav("/home");
            if (form.role === "owner") nav("/owner");
            if (form.role === "admin") nav("/admin");
        } else {
            alert("try agian");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-indigo-950">

            <div className="flex items-center justify-center">
                <form onSubmit={handle}
                    className="w-[380px] bg-white/95 p-8 rounded-2xl shadow-2xl">


                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-black-700 tracking-wide">
                            Bookify
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Book sports venues effortlessly
                        </p>
                    </div>


                    email:<input type="email" name="email" onChange={setchange} className="w-full border border-gray-300 p-2.5 rounded-lg" />

                    password <input type="password" name="password" onChange={setchange} className="w-full border border-gray-300 p-2.5 rounded-lg " />



                    <FormControl>
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

                    <p className="text-sm text-center text-gray-500">
                        dont have account?
                        <span onClick={() => nav("/regis")}
                            className="text-indigo-600 cursor-pointer hover:underline">
                            register
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
                        <h1 className="text-5xl font-extrabold leading-tight mb-4">
                            Book. Play. <span className="text-indigo-400">Repeat.</span>
                        </h1>

                        <p className="text-gray-300">
                            Discover nearby sports venues and book instantly with Bookify.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Loginn;