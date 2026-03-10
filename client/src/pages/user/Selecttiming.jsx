import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { light } from "../../assets";

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
        // Fetch venue details
        const venueRes = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`
        );
        const venueData = await venueRes.json();
        setVenue(venueData);

        // Fetch bookings for selected date
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

  /* ================= HANDLE BOOKING ================= */

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
            sport: sport,
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

  /* ================= UI ================= */

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Select Date & Time
        </h1>

        {venue && (
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Venue:</strong> {venue.name}
            </p>
            <p className="text-blue-600 font-semibold">
              Sport: {sport}
            </p>
            <p className="text-green-600 font-semibold">
              ₹ {venue.price} / hour
            </p>
          </div>
        )}

        {/* 🔥 Date Picker */}
        <label className="block text-sm text-gray-700 mb-1">
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
          className="w-full border p-2.5 rounded-lg mb-6"
        />

        {/* 🔥 Slots */}
        <div className="grid grid-cols-1 gap-4 mb-6">

          {slots.map((slot, index) => {

            const isBooked = bookedSlots.includes(slot);

            return (
              <button
                key={index}
                disabled={isBooked}
                onClick={() => !isBooked && setSelectedSlot(slot)}
                className={`border px-4 py-3 rounded-lg text-left transition font-medium

        ${isBooked
                    ? "bg-red-200 text-red-700 border-red-300 cursor-not-allowed"
                    : selectedSlot === slot
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-green-50 hover:bg-green-100 border-green-200"
                  }`}
              >

                <div className="flex justify-between items-center">

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

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>

      </div>
    </div>
  );
}

export default Selecttiming;