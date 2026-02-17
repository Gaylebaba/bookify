import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

function Ownervenue() {
  const nav = useNavigate();
  const [venue, setvenue] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ovenue")) || [];
    setvenue(stored);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 p-8 text-white">
        <h1 className="text-3xl font-bold mb-8">My Venues</h1>

        {venue.length === 0 ? (
          <p className="text-gray-200">No venues added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venue.map((v) => (
              <div
                key={v.id}
                className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow"
              >
                <h2 className="text-lg font-semibold">{v.name}</h2>
                <p className="text-sm mt-1">Sports: {v.sports}</p>
                <p className="text-sm mt-1">
                  Timing: {v.opentime} - {v.closetime}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => nav(`/owner/edit/${v.id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => nav(`/owner/slots/${v.id}`)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
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
