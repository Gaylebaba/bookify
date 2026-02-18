import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import stadium from "../../assets/images/stadium.jpg";

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

  if (!user) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${stadium})` }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-10 text-white">

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-lg text-gray-200">
            Ready to book your next game?
          </p>

          <button
            onClick={() => nav("/venues")}
            className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            Browse Venues
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-gray-300">User Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-gray-300">Role</p>
            <p className="text-lg font-semibold">End User</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <p className="text-sm text-gray-300">Account Status</p>
            <p className="text-lg font-semibold text-green-400">
              Active
            </p>
          </div>

        </div>

        {/* Last Booking */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-3xl">

          <h2 className="text-xl font-semibold mb-4">
            Last Booking
          </h2>

          {lastbooking ? (
            <div className="space-y-2 text-gray-200">
              <p><strong>Venue:</strong> {lastbooking.venue}</p>
              <p><strong>Date:</strong> {lastbooking.date}</p>
              <p><strong>Time:</strong> {lastbooking.time}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={
                  lastbooking.status === "canceled"
                    ? "text-red-400"
                    : "text-green-400"
                }>
                  {lastbooking.status}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-300">
              No booking history found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default UserHome;
