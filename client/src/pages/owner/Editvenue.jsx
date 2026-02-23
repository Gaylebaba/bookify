import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

function Editvenue() {
  const nav = useNavigate();
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch venue from backend
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          nav("/login");
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to fetch venue");
          nav("/owner/venues");
          return;
        }

        setVenue(data);
      } catch (error) {
        console.error(error);
        nav("/owner/venues");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, nav]);

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  // 🔥 Update venue
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!venue.name || !venue.sports || !venue.opentime || !venue.closetime || !venue.price) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/venues/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: venue.name,
            sports: venue.sports,
            opentime: venue.opentime,
            closetime: venue.closetime,
            price: venue.price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Venue updated successfully");
      nav("/owner/venues");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${stadium})` }}
      >
        <div className="bg-black/60 p-6 rounded-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${stadium})` }}
      >
        <div className="bg-black/60 p-6 rounded-xl">
          Venue not found
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Venue
        </h1>

        <label className="block text-sm text-gray-700 mb-1">
          Venue Name
        </label>
        <input
          type="text"
          name="name"
          value={venue.name}
          onChange={handleChange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">
          Sports
        </label>
        <input
          type="text"
          name="sports"
          value={venue.sports}
          onChange={handleChange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">
          Price Per Hour (₹)
        </label>
        <input
          type="number"
          name="price"
          value={venue.price}
          onChange={handleChange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">
          Open Time
        </label>
        <input
          type="time"
          name="opentime"
          value={venue.opentime}
          onChange={handleChange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">
          Close Time
        </label>
        <input
          type="time"
          name="closetime"
          value={venue.closetime}
          onChange={handleChange}
          className="w-full border p-2.5 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Update Venue
        </button>
      </form>
    </div>
  );
}

export default Editvenue;