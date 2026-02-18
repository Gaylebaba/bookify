import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminvenue() {

  const nav = useNavigate();
  const [venues, setvenues] = useState([]);

  useEffect(() => {

    const admin = JSON.parse(localStorage.getItem("loggeduser"));

    if (!admin || admin.role !== "admin") {
      nav("/login");
      return;
    }

    const storedvenues = JSON.parse(localStorage.getItem("ovenue")) || [];
    setvenues(storedvenues);

  }, [nav]);

  const approvedvenue = (id) => {

    const updated = venues.map(v =>
      v.id === id ? { ...v, approved: true } : v
    );

    localStorage.setItem("ovenue", JSON.stringify(updated));
    setvenues(updated);
  };

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-12">
        Venue Approval Panel
      </h1>

      {venues.length === 0 ? (
        <p className="text-purple-200">No venues found</p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {venues.map(v => (

            <div
              key={v.id}
              className="bg-[#4c1d95] p-6 rounded-xl shadow-lg"
            >

              <h2 className="text-xl font-semibold mb-2">
                {v.name}
              </h2>

              <p className="text-sm text-purple-200">
                Sports: {v.sports}
              </p>

              <p className="text-sm text-purple-200">
                Time: {v.opentime} - {v.closetime}
              </p>

              <p className={`mt-3 font-semibold ${
                v.approved ? "text-green-400" : "text-yellow-400"
              }`}>
                Status: {v.approved ? "Approved" : "Pending"}
              </p>

              {!v.approved && (
                <button
                  onClick={() => approvedvenue(v.id)}
                  className="mt-4 bg-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition shadow-md"
                >
                  Approve Venue
                </button>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Adminvenue;
