import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Adminhome(){
    
    const nav=useNavigate();
    const[stats,setstats]=useState({
        user:0,
        venues:0,
        pendingvenue:0,    
        totalcommission:0,
    });

    useEffect(()=>{
        const admin=JSON.parse(localStorage.getItem("loggeduser"));
        if(!admin || admin.role !== "admin"){
            nav("/login");
            return;
        }
        const user=JSON.parse(localStorage.getItem("user"))||[];
        const venues=JSON.parse(localStorage.getItem("ovenue"))||[];
        const bookings=JSON.parse(localStorage.getItem("book"))||[];

        const pendingvenue=venues.filter(v=>!v.approved).length;
        const totalcommission=bookings.reduce(
            (sum,b)=>sum+(b.commission || 0),0
        );
        
        setstats({
            user:user.length,
            venues:venues.length,
            pendingvenue,
            totalcommission,
        });

    },[nav]);

    const logout=()=>{
        localStorage.removeItem("loggeduser");
        nav("/login");
    }


    return(
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
        admin dashboard
                </h1>
                <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="total users" value={stats.user}/>
                 <StatCard title="total venues" value={stats.venues}/>
                  <StatCard title="pending venues" value={stats.pendingvenue}/>
                   <StatCard title="total commission" value={`${stats.totalcommission}`}/>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <ActionCard title="managr user" desc="View, block or unblock registered users" onClick={
                    ()=>nav("/admin/users")
                }/>

                <ActionCard title="managr venues" onClick={
                    ()=>nav("/admin/venues")
                }/>

                <ActionCard title="commission analytics" onClick={
                    ()=>nav("/admin/commission")
                }/>

            </div>

        </div>
    );
}

function StatCard({title,value}){
    return(
        <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-3xl font-bold text-indigo-600">
        {value}
            </h2>

        </div>
    );


}

function ActionCard({title,onClick,desc}){
    return(
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 ">
        {title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
        {desc}
            </p>
            <button 
            onClick={onClick}
             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                open
            </button>
        </div>
    );
}

export default Adminhome;
