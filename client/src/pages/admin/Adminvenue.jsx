import { useEffect } from "react";
import { useState } from "react";

function Adminvenue(){

    const[venues,setvenues]=useState([]);

    useEffect(()=>{
        const storedvenues=JSON.parse(localStorage.getItem("ovenue")) || [];
        setvenues(storedvenues);
        const admin=JSON.parse(localStorage.getItem("loggeduser"));
        if(!admin || admin.role !=="admin"){
            window.location.href="/login";
            return;
        }
    },[]);

    const approvedvenue=(id)=>{
        const updated=venues.map(v=>
            v.id === id ? {...v, approved: true} :v
        );  

        localStorage.setItem("ovenue",JSON.stringify(updated));
        setvenues(updated);
        alert("venue approved succesfully");
    };

    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
            venue approved panel
            </h1>

            {venues.length === 0 ? (
                <p className="text-gray-500">
                    no venues found
                </p>
            ):(
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {venues.map(v=>(
                        <div key={v.id}
                        className="bg-white p-6 rounded shadow">
                   
                    <h2 className="text-lg bg-white font-semibold">
                    {v.name}
                    </h2>

                    <p className="text-sm text-gray-600">
                    sports:{v.sports}
                    </p>

                    <p>
                        time : {v.opentime}-{v.closetime}
                    </p>
                    <p className={`mt-2 font-semibold ${v.approved ? "text-green-600": "text-yellow-600"}`} >
                    status:{v.approved ? "approved" :"pending"}
                    </p>
                    {!v.approved && (
                        <button onClick={()=>approvedvenue(v.id)}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            approved venue
                        </button>
                    )}
                </div>
                 ))}
                 
            </div>
            )}

        </div>
    );
}

export default Adminvenue;