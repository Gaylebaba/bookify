import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { light } from "../../assets";

function BookResult() {

  const { id } = useParams();
  const nav = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    // 🔐 Only end users allowed
    if (!loggeduser || !token || loggeduser.role !== "enduser") {
      nav("/login");
      return;
    }

    const fetchBooking = async () => {
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

        if (!res.ok) {
          nav("/login");
          return;
        }

        const foundBooking = data.find(b => b._id === id);

        if (foundBooking) {
          setBooking(foundBooking);
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchBooking();

  }, [id, nav]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center">

        {loading ? (
          <p className="text-gray-700">Loading booking details...</p>

        ) : booking ? (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-6">
              Booking Confirmed 🎉
            </h1>

            <div className="space-y-3 text-gray-700 text-left">

              <p>
                <strong>Venue:</strong> {booking.venue?.name}
              </p>

              <p>
                <strong>Date:</strong> {booking.date}
              </p>

              <p>
                <strong>Time:</strong> {booking.startTime} - {booking.endTime}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  {booking.status}
                </span>
              </p>

              <p>
                <strong>Amount Paid:</strong> ₹ {booking.amount}
              </p>

            </div>

            <button
              onClick={() => nav("/home")}
              className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Back to Dashboard
            </button>
          </>
        ) : (
          <p className="text-red-500 font-semibold">
            Booking not found.
          </p>
        )}

      </div>

    </div>
  );
}

export default BookResult;