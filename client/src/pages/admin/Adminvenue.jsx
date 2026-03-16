import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function Adminvenue() {

  const nav = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if (!token || !logged || logged.role !== "admin") {
      nav("/login");
      return;
    }

    const fetchVenues = async () => {

      const res = await fetch(
        "http://localhost:5000/api/auth/venue/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      setVenues(data);
      setLoading(false);

    };

    fetchVenues();

  }, [nav]);



  const approveVenue = async (id) => {

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/auth/admin/approve/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setVenues(
      venues.map(v =>
        v._id === id ? { ...v, approved: true } : v
      )
    );

  };



  return (

    <div className="min-h-screen bg-gray-50">

      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* HEADER */}

        <h1 className="text-2xl font-semibold text-gray-800">
          Venue Approval Panel
        </h1>

        <p className="text-gray-500 text-sm mt-1 mb-8">
          Review and approve venue registrations
        </p>



        {loading ? (

          <p className="text-gray-500">Loading venues...</p>

        ) : venues.length === 0 ? (

          <div className="bg-white p-6 rounded-xl border shadow-sm text-gray-500">
            No venues found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {venues.map(v => (

              <div
                key={v._id}
                className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition"
              >

                {/* NAME */}

                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {v.name}
                </h2>



                {/* SPORTS */}

                <div className="flex flex-wrap gap-2 mb-3">

                  {v.sports.split(",").map((sport, i) => (

                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded"
                    >
                      {sport}
                    </span>

                  ))}

                </div>



                {/* DETAILS */}

                <p className="text-sm text-gray-600">
                  Time: {v.opentime} - {v.closetime}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  Price: ₹ {v.price} / hour
                </p>



                {/* STATUS */}

                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full font-semibold
                  ${v.approved
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {v.approved ? "Approved" : "Pending Approval"}
                </span>



                {/* BUTTON */}

                {!v.approved && (

                  <button
                    onClick={() => approveVenue(v._id)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    Approve Venue
                  </button>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Adminvenue;