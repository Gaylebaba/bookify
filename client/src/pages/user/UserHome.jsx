import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import stadium from "../../assets/images/stadium.jpg";

function UserHome() {

  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    if (!loggeduser || !token) {
      nav("/login");
      return;
    }

    setUser(loggeduser);

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/user/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok && data.length > 0) {
          // 🔥 sort by createdAt to get latest
          const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLastBooking(sorted[0]);
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchBookings();

  }, [nav]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  if (!user) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-10 text-white">

        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
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

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Logout
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

        {/* Last Booking Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-3xl">
          <h2 className="text-xl font-semibold mb-4">
            Last Booking
          </h2>

          {loading ? (
            <p className="text-gray-300">Loading booking...</p>
          ) : lastBooking ? (
            <div className="space-y-2 text-gray-200">
              <p><strong>Venue:</strong> {lastBooking.venue?.name}</p>
              <p><strong>Date:</strong> {lastBooking.date}</p>
              <p>
                <strong>Time:</strong> {lastBooking.startTime} - {lastBooking.endTime}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    lastBooking.status === "cancelled"
                      ? "text-red-400"
                      : lastBooking.status === "confirmed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {lastBooking.status}
                </span>
              </p>
              <p>
                <strong>Amount:</strong> ₹ {lastBooking.amount}
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