import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { light } from "../../assets";

function UserHistory() {

  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewVenue, setReviewVenue] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {

    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    if (!loggeduser || !token || loggeduser.role !== "enduser") {
      nav("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/user/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        setBookings(data);

      } catch (error) {
        alert("Something went wrong");
      }

      setLoading(false);
    };

    fetchBookings();

  }, [nav]);

  const submitReview = async (venueId) => {

    const token = localStorage.getItem("token");

    if (!rating || !comment) {
      alert("All fields required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            venueId,
            rating,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Review submitted successfully");

      setReviewVenue(null);
      setComment("");
      setRating(5);

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 p-10 text-white">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            Booking History
          </h1>

          <button
            onClick={() => nav("/home")}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-semibold transition"
          >
            Back
          </button>
        </div>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xl">
            <p className="text-gray-300">
              No bookings found.
            </p>
            <button
              onClick={() => nav("/venues")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Book Now
            </button>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl">

            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl"
              >
                <p><strong>Venue:</strong> {b.venue?.name}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Time:</strong> {b.startTime} - {b.endTime}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      b.status === "confirmed"
                        ? "text-green-400"
                        : b.status === "cancelled"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }
                  >
                    {b.status}
                  </span>
                </p>

                <p><strong>Amount:</strong> ₹ {b.amount}</p>

                {b.status === "confirmed" && (
                  <div className="mt-4">
                    <button
                      onClick={() => setReviewVenue(b.venue._id)}
                      className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
                    >
                      Write Review
                    </button>
                  </div>
                )}

                {reviewVenue === b.venue._id && (
                  <div className="mt-4 border-t border-white/20 pt-4">

                    <label className="block mb-2">Rating:</label>

                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="text-black border p-2 rounded mb-3"
                    >
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>

                    <textarea
                      placeholder="Write your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full text-black border p-2 rounded mb-3"
                    />

                    <button
                      onClick={() => submitReview(b.venue._id)}
                      className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                    >
                      Submit Review
                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default UserHistory;