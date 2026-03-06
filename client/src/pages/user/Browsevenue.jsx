import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import stadium from "../../assets/images/stadium.jpg";

function BrowseVenue() {

  const nav = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    // 🔐 Only end users allowed
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
          setLoading(false);
          return;
        }

        setVenues(data);

      } catch (err) {
        setError("Something went wrong while loading venues");
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
        style={{
          backgroundImage: `url(${stadium})`,
        }}
      />

      {/* Balanced Dark Blur Overlay */}
      <div className="fixed inset-0 backdrop-blur-xl bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 p-10 max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-3">
          Browse Venues
        </h1>

        <p className="text-gray-300 mb-10">
          Choose a venue and select your preferred slot
        </p>

        {loading ? (
          <p className="text-white">Loading venues...</p>

        ) : error ? (
          <p className="text-red-400">{error}</p>

        ) : venues.length === 0 ? (
          <p className="text-white">No approved venues available</p>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {venues.map((v) => (
              <div
                key={v._id}
                className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {v.name}
                </h2>

                <p className="text-gray-300 mt-3">
                  <strong>Sports:</strong> {v.sports}
                </p>

                <p className="text-gray-300 mt-1">
                  <strong>Timing:</strong> {v.opentime} - {v.closetime}
                </p>

                <p className="text-green-400 font-semibold mt-3 text-lg">
                  ₹ {v.price} / hour
                </p>

                <button
                  onClick={() => nav(`/selecttime/${v._id}`)}
                  className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Select Time
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default BrowseVenue;