import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

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

        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("loggeduser");
          nav("/login");
          return;
        }

        const data = await res.json();
        setVenues(data);

      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [nav]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 p-8 text-white">
        <h1 className="text-3xl font-bold mb-8">My Venues</h1>

        {loading ? (
          <p className="text-gray-200">Loading venues...</p>
        ) : venues.length === 0 ? (
          <p className="text-gray-200">No venues added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.map((v) => (
              <div
                key={v._id}
                className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow"
              >
                <h2 className="text-lg font-semibold">{v.name}</h2>

                <p className="text-sm mt-1">
                  Sports: {v.sports}
                </p>

                <p className="text-sm mt-1">
                  Timing: {v.opentime} - {v.closetime}
                </p>

                <p className="text-sm mt-1 font-semibold text-green-600">
                  ₹ {v.price} / hour
                </p>

                <p className={`text-sm mt-2 font-semibold ${v.approved ? "text-green-600" : "text-yellow-600"
                  }`}>
                  Status: {v.approved ? "Approved" : "Pending Approval"}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => nav(`/owner/edit/${v._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => nav(`/owner/slots/${v._id}`)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
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