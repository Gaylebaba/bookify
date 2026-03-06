import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect,} from "react";
import { light } from "../../assets";

function OwnersetSlot() {

  const nav = useNavigate();
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= AUTH + FETCH VENUE ================= */

  useEffect(() => {

    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    if (!loggeduser || !token || loggeduser.role !== "owner") {
      nav("/login");
      return;
    }

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

  }, [id, nav]);

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings =async () => {

    if (!selectedSport) return;

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/auth/owner/venue/${id}/bookings`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      if (res.ok) {

        const takenSlots = data
          .filter(
            (b) =>
              b.date === selectedDate &&
              b.sport === selectedSport &&
              (b.status === "confirmed" || b.status === "blocked")
          )
          .map((b) => `${b.startTime} - ${b.endTime}`);

        setBookedSlots(takenSlots);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedDate, selectedSport, id]);

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

  const sportsList =
    venue && venue.sports ? venue.sports.split(",") : [];

  /* ================= BLOCK SLOT ================= */

  const handleBlockSlot = async () => {

    if (!selectedSport) {
      alert("Please select sport first");
      return;
    }

    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    const token = localStorage.getItem("token");
    const [startTime, endTime] = selectedSlot.split(" - ");

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/owner/block-slot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            venueId: id,
            sport: selectedSport,
            date: selectedDate,
            startTime,
            endTime
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      alert("Slot blocked successfully");

      setSelectedSlot("");
      fetchBookings();

    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)"
        }}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Block Slot (Owner)
        </h1>

        {venue && (
          <div className="mb-4">

            <p className="text-gray-600">
              <strong>Venue:</strong> {venue.name}
            </p>

            <div className="mt-3">

              <p className="text-sm text-gray-700 mb-1">
                <strong>Select Sport</strong>
              </p>

              <div className="flex gap-2 flex-wrap">

                {sportsList.map((s, i) => (

                  <button
                    key={i}
                    onClick={() => {
                      setSelectedSport(s);
                      setSelectedSlot("");
                    }}
                    className={`px-3 py-1 rounded-lg border text-sm transition
                    ${selectedSport === s
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-100"
                      }`}
                  >
                    {s}
                  </button>

                ))}

              </div>

            </div>

          </div>
        )}

        <label className="block text-sm text-gray-700 mb-1">
          Select Date
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot("");
          }}
          className="w-full border p-2.5 rounded-lg mb-6"
        />

        <div className="grid grid-cols-1 gap-4 mb-6">

          {slots.map((slot, index) => {

            const isBooked = bookedSlots.includes(slot);

            return (
              <button
                key={index}
                disabled={isBooked || !selectedSport}
                onClick={() => !isBooked && setSelectedSlot(slot)}
                className={`border px-4 py-3 rounded text-left transition
                ${isBooked
                    ? "bg-red-200 text-red-600 cursor-not-allowed"
                    : selectedSlot === slot
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {slot} {isBooked && "(Unavailable)"}
              </button>
            );

          })}

        </div>

        <button
          onClick={handleBlockSlot}
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
        >
          {loading ? "Processing..." : "Block Slot"}
        </button>

      </div>

    </div>
  );
}

export default OwnersetSlot;