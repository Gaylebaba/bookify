import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

function Singlevenue() {

  const { id } = useParams();
  const nav = useNavigate();

  const [venue, setVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        // fetch venue
        const venueRes = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`
        );
        const venueData = await venueRes.json();

        if (venueRes.ok) {
          setVenue(venueData);
        }

        // fetch reviews
        const reviewRes = await fetch(
          `http://localhost:5000/api/auth/venues/${id}/reviews`
        );

        const reviewData = await reviewRes.json();

        if (reviewRes.ok) {
          setReviews(reviewData);
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();

  }, [id]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-white p-10">
        Venue not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stadium})` }}
      />

      {/* Blur overlay */}
      <div className="fixed inset-0 backdrop-blur-xl bg-white/5"></div>

      {/* Content */}
      <div className="relative z-10 p-10 text-white max-w-4xl mx-auto">

        {/* Venue Info */}
        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10 mb-10">

          <button
            onClick={() => nav("/venues")}
            className="mb-4 text-gray-300 hover:text-white"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold mb-4">
            {venue.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-gray-200">

            <p>
              <span className="text-gray-400">Sports:</span>{" "}
              {venue.sports}
            </p>

            <p>
              <span className="text-gray-400">Timing:</span>{" "}
              {venue.opentime} - {venue.closetime}
            </p>

            <p className="text-green-400 font-semibold text-lg">
              ₹ {venue.price} / hour
            </p>

            <p className="text-yellow-400 font-semibold">
              ⭐ {averageRating} / 5 ({reviews.length} reviews)
            </p>

          </div>

          {/* Facilities */}
          <div className="mt-6">

            <h3 className="text-lg font-semibold mb-2">
              Facilities
            </h3>

            <div className="flex flex-wrap gap-3 text-sm">

              <span className="bg-white/10 px-3 py-1 rounded-lg">
                Parking
              </span>

              <span className="bg-white/10 px-3 py-1 rounded-lg">
                Flood Lights
              </span>

              <span className="bg-white/10 px-3 py-1 rounded-lg">
                Drinking Water
              </span>

              <span className="bg-white/10 px-3 py-1 rounded-lg">
                Washroom
              </span>

            </div>

          </div>

          <button
            onClick={() => nav(`/selecttime/${id}`)}
            className="mt-8 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold transition"
          >
            Book Now
          </button>

        </div>

        {/* Reviews */}
        <h2 className="text-2xl font-bold mb-4">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-300">
            No reviews yet.
          </p>
        ) : (

          <div className="space-y-5">

            {reviews.map((r) => (

              <div
                key={r._id}
                className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10"
              >

                <div className="flex items-center justify-between">

                  <p className="text-yellow-400 text-lg">
                    {"⭐".repeat(r.rating)}
                  </p>

                  <p className="text-sm text-gray-400">
                    {r.user?.name}
                  </p>

                </div>

                <p className="mt-3 text-gray-200">
                  {r.comment}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Singlevenue;