import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import stadium from "../../assets/images/stadium.jpg";

function Venuedetail() {

  const nav = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSport, setSelectedSport] = useState({});

  useEffect(() => {

    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    if (!loggeduser || !token || loggeduser.role !== "enduser") {
      nav("/login");
      return;
    }

    const fetchVenues = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/venues"
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch venues");
          return;
        }

        setVenues(data);

      } catch (err) {
        setError("Something went wrong");
      }

      setLoading(false);

    };

    fetchVenues();

  }, [nav]);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <div className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => nav("/home")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Bookify
          </h1>

          <div className="flex items-center gap-6">

            <button
              onClick={() => nav("/home")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => nav("/venues")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Browse Venues
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              My Bookings
            </button>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </div>


      {/* HEADER */}

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Browse Venues
        </h1>

        <p className="text-gray-600">
          Choose a venue and select your preferred sport & slot
        </p>

      </div>


      {/* VENUE GRID */}

      <div className="max-w-7xl mx-auto px-6 pb-16">

        {loading ? (

          <p className="text-gray-600">Loading venues...</p>

        ) : error ? (

          <p className="text-red-500">{error}</p>

        ) : venues.length === 0 ? (

          <p className="text-gray-600">No approved venues available</p>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {venues.map((v) => {

              const sportsList = v.sports?.split(",") || [];

              return (

                <div
                  key={v._id}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
                >

                  {/* IMAGE */}

                  <div
                    className="h-44 bg-cover bg-center"
                    style={{ backgroundImage: `url(${stadium})` }}
                  />


                  {/* CONTENT */}

                  <div className="p-6 flex flex-col flex-1">

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {v.name}
                    </h2>

                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Timing:</strong> {v.opentime} - {v.closetime}
                    </p>

                    <p className="text-green-600 font-semibold mb-4 text-lg">
                      ₹ {v.price} / hour
                    </p>


                    {/* SPORT SELECTOR */}

                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Select Sport
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">

                      {sportsList.map((s, i) => (

                        <button
                          key={i}
                          onClick={() =>
                            setSelectedSport({
                              ...selectedSport,
                              [v._id]: s
                            })
                          }
                          className={`px-3 py-1 text-sm rounded-full border transition
                          ${selectedSport[v._id] === s
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                            }`}
                        >
                          {s}
                        </button>

                      ))}

                    </div>


                    {/* BUTTONS */}

                    <div className="flex gap-3 mt-auto">

                      <button
                        onClick={() => {

                          if (!selectedSport[v._id]) {
                            alert("Please select sport first");
                            return;
                          }

                          nav(`/selecttime/${v._id}?sport=${selectedSport[v._id]}`);

                        }}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                      >
                        Select Time
                      </button>

                      <button
                        onClick={() => nav(`/venues/${v._id}`)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                      >
                        About
                      </button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}

export default Venuedetail;