import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { sppic1 } from "../../assets";
import Authlay from "../../layouts/Authlay";


function Loginn() {

    const nav = useNavigate();

    const [form, setform] = useState({
        email: "",
        password: "",
        role: ""
    });

    const adminacc={
        email:"admin@gmail.com",
        password:"admin123",
        role:"admin"
    };
    localStorage.setItem("adminacc",JSON.stringify(adminacc));

    const setchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handle = (e) => {
        e.preventDefault();

        const saveduser = JSON.parse(localStorage.getItem("registereduser"));

        const admin=JSON.parse(localStorage.getItem("adminacc"));

        if(form.email === admin.email && form.password === admin.password && form.role === "admin"){
            localStorage.setItem("loggeduser",JSON.stringify(admin));
            nav("/admin");
            return;
        }

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
            alert("try again");
        }
    };

    return (
         <Authlay image={sppic1}>
       
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
           </Authlay>

    );

}

export default Loginn;