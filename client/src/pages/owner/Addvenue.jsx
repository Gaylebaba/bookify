import { useNavigate } from "react-router-dom";
import { useState } from "react";
import stadium from "../../assets/images/stadium.jpg";

function Addvenue() {
  const nav = useNavigate();

  const [venue, setVenue] = useState({
    name: "",
    sports: "",
    opentime: "",
    closetime: "",
    price: ""
  });

  const [loading, setLoading] = useState(false);

  const setchange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handle = async (e) => {
    e.preventDefault();

    if (
      !venue.name ||
      !venue.sports ||
      !venue.opentime ||
      !venue.closetime ||
      !venue.price
    ) {
      alert("All fields are required");
      return;
    }

    if (Number(venue.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (venue.closetime <= venue.opentime) {
      alert("Close time must be after open time");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/venue",
        {
          method: "POST",
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
        alert(data.message || "Failed to add venue");
        setLoading(false);
        return;
      }

      alert("Venue added successfully (Pending Admin Approval)");
      nav("/owner/venues");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handle}
        className="relative z-10 bg-white/90 backdrop-blur-md w-full max-w-md p-8 rounded-xl shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Venue
        </h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Venue Name
        </label>
        <input
          type="text"
          name="name"
          value={venue.name}
          onChange={setchange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Sports Available
        </label>

        <div className="flex flex-wrap gap-2 mb-4">

          {["Cricket", "Football", "Badminton", "Basketball", "Tennis"].map((sport) => (

            <button
              type="button"
              key={sport}
              onClick={() => {

                let sportsArray = venue.sports ? venue.sports.split(",") : [];

                if (sportsArray.includes(sport)) {
                  sportsArray = sportsArray.filter((s) => s !== sport);
                } else {
                  sportsArray.push(sport);
                }

                setVenue({ ...venue, sports: sportsArray.join(",") });

              }}
              className={`px-3 py-1 rounded-lg border text-sm transition
      ${venue.sports.split(",").includes(sport)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-gray-100"
                }`}
            >
              {sport}

            </button>

          ))}

        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Per Hour (₹)
        </label>
        <input
          type="number"
          name="price"
          value={venue.price}
          onChange={setchange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Open Time
            </label>
            <input
              type="time"
              name="opentime"
              value={venue.opentime}
              onChange={setchange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Close Time
            </label>
            <input
              type="time"
              name="closetime"
              value={venue.closetime}
              onChange={setchange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Adding..." : "Add Venue"}
        </button>
      </form>
    </div>
  );
}

export default Addvenue;