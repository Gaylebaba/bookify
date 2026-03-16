import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Selecttiming() {

  const nav = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sport = query.get("sport") || "";

  const [venue, setVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= AUTH + FETCH ================= */

  useEffect(() => {

    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    if (!loggeduser || !token || loggeduser.role !== "enduser") {
      nav("/login");
      return;
    }

    const fetchData = async () => {

      try {

        const venueRes = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`
        );

        const venueData = await venueRes.json();
        setVenue(venueData);

        const bookingRes = await fetch(
          `http://localhost:5000/api/auth/venue/${id}/bookings?date=${selectedDate}&sport=${sport}`
        );

        const bookingData = await bookingRes.json();

        if (bookingRes.ok) {

          const blocked = bookingData
            .filter(
              (b) =>
                b.status === "confirmed" || b.status === "blocked"
            )
            .map((b) => `${b.startTime.trim()} - ${b.endTime.trim()}`);

          setBookedSlots(blocked);

        }

      } catch (error) {
        console.error(error);
      }

    };

    fetchData();

  }, [id, nav, selectedDate, sport]);


  /* ================= SLOT GENERATOR ================= */

  const generateSlots = (start, end) => {

    const slots = [];

    const toMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const toTimeString = (minutes) => {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    let current = toMinutes(start);
    const endMinutes = toMinutes(end);

    while (current + 60 <= endMinutes) {

      slots.push(
        `${toTimeString(current)} - ${toTimeString(current + 60)}`
      );

      current += 60;

    }

    return slots;

  };

  const slots =
    venue && venue.opentime && venue.closetime
      ? generateSlots(venue.opentime, venue.closetime)
      : [];


  /* ================= BOOKING ================= */

  const handleBooking = async () => {

    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    const token = localStorage.getItem("token");
    const [startTime, endTime] = selectedSlot.split(" - ");

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            venueId: id,
            sport,
            date: selectedDate,
            startTime,
            endTime,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      nav(`/payments/${data.booking._id}`);

    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);

  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <div className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => nav("/home")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Bookify
          </h1>

          <div className="flex items-center gap-6">

            <button
              onClick={() => nav("/home")}
              className="text-gray-700 hover:text-indigo-600"
            >
              Home
            </button>

            <button
              onClick={() => nav("/venues")}
              className="text-gray-700 hover:text-indigo-600"
            >
              Browse Venues
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="text-gray-700 hover:text-indigo-600"
            >
              My Bookings
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </div>


      {/* CONTENT */}

      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Select Date & Time
        </h1>

        {/* VENUE INFO */}

        {venue && (

          <div className="bg-white p-6 rounded-xl shadow mb-6">

            <p className="text-gray-700">
              <strong>Venue:</strong> {venue.name}
            </p>

            <p className="text-indigo-600 font-semibold">
              Sport: {sport}
            </p>

            <p className="text-green-600 font-semibold">
              ₹ {venue.price} / hour
            </p>

          </div>

        )}


        {/* DATE */}

        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>

          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot("");
            }}
            className="border rounded-lg px-3 py-2 w-full"
          />

        </div>


        {/* SLOTS */}

        <div className="grid grid-cols-2 gap-4 mb-8">

          {slots.map((slot, index) => {

            const isBooked = bookedSlots.includes(slot);

            return (

              <button
                key={index}
                disabled={isBooked}
                onClick={() => !isBooked && setSelectedSlot(slot)}
                className={`p-4 rounded-lg border text-left transition font-medium

                ${isBooked
                    ? "bg-red-100 border-red-300 text-red-600 cursor-not-allowed"
                    : selectedSlot === slot
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white hover:border-indigo-400"
                  }`}
              >

                <div className="flex justify-between">

                  <span>{slot}</span>

                  {isBooked && (
                    <span className="text-sm font-semibold">
                      Booked
                    </span>
                  )}

                  {!isBooked && selectedSlot === slot && (
                    <span className="text-sm font-semibold">
                      Selected
                    </span>
                  )}

                </div>

              </button>

            );

          })}

        </div>


        {/* CONTINUE */}

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>

      </div>

    </div>

  );

}

export default Selecttiming;