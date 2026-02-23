import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/venue/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert("Failed to fetch venues");
          return;
        }

        setVenues(data);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchVenues();

  }, [nav]);

  const approveVenue = async (id) => {

    const token = localStorage.getItem("token");

    try {

      const res = await fetch(
        `http://localhost:5000/api/auth/admin/approve/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Update UI instantly
      setVenues(venues.map(v =>
        v._id === id ? { ...v, approved: true } : v
      ));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-12">
        Venue Approval Panel
      </h1>

      {loading ? (
        <p>Loading venues...</p>
      ) : venues.length === 0 ? (
        <p className="text-purple-200">No venues found</p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {venues.map(v => (

            <div
              key={v._id}
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

              <p className="text-sm text-purple-200">
                Price: ₹ {v.price} / hour
              </p>

              <p className={`mt-3 font-semibold ${
                v.approved ? "text-green-400" : "text-yellow-400"
              }`}>
                Status: {v.approved ? "Approved" : "Pending"}
              </p>

              {!v.approved && (
                <button
                  onClick={() => approveVenue(v._id)}
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