import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Adminuser(){

    const nav=useNavigate();
    const[users,setuser]=useState([]);

    useEffect(()=>{
        const admin=JSON.parse(localStorage.getItem("loggeduser"));
        if(!admin || admin.role !== "admin"){
            nav("/login");
            return;
        }
        const storeduser=JSON.parse(localStorage.getItem("users")) || [];
        setuser(storeduser);
    },[nav]);

    const toggle=(id)=>{
        const updated=users.map((u)=>
        u.id === id ? {...u ,blocked: u.blocked} :u);

        localStorage.setItem("users",JSON.stringify(updated));
        setuser(updated);
    };
    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
        user management
            </h1>

            {users.length ===0 ? (
                <p className="text-gray-500">no user found</p>
            ):( <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map((u)=>(
                    <div className="bg-white p-6 rounded-xl shadow flex" key={u.id}>
                        <div>
                            <h2 className="text-lg font-semibold">{u.name}</h2>
                            <p className="text-sm text-gray-600">{u.email}</p>
                            <p className="text-sm"> 
                        role: <span className="font-medium">{u.role}</span>
                            </p>
                            <p className={`mt-1 text-sm font-semibold ${
                                u.blocked ? "text-red-600" : "text-green-600"
                            }`}>
                                status : {u.blocked ? "blocked" : "active"}
                            </p>
                        </div>
                        <button 
                        onClick={()=> toggle(u.id)}
                        className={`px-4 py-2 rounded text-white font-semibold ${u.blocked ? "bg-green-600 hover:bg-green-700" 
                            : "bg-red-600 hover:bg-red-700"
                        }`}>
                            {u.blocked ? "unblock" : "block"}
                        </button>
                    </div>
                ))}
            </div>

            )}

        </div>
    );
}

export default Adminuser;