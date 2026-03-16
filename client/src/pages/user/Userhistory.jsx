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



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">

      {/* NAVBAR */}

      <div className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => nav("/home")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Bookify
          </h1>

          <div className="flex items-center gap-6">

            <button onClick={() => nav("/home")} className="text-gray-700 hover:text-indigo-600">
              Home
            </button>

            <button onClick={() => nav("/venues")} className="text-gray-700 hover:text-indigo-600">
              Browse Venues
            </button>

            <button onClick={() => nav("/user/history")} className="text-indigo-600 font-semibold">
              My Bookings
            </button>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </div>


      {/* PAGE HEADER */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Booking History
        </h1>

        <p className="text-gray-600 mb-8">
          View all your past and upcoming bookings
        </p>



        {loading ? (

          <p>Loading...</p>

        ) : bookings.length === 0 ? (

          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-600">
              No bookings found
            </p>

            <button
              onClick={() => nav("/venues")}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
            >
              Book a Venue
            </button>

          </div>

        ) : (

          <div className="grid gap-6">

            {bookings.map((b) => (

              <div
                key={b._id}
                className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
              >

                {/* VENUE TITLE */}

                <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                  {b.venue?.name}
                </h2>

                {/* DETAILS GRID */}

                <div className="grid md:grid-cols-3 gap-4 text-gray-700">

                  <p><strong>Date:</strong> {b.date}</p>

                  <p><strong>Time:</strong> {b.startTime} - {b.endTime}</p>

                  <p><strong>Sport:</strong> {b.sport}</p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </p>

                  <p className="font-semibold text-green-600">
                    ₹ {b.amount}
                  </p>

                </div>


                {/* REVIEW BUTTON */}

                {b.status === "confirmed" && (

                  <div className="mt-5">

                    <button
                      onClick={() => setReviewVenue(b._id)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
                    >
                      Write Review
                    </button>

                  </div>

                )}


                {/* REVIEW FORM */}

                {reviewVenue === b._id && (

                  <div className="mt-6 border-t pt-4">

                    <label className="font-semibold">
                      Rating
                    </label>

                    <div className="flex gap-2 text-2xl my-2">

                      {[1,2,3,4,5].map((star) => (

                        <span
                          key={star}
                          onClick={() => setRating(star)}
                          className={`cursor-pointer ${
                            rating >= star ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>

                      ))}

                    </div>

                    <textarea
                      placeholder="Write your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border rounded-lg p-3 mb-3"
                    />

                    <button
                      onClick={() => submitReview(b.venue._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
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