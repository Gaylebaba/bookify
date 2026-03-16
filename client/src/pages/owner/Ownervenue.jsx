import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../../components/OwnerNavbar";

function Ownervenue() {

  const nav = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchVenues = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          nav("/login");
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/auth/owner/venues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setVenues(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchVenues();

  }, [nav]);



  return (

    <div className="min-h-screen bg-gray-50">

      <OwnerNavbar />


      {/* PAGE HEADER */}

      <div className="max-w-7xl mx-auto px-6 pt-8">

        <h1 className="text-2xl font-semibold text-gray-800">
          My Venues
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Manage your sports venues and booking slots
        </p>

      </div>



      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-8">

        {loading ? (

          <p className="text-gray-500">
            Loading venues...
          </p>

        ) : venues.length === 0 ? (

          <div className="bg-white p-8 rounded-xl shadow text-center">

            <p className="text-gray-600 mb-4">
              No venues added yet
            </p>

            <button
              onClick={() => nav("/owner/addv")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Venue
            </button>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {venues.map((v) => (

              <div
                key={v._id}
                className="bg-white rounded-xl shadow-sm border p-8 hover:shadow-md transition"
              >

                {/* TITLE */}

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {v.name}
                </h2>



                {/* SPORTS */}

                <div className="flex flex-wrap gap-2 mb-4">

                  {v.sports.split(",").map((sport, i) => (

                    <span
                      key={i}
                      className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full"
                    >
                      {sport}
                    </span>

                  ))}

                </div>



                {/* DETAILS */}

                <div className="space-y-2 text-sm text-gray-600">

                  <p>
                    ⏰ {v.opentime} - {v.closetime}
                  </p>

                  <p className="text-green-600 font-medium">
                    ₹ {v.price} / hour
                  </p>

                </div>



                {/* STATUS */}

                <div className="mt-4">

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      v.approved
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {v.approved ? "Approved" : "Pending Approval"}
                  </span>

                </div>



                {/* BUTTONS */}

                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => nav(`/owner/edit/${v._id}`)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => nav(`/owner/set-slot/${v._id}`)}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Set Slots
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Ownervenue;