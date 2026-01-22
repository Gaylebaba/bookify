import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Adminn(){
    const nav=useNavigate();

    
    useEffect(() =>{
        const user=JSON.parse(localStorage.getItem("loggeduser"));
        if(!user || user.role !=="admin"){
            nav("/login");
        }
    },[nav]);

    return(
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold">
        admin dashboard
            </h1>
            <p className="mt-2 text-gray-600">
                its check the system
            </p>

        </div>
    );

}

export default Adminn;