import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // 🔐 Role Protection
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
    <div className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-3xl font-bold mb-8">
        Booking History
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-6">

          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white p-5 rounded shadow"
            >

              <p><strong>Venue:</strong> {b.venue?.name}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p>
                <strong>Time:</strong> {b.startTime} - {b.endTime}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    b.status === "confirmed"
                      ? "text-green-600"
                      : b.status === "cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {b.status}
                </span>
              </p>

              <p><strong>Amount:</strong> ₹ {b.amount}</p>

              {/* 🔥 Show review button only if confirmed */}
              {b.status === "confirmed" && (
                <div className="mt-4">

                  <button
                    onClick={() => setReviewVenue(b.venue._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                  >
                    Write Review
                  </button>

                </div>
              )}

              {/* 🔥 Review Form */}
              {reviewVenue === b.venue._id && (
                <div className="mt-4 border-t pt-4">

                  <label className="block mb-2">
                    Rating:
                  </label>

                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="border p-2 rounded mb-3"
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
                    className="w-full border p-2 rounded mb-3"
                  />

                  <button
                    onClick={() => submitReview(b.venue._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
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
  );
}

export default UserHistory;