import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

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

      const res = await fetch(
        "http://localhost:5000/api/auth/admin/bookings",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();
      setBookings(data);
      setLoading(false);

    };

    fetchBookings();

  }, [nav]);


  return (

    <div className="min-h-screen bg-gray-50">

      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* HEADER */}

        <h1 className="text-2xl font-semibold text-gray-800">
          Booking Management
        </h1>

        <p className="text-gray-500 text-sm mt-1 mb-8">
          Monitor all booking activity across the platform
        </p>



        {loading ? (

          <p className="text-gray-500">Loading bookings...</p>

        ) : bookings.length === 0 ? (

          <div className="bg-white border rounded-xl p-6 shadow-sm text-gray-500">
            No bookings found
          </div>

        ) : (

          <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">

            <table className="w-full text-sm text-left">

              {/* TABLE HEADER */}

              <thead className="bg-gray-100 text-gray-600">

                <tr>

                  <th className="p-4">User</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Sport</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Commission</th>
                  <th className="p-4">Status</th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {bookings.map((b) => (

                  <tr
                    key={b._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-medium text-gray-800">
                      {b.user?.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {b.venue?.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {b.sport}
                    </td>

                    <td className="p-4 text-gray-600">
                      {b.date}
                    </td>

                    <td className="p-4 text-gray-600">
                      {b.startTime} - {b.endTime}
                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      ₹ {b.amount}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹ {b.commission}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold
                        ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : b.status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {b.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default Adminbookmanage;