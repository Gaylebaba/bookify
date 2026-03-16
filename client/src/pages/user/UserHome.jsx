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

    if (!loggeduser || !token || loggeduser.role !== "enduser") {
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

        if (!res.ok) {
          nav("/login");
          return;
        }

        const data = await res.json();

        if (data.length > 0) {
          const sorted = [...data].sort(
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

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <div className="bg-white shadow">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => nav("/home")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Bookify
          </h1>

          <div className="flex gap-6 items-center">

            <button
              onClick={() => nav("/home")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => nav("/venues")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Browse Venues
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              My Bookings
            </button>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </div>


      {/* HERO */}

      <div
        className="relative h-[300px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${stadium})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-white px-6">

          <h1 className="text-4xl font-bold mb-3">
            Welcome, {user.name}
          </h1>

          <p className="text-gray-200 mb-6">
            Ready to book your next game?
          </p>

          <div className="flex justify-center gap-4">

            <button
              onClick={() => nav("/venues")}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold"
            >
              Browse Venues
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold"
            >
              View Booking History
            </button>

          </div>

        </div>

      </div>


      {/* USER INFO */}

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-semibold">{user.email}</p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-sm text-gray-500">Role</p>
          <p className="text-lg font-semibold">End User</p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-sm text-gray-500">Account Status</p>
          <p className="text-lg font-semibold text-green-600">Active</p>

        </div>

      </div>


      {/* LAST BOOKING */}

      <div className="max-w-7xl mx-auto px-6 pb-16">

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Last Booking
          </h2>

          {loading ? (

            <p className="text-gray-500">
              Loading booking...
            </p>

          ) : lastBooking ? (

            <div className="grid md:grid-cols-2 gap-6 text-gray-700">

              <p>
                <strong>Venue:</strong> {lastBooking.venue?.name}
              </p>

              <p>
                <strong>Date:</strong> {lastBooking.date}
              </p>

              <p>
                <strong>Time:</strong> {lastBooking.startTime} - {lastBooking.endTime}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    lastBooking.status === "cancelled"
                      ? "text-red-500"
                      : lastBooking.status === "confirmed"
                      ? "text-green-600"
                      : "text-yellow-500"
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

            <p className="text-gray-500">
              No booking history found.
            </p>

          )}

        </div>

      </div>

    </div>

  );
}

export default UserHome;