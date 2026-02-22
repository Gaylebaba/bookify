import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { light } from "../../assets";

function Selecttiming() {
  const nav = useNavigate();
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch venue details
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`
        );
        const data = await res.json();
        setVenue(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVenue();
  }, [id]);

  // 🔥 Generate 1-hour slots dynamically
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

  // 🔥 Create booking
  const handleBooking = async () => {
    if (!selected) {
      alert("Please select a slot");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    const [startTime, endTime] = selected.split(" - ");

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
            date: new Date().toISOString().split("T")[0],
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
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

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

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Select Time Slot
        </h1>

        {venue && (
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Venue:</strong> {venue.name}
            </p>
            <p className="text-green-600 font-semibold">
              ₹ {venue.price} / hour
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-6">
          {slots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelected(slot)}
              className={`border px-4 py-3 rounded text-left transition ${
                selected === slot
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {slot}
            </button>
          ))}
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