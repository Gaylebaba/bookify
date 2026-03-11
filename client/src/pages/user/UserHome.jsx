import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import stadium from "../../assets/images/stadium.jpg";
import UserNavbar from "../../components/UserNavbar";
import { Calendar, MapPin, Clock, IndianRupee } from "lucide-react";

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

  if (!user) return null;

  return (

    <div className="min-h-screen bg-gray-50">

      <UserNavbar />

      {/* HERO SECTION */}

      <div
        className="relative h-[260px] bg-cover bg-center"
        style={{ backgroundImage: `url(${stadium})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-white">

          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.name}
          </h1>

          <p className="text-gray-200">
            Ready to book your next game?
          </p>

        </div>
      </div>


      {/* QUICK ACTIONS */}

      <div className="max-w-7xl mx-auto px-6 -mt-12 mb-12">

        <div className="grid md:grid-cols-2 gap-6">

          <div
            onClick={() => nav("/venues")}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              Browse Venues
            </h3>

            <p className="text-gray-500">
              Explore available sports venues and book instantly.
            </p>
          </div>

          <div
            onClick={() => nav("/user/history")}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              Booking History
            </h3>

            <p className="text-gray-500">
              View all your previous and upcoming bookings.
            </p>
          </div>

        </div>

      </div>


      {/* USER INFO CARDS */}

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-12">

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

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Last Booking
          </h2>

          {loading ? (

            <p className="text-gray-500">Loading booking...</p>

          ) : lastBooking ? (

            <div className="grid md:grid-cols-2 gap-6 text-gray-700">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span><strong>Venue:</strong> {lastBooking.venue?.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span><strong>Date:</strong> {lastBooking.date}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} />
                <span>
                  <strong>Time:</strong> {lastBooking.startTime} - {lastBooking.endTime}
                </span>
              </div>

              <div>
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
              </div>

              <div className="flex items-center gap-3">
                <IndianRupee size={18} />
                <span><strong>Amount:</strong> {lastBooking.amount}</span>
              </div>

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