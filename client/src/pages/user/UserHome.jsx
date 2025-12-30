import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { stadium } from "../../assets";


function UserHome() {
    const nav = useNavigate();  
    const [user, setuser] = useState(null);

    const lastbooking = JSON.parse(localStorage.getItem("lastbook"));

    useEffect(() => {
        const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));

        if (!loggeduser) {
            nav("/login");
        } else {
            setuser(loggeduser);
        }
    }, [nav]);

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
              <div
        className="relative px-8 py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${stadium})` }}
      >
             <div className="absolute inset-0 bg-900/70 z-0"></div>
      
            <div className=" relative bg-white z-10 p-6 rounded shadow mb-6">
                <h1 className="text-2xl font-bold text-gray-800">welcome,{user.name}</h1>
                 <p className="text-indigo-200 text-lg">
            Ready to book your next game?
          </p>
           <button
            onClick={() => nav("/venues")}
            className="mt-6  hover:bg-gray-700 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            Browse Venues
          </button>
            </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-10">

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-indigo-200">User ID</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-indigo-200">Role</p>
            <p className="text-lg font-semibold">End User</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-indigo-200">Status</p>
            <p className="text-lg font-semibold text-green-400">
              Active
            </p>
          </div>

        </div>

        

        {/* last booking */}

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Last Booking History
                </h2>

                {lastbooking ? (
                    <div className="border p-4 rounded">
                        <p><strong>Venue:</strong> {lastbooking.venue}</p>
                        <p><strong>Date:</strong> {lastbooking.date}</p>
                        <p><strong>Time:</strong> {lastbooking.time}</p>
                        <p><strong>Status:</strong> {lastbooking.status}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">No booking history found.</p>
                )}
            </div>
        </div>
        </div>

    );
}

export default UserHome;