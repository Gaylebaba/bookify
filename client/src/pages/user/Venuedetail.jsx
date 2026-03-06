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

    // 🔐 Role Protection
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

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stadium})` }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 backdrop-blur-xl bg-white/5"></div>

      {/* Content */}
      <div className="relative z-10 p-10 text-white">

        <h1 className="text-4xl font-bold mb-2">
          Browse Venues
        </h1>

        <p className="text-gray-300 mb-10">
          Choose a venue and slot
        </p>

        {loading ? (
          <p className="text-gray-300">Loading venues...</p>

        ) : error ? (
          <p className="text-red-400">{error}</p>

        ) : venues.length === 0 ? (
          <p className="text-gray-300">No approved venues available</p>

        ) : (

          <div className="grid gap-6 max-w-4xl">

            {venues.map((v) => {

              const sportsList = v.sports?.split(",") || [];

              return (

                <div
                  key={v._id}
                  className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10"
                >

                  <p>
                    <strong>Venue:</strong> {v.name}
                  </p>

                  <p>
                    <strong>Sports:</strong> {v.sports}
                  </p>

                  {/* Sport Selector */}
                  <div className="mt-3">

                    <p className="text-sm mb-1">
                      <strong>Select Sport:</strong>
                    </p>

                    <div className="flex gap-2 flex-wrap">

                      {sportsList.map((s, i) => (

                        <button
                          key={i}
                          onClick={() =>
                            setSelectedSport({
                              ...selectedSport,
                              [v._id]: s
                            })
                          }
                          className={`px-3 py-1 rounded-lg text-sm border transition
                          ${selectedSport[v._id] === s
                              ? "bg-indigo-600 border-indigo-600"
                              : "bg-white/10 border-white/20"
                            }`}
                        >
                          {s}
                        </button>

                      ))}

                    </div>

                  </div>

                  <p className="mt-3">
                    <strong>Time:</strong> {v.opentime} - {v.closetime}
                  </p>

                  <p className="text-green-400 font-semibold">
                    ₹ {v.price} / hour
                  </p>

                  <div className="mt-4 flex gap-4">

                    <button
                      onClick={() => {

                        if (!selectedSport[v._id]) {
                          alert("Please select sport first");
                          return;
                        }

                        nav(`/selecttime/${v._id}?sport=${selectedSport[v._id]}`);

                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
                    >
                      Select Time
                    </button>

                    <button
                      onClick={() => nav(`/venues/${v._id}`)}
                      className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg"
                    >
                      About Venue
                    </button>

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