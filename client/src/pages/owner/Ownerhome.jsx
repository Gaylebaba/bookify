import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Ownerhome(){
    const nav=useNavigate();
    const[owner,setowner]=useState(null);
    const[stats,setstats]=useState({
        totalvenue:0,
        approvedvenue:0,
        pendingvenue:0
    });

    useEffect(()=>{
        const loggeduser=JSON.parse(localStorage.getItem("loggeduser"));

        if(!loggeduser){
            nav("/login");
        }
            setowner(loggeduser);

            const venue=JSON.parse(localStorage.getItem("ovenue")) || [];

            const approved=venue.filter(v=>v.approved).length;
            const pending=venue.filter(v=>!v.approved).length;

            setstats({
                totalvenue:venue.length,
                approvedvenue:approved,
                pendingvenue:pending
            });
        
    },[nav]);

    const logout= () =>{
        localStorage.removeItem("loggeduser");
        nav("/login");
    };

    if(!owner){
        return null;
    }  
    return(
        <div className="min-h-screen bg-gray-100 p-8">
            {/* header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
            owner dashboard
                </h1>
                <button onClick={logout} className="bg-red-600 text-white px-4 rounded hover:bg-red-700">
            logout
                </button>

            </div>
            <p className="text-gray-600 mb-6">
        welcome back,<span className="font-semibold">
            {owner.name}
        </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Statcard title="total venues" value={stats.totalvenue}/>
        <Statcard title="approved venue" value={stats.approvedvenue}/>
        <Statcard title="pendingvenue" value={stats.pendingvenue}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Actioncard title="add venue" desc="register a new sports venue" onclick={() => nav("/owner/addv")}/>

        <Actioncard title="manage venue" desc="edit venue details and status" onclick={()=>nav("/owner/venues")}/>

        <Actioncard title="set slots" desc="manage slots and availability" onclick={()=>nav("/owner/venues")}/>
            </div>

            <div className="bg-white p-6 rounded shadow max-w-xl">
          
                <p className="text-gray-600 mb-4">
                role:venue owner
                </p>
                <button className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
                onClick={()=>
                  nav("/owner/addv")
                }>
                        Add venue
                </button>

            </div>

        </div>
    );
}

function Statcard({title,value}){
    return(
        <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">
            {title}
            </p>
            <h2 className="text-3xl font-bold text-indigo-600">
        {value}
            </h2>

        </div>
    );
}

function Actioncard({title,desc,onClick}){
    return(
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semicold mb-2">
        {title}
            </h3>
            <p className="text-sm text-gray-600 mb-4  ">
        {desc}
            </p>
            <button onClick={onclick} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ">
        open
            </button>

        </div>
    );
}

export default Ownerhome;