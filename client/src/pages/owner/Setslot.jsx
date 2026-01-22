import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Setslot(){
    const {id}=useParams();
    const nav=useNavigate();
    

    const[slot,setslot]=useState({
        date:"",
        starttime:"", 
        endtime:"",
    });

    useEffect(()=>{
        const saved=JSON.parse(localStorage.getItem(`slots_${id}`));

        if(saved){
            setslot(saved);
        }
    },[id]);

    const handlechange=(e)=>{
        setslot({
            ...slot,
            [e.target.name]:e.target.value,
        });
    };

    const saveslot=(e)=>{
        e.preventDefault();
        if(!slot.date || !slot.starttime || !slot.endtime){
            alert("all fields are required");
            return;
        }
        localStorage.setItem(`slots_${id}`,JSON.stringify(slot));
        alert("slot saved succesfully");
        nav("/owner/venues");
    };




    return(
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
            <form onSubmit={saveslot} className="bg-white p-6 rounded shadow w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Set Slots (Venue ID: {id})
        </h1>

        date <input type="date" name="date" value={slot.date} onChange={handlechange} required />
        starttime <input type="time" value={slot.endtime} name="starttime" onChange={handlechange} />
        endtime <input type="time" value={slot.starttime} name="endtime" onChange={handlechange} />

        <button type="sumbit" onClick={()=>nav(`/owner/slots/${id}`)} className="w-full bg-indigo-600 text-white py-2 rounded">
            add slot </button>
        </form>
        
        
        </div>
    );
}

export default Setslot;

