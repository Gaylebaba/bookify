import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminbookmanage() {

  const nav = useNavigate();
  const [bookings, setbookings] = useState([]);

  useEffect(() => {

    const admin = JSON.parse(localStorage.getItem("loggeduser"));

    if (!admin || admin.role !== "admin") {
      nav("/login");
      return;
    }

    const storedbook = JSON.parse(localStorage.getItem("book")) || [];
    setbookings(storedbook);

  }, [nav]);

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-12">
        Booking Management
      </h1>

      {bookings.length === 0 ? (
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
                <th className="p-4">Amount</th>
                <th className="p-4">Commission</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t border-purple-700"
                >
                  <td className="p-4">{b.username}</td>
                  <td className="p-4">{b.venuename}</td>
                  <td className="p-4">{b.date}</td>
                  <td className="p-4">₹ {b.amount}</td>

                  <td className="p-4 text-green-400 font-semibold">
                    ₹ {b.commission}
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      b.status === "canceled"
                        ? "text-red-400"
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
