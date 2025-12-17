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
        console.log("Registered user:", form);

        setsuccess(true);

        setTimeout(() => {
            nav("/login");
        }, 2000);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 "
            style={{
                backgroundImage: `url(${sppic1})`,
            }}>
            <form
                onSubmit={handle}
                      className="relative z-10 w-[380px] p-8 rounded-2xl 
        bg-white/90 backdrop-blur-xl shadow-2xl space-y-5">

                <h2 className="text-2xl font-bold text-center text-gray-800 ">create account</h2>

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


                name:<input type="text" name="name" onChange={setchange} className="w-full border border-gray-300 p-2.5 rounded-lg" />

                email:<input type="email" name="email" onChange={setchange} className="w-full border border-gray-300 p-2.5 rounded-lg" />

                password <input type="password" name="password" onChange={setchange} className="w-full border border-gray-300 p-2.5 rounded-lg " />

                <button type="submit" name="button" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg ">register</button>
            </form>

        </div>
    );
}

export default Regis;