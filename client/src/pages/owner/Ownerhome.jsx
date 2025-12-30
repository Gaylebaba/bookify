import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Ownerhome(){
    const nav=useNavigate();
    const[owner,setowner]=useState(null);

    useEffect(()=>{
        const loggeduser=JSON.parse(localStorage.getItem("loggeduser"));

        if(!loggeduser){
            nav("/login");
        }else{
            setowner(loggeduser);
        }
    },[nav]);

    if(!owner){
        return null;
    }  
    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white p-6 rounded shadow max-w-xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome,{owner.name}
                </h1>
                <p className="text-gray-600 mb-4">
                role:venue owner
                </p>
                <button className="bg-blue-600 text-white px-2 py-2 rounded hover:.bg-blue-700"
                onClick={()=>
                  nav("/owner/addv")
                }>
                        Add venue
                </button>
            </div>

        </div>
    );
}

export default Ownerhome;