import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminbookmanage() {

  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if (!token || !logged || logged.role !== "admin") {
      nav("/login");
      return;
    }

    const fetchBookings = async () => {
      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/booking/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert("Failed to fetch bookings");
          return;
        }

        setBookings(data);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchBookings();

  }, [nav]);

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-12">
        Booking Management
      </h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-purple-200">
          No bookings found
        </p>
      ) : (

        <div className="bg-[#4c1d95] rounded-xl shadow-lg overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-purple-700 text-sm">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Commission</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-t border-purple-700"
                >
                  <td className="p-4">
                    {b.user?.name}
                  </td>

                  <td className="p-4">
                    {b.venue?.name}
                  </td>

                  <td className="p-4">
                    {b.date}
                  </td>

                  <td className="p-4">
                    {b.startTime} - {b.endTime}
                  </td>

                  <td className="p-4">
                    ₹ {b.amount}
                  </td>

                  <td className="p-4 text-green-400 font-semibold">
                    ₹ {b.commission}
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      b.status === "cancelled"
                        ? "text-red-400"
                        : b.status === "pending"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {b.status}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Adminbookmanage;