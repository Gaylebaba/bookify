import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/btcompo"

 function Loginn(){

    const nav=useNavigate();

    const[form,setform]=useState({
        email:"",
        password:"",
        role:""
    });

    const setchange=(e)=>{
        setform({...form,[e.target.name]:e.target.value});
    };

    const handle=(e)=>{
        e.preventDefault();

        console.log(form);

        if(form.role==="enduser"){
            nav("/home");
        }else if(form.role === "owner"){
            nav("/owner");
        }else if (form.role === "admin") {
            nav("/admin");
         }

    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
            <form onSubmit={handle}
              className="bg-white w-96 p-8 rounded-2xl shadow-xl space-y-4">

                 <h2 className="text-2xl font-bold text-center text-gray-800">Login here</h2>

                 email:<input type="email" name="email" onChange={setchange}  className="w-full border border-gray-300 p-2.5 rounded-lg"/>

                password <input type="password" name="password" onChange={setchange} className="w-full border border-gray-300 p-2.5 rounded-lg "/>

                <button type="submit">Login </button>
                <Button title={"log in"}/>
                <br></br>

                enduser <input type="radio" value="enduser" name="role" checked={form.role==="enduser"} onChange={setchange}/>
                <br />
                venueowner <input type="radio" value="venueowner" name="role" checked={form.role==="venueowner"} onChange={setchange}/>
                <br />
                admin <input type="radio" value="admin" name="role" checked={form.role==="admin"} onChange={setchange}/>

                <p className="text-sm text-center text-gray-500">
                    dont have account?
                    <span onClick={() => nav("/Regis")}
                          className="text-indigo-600 cursor-pointer hover:underline">
                            register
                    </span>
                </p>
              </form>
        </div>
    );

}

export default Loginn;