import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Ownerbookings() {

  const nav = useNavigate();
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if (!token || !logged || logged.role !== "owner") {
      nav("/login");
      return;
    }

    const fetchOwnerVenues = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/owner/venues",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const data = await res.json();
        setVenues(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchOwnerVenues();

  }, [nav]);

  const fetchBookings = async (venueId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/auth/owner/venue/${venueId}/bookings`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Only confirmed bookings count
  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  );

  // 🔥 Total earnings calculation
  const totalEarnings = confirmedBookings.reduce(
    (sum, b) => sum + (b.amount || 0),
    0
  );

  return (
    <div className="p-10 bg-[#3b0764] min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-8">
        My Venue Bookings
      </h1>

      <select
        value={selectedVenue}
        onChange={(e) => {
          setSelectedVenue(e.target.value);
          fetchBookings(e.target.value);
        }}
        className="mb-6 p-3 text-black rounded"
      >
        <option value="">Select Venue</option>
        {venues.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <>
          <div className="bg-[#4c1d95] rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-purple-700">
                  <th className="p-3">User</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-t border-purple-700">
                    <td className="p-3">{b.user?.name}</td>
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">
                      {b.startTime} - {b.endTime}
                    </td>
                    <td className="p-3">₹ {b.amount}</td>
                    <td className={`p-3 font-semibold ${
                      b.status === "confirmed"
                        ? "text-green-400"
                        : b.status === "cancelled"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}>
                      {b.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 Total Earnings Section */}
          <div className="mt-8 bg-[#4c1d95] p-6 rounded-xl text-right shadow-lg">
            <h2 className="text-xl font-semibold">
              Total Confirmed Bookings:{" "}
              <span className="text-white">
                {confirmedBookings.length}
              </span>
            </h2>

            <h2 className="text-2xl font-bold mt-3">
              Total Earnings:
              <span className="text-green-400 ml-3">
                ₹ {totalEarnings}
              </span>
            </h2>
          </div>
        </>
      )}

    </div>
  );
}

export default Ownerbookings;