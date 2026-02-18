import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Admincomm() {

  const nav = useNavigate();
  const [book, setbook] = useState([]);
  const [rate, setrate] = useState(3);

  useEffect(() => {

    const admin = JSON.parse(localStorage.getItem("loggeduser"));

    if (!admin || admin.role !== "admin") {
      nav("/login");
      return;
    }

    const storebook = JSON.parse(localStorage.getItem("book")) || [];
    setbook(storebook);

    const savedRate = JSON.parse(localStorage.getItem("commissionRate"));
    if (savedRate) setrate(savedRate);

  }, [nav]);

  const saveRate = () => {
    localStorage.setItem("commissionRate", JSON.stringify(rate));
    alert("Commission rate updated");
  };

  const totalAmount = book.reduce((sum, b) => sum + (b.amount || 0), 0);

  const totalCommission = (totalAmount * rate) / 100;

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-12">
        Commission Analytics
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        {/* Commission Rate */}
        <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
          <p className="text-sm text-purple-200 mb-2">
            Commission Rate (%)
          </p>

          <input
            type="number"
            value={rate}
            onChange={(e) => setrate(Number(e.target.value))}
            className="w-full p-2 rounded text-black mb-4"
          />

          <button
            onClick={saveRate}
            className="bg-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 transition"
          >
            Update Rate
          </button>
        </div>

        {/* Total Bookings */}
        <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
          <p className="text-sm text-purple-200">
            Total Bookings
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {book.length}
          </h2>
        </div>

        {/* Total Commission */}
        <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
          <p className="text-sm text-purple-200">
            Total Commission
          </p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            ₹ {totalCommission}
          </h2>
        </div>

      </div>

      {/* Booking Table */}
      {book.length === 0 ? (
        <p className="text-purple-200">No bookings yet</p>
      ) : (
        <div className="bg-[#4c1d95] rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-purple-700 text-sm">
              <tr>
                <th className="p-3">Venue</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Commission</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {book.map((b) => {

                const commissionValue = (b.amount * rate) / 100;

                return (
                  <tr key={b.id} className="border-t border-purple-700">
                    <td className="p-3">{b.venuename}</td>
                    <td className="p-3">₹ {b.amount}</td>
                    <td className="p-3 text-green-400">
                      ₹ {commissionValue}
                    </td>
                    <td className="p-3">{b.date}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default Admincomm;
