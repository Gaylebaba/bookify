import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

function Admincomm() {

  const nav = useNavigate();

  const [bookings,setBookings] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if(!token || !logged || logged.role !== "admin"){
      nav("/login");
      return;
    }

    const fetchBookings = async ()=>{

      const res = await fetch(
        "http://localhost:5000/api/auth/admin/bookings",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      setBookings(data);
      setLoading(false);

    };

    fetchBookings();

  },[nav]);


  const confirmed = bookings.filter(b => b.status === "confirmed");

  const totalRevenue = confirmed.reduce(
    (sum,b)=>sum + b.amount,0
  );

  const totalCommission = confirmed.reduce(
    (sum,b)=>sum + b.commission,0
  );


  return(

    <div className="min-h-screen bg-gray-50">

      <AdminNavbar/>

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* HEADER */}

        <h1 className="text-2xl font-semibold text-gray-800">
          Commission Analytics
        </h1>

        <p className="text-gray-500 text-sm mt-1 mb-8">
          Platform revenue and commission insights
        </p>



        {loading ? (

          <p className="text-gray-500">Loading analytics...</p>

        ) : (

          <>
          
          {/* KPI CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white border rounded-xl p-6 shadow-sm">

              <p className="text-gray-500 text-sm">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {confirmed.length}
              </h2>

            </div>


            <div className="bg-white border rounded-xl p-6 shadow-sm">

              <p className="text-gray-500 text-sm">
                Total Revenue
              </p>

              <h2 className="text-3xl font-bold text-indigo-600 mt-2">
                ₹ {totalRevenue}
              </h2>

            </div>


            <div className="bg-white border rounded-xl p-6 shadow-sm">

              <p className="text-gray-500 text-sm">
                Platform Commission (3%)
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                ₹ {totalCommission}
              </h2>

            </div>

          </div>


          {/* RECENT BOOKINGS TABLE */}

          <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">

            <div className="p-6 border-b">

              <h2 className="text-lg font-semibold text-gray-800">
                Revenue Transactions
              </h2>

            </div>

            <table className="w-full text-sm text-left">

              <thead className="bg-gray-100 text-gray-600">

                <tr>

                  <th className="p-4">User</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Commission</th>

                </tr>

              </thead>


              <tbody>

                {confirmed.map((b)=>(
                  
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
                      {b.date}
                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      ₹ {b.amount}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹ {b.commission}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          </>

        )}

      </div>

    </div>

  );

}

export default Admincomm;