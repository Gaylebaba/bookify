import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Admincomm() {

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
          "http://localhost:5000/api/auth/admin/bookings",
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

  // Only confirmed bookings count for revenue
  const confirmed = bookings.filter(b => b.status === "confirmed");

  const totalRevenue = confirmed.reduce(
    (sum, b) => sum + b.amount,
    0
  );

  const totalCommission = confirmed.reduce(
    (sum, b) => sum + b.commission,
    0
  );

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-12">
        Commission Analytics
      </h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (

        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
              <p className="text-sm text-purple-200">
                Total Bookings
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {confirmed.length}
              </h2>
            </div>

            <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
              <p className="text-sm text-purple-200">
                Total Revenue
              </p>
              <h2 className="text-3xl font-bold mt-2">
                ₹ {totalRevenue}
              </h2>
            </div>

            <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
              <p className="text-sm text-purple-200">
                Total Commission (3%)
              </p>
              <h2 className="text-3xl font-bold text-green-400 mt-2">
                ₹ {totalCommission}
              </h2>
            </div>

          </div>

          {/* Booking Table */}
          {/* {confirmed.length === 0 ? (
            <p className="text-purple-200">No confirmed bookings</p>
          ) : (
            <div className="bg-[#4c1d95] rounded-xl shadow-lg overflow-x-auto">
              <table className="w-full text-left">

                <thead className="bg-purple-700 text-sm">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Venue</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Commission</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {confirmed.map((b) => (
                    <tr key={b._id} className="border-t border-purple-700">
                      <td className="p-3">{b.user?.name}</td>
                      <td className="p-3">{b.venue?.name}</td>
                      <td className="p-3">₹ {b.amount}</td>
                      <td className="p-3 text-green-400">
                        ₹ {b.commission}
                      </td>
                      <td className="p-3">{b.date}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )} */}
        </>
      )}

    </div>
  );
}

export default Admincomm;