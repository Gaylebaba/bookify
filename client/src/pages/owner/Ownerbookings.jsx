import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../../components/OwnerNavbar";

function Ownerbookings() {

  const nav = useNavigate();

  const [venues,setVenues]=useState([]);
  const [selectedVenue,setSelectedVenue]=useState("");
  const [bookings,setBookings]=useState([]);

  useEffect(()=>{

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if(!token || !logged || logged.role!=="owner"){
      nav("/login");
      return;
    }

    const fetchVenues = async()=>{

      const res = await fetch(
        "http://localhost:5000/api/auth/owner/venues",
        {headers:{Authorization:`Bearer ${token}`}}
      );

      const data = await res.json();
      setVenues(data);

    };

    fetchVenues();

  },[nav]);


  const fetchBookings = async(venueId)=>{

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/auth/owner/venue/${venueId}/bookings`,
      {headers:{Authorization:`Bearer ${token}`}}
    );

    const data = await res.json();
    setBookings(Array.isArray(data)?data:[]);

  };


  const confirmedBookings = bookings.filter(b=>b.status==="confirmed");

  const totalEarnings = confirmedBookings.reduce(
    (sum,b)=>sum+(b.amount||0),0
  );



  return(

    <div className="min-h-screen bg-gray-50">

      <OwnerNavbar/>

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* HEADER */}

        <h1 className="text-2xl font-semibold text-gray-800">
          Booking History
        </h1>

        <p className="text-gray-500 text-sm mt-1 mb-6">
          View and manage all venue bookings
        </p>



        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-gray-500 text-sm">
              Total Bookings
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {bookings.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-gray-500 text-sm">
              Confirmed Bookings
            </p>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              {confirmedBookings.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-gray-500 text-sm">
              Total Earnings
            </p>
            <h2 className="text-2xl font-bold text-indigo-600 mt-2">
              ₹ {totalEarnings}
            </h2>
          </div>

        </div>



        {/* VENUE FILTER */}

        <div className="mb-6">

          <select
            value={selectedVenue}
            onChange={(e)=>{
              setSelectedVenue(e.target.value);
              fetchBookings(e.target.value);
            }}
            className="border px-4 py-2 rounded-lg bg-white shadow-sm"
          >

            <option value="">Select Venue</option>

            {venues.map(v=>(
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}

          </select>

        </div>



        {/* BOOKINGS TABLE */}

        {bookings.length===0 ? (

          <div className="bg-white border rounded-xl p-8 text-center text-gray-500 shadow">
            No bookings found
          </div>

        ):(

          <div className="bg-white rounded-xl shadow border overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-gray-100 text-gray-700">

                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>

              </thead>

              <tbody>

                {bookings.map(b=>(
                  <tr key={b._id} className="border-t hover:bg-gray-50">

                    <td className="p-4">
                      {b.user?.name}
                    </td>

                    <td className="p-4">
                      {b.date}
                    </td>

                    <td className="p-4">
                      {b.startTime} - {b.endTime}
                    </td>

                    <td className="p-4 font-medium">
                      ₹ {b.amount}
                    </td>

                    <td className="p-4">

                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          b.status==="confirmed"
                          ?"bg-green-100 text-green-600"
                          :b.status==="cancelled"
                          ?"bg-red-100 text-red-600"
                          :"bg-yellow-100 text-yellow-600"
                        }`}>

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

export default Ownerbookings;