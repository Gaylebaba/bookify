import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OwnerNavbar from "../../components/OwnerNavbar";

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
          body: JSON.stringify(venue),
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

      alert("Something went wrong");

    }

    setLoading(false);

  };


  return (

    <div className="min-h-screen bg-gray-100">

      <OwnerNavbar />


      {/* HERO HEADER */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-14">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-2">
            Add New Venue
          </h1>

          <p className="text-indigo-100 text-lg">
            Register your sports venue and start accepting bookings
          </p>

        </div>

      </div>



      {/* FORM SECTION */}

      <div className="max-w-3xl mx-auto px-6 py-10">

        <form
          onSubmit={handle}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
        >


          {/* NAME */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Venue Name
            </label>

            <input
              type="text"
              name="name"
              value={venue.name}
              onChange={setchange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />

          </div>



          {/* SPORTS */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Sports Available
            </label>

            <div className="flex flex-wrap gap-2">

              {["Cricket","Football","Badminton","Basketball","Tennis"].map((sport) => (

                <button
                  type="button"
                  key={sport}
                  onClick={() => {

                    let sportsArray = venue.sports ? venue.sports.split(",") : [];

                    if (sportsArray.includes(sport)) {
                      sportsArray = sportsArray.filter(s => s !== sport);
                    } else {
                      sportsArray.push(sport);
                    }

                    setVenue({ ...venue, sports: sportsArray.join(",") });

                  }}
                  className={`px-4 py-1 rounded-full text-sm border transition
                  ${
                    venue.sports.split(",").includes(sport)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >

                  {sport}

                </button>

              ))}

            </div>

          </div>



          {/* PRICE */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price Per Hour (₹)
            </label>

            <input
              type="number"
              name="price"
              value={venue.price}
              onChange={setchange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />

          </div>



          {/* TIME */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Open Time
              </label>

              <input
                type="time"
                name="opentime"
                value={venue.opentime}
                onChange={setchange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Close Time
              </label>

              <input
                type="time"
                name="closetime"
                value={venue.closetime}
                onChange={setchange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />

            </div>

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Adding Venue..." : "Add Venue"}
          </button>


        </form>

      </div>

    </div>

  );

}

export default Addvenue;