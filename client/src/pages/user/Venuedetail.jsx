import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { light } from "../../assets";

function Venuedetail() {

  const nav = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 p-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Browse Venues
        </h1>

        <p className="text-gray-200 mb-8">
          Choose a venue and slot
        </p>

        {loading ? (
          <p className="text-white">Loading venues...</p>

        ) : error ? (
          <p className="text-red-400">{error}</p>

        ) : venues.length === 0 ? (
          <p className="text-white">No approved venues available</p>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {venues.map((v) => (
              <div
                key={v._id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {v.name}
                </h2>

                <p className="text-gray-600 mt-1">
                  Sports: {v.sports}
                </p>

                <p className="text-gray-600 mt-1">
                  Time: {v.opentime} - {v.closetime}
                </p>

                <p className="text-green-600 font-semibold mt-1">
                  ₹ {v.price} / hour
                </p>

                <button
                  onClick={() => nav(`/selecttime/${v._id}`)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
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

export default Venuedetail;