import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Singlevenue() {

  const { id } = useParams();
  const nav = useNavigate();

  const [venue, setVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const venueRes = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`
        );

        const venueData = await venueRes.json();

        if (venueRes.ok) {
          setVenue(venueData);
        }

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


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };


  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
          reviews.length
        ).toFixed(1)
      : 0;


  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!venue) {
    return <div className="p-10">Venue not found</div>;
  }


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
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => nav("/venues")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Browse Venues
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
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



      {/* PAGE CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() => nav("/venues")}
          className="text-gray-600 hover:text-indigo-600 mb-6"
        >
          ← Back
        </button>


        {/* VENUE CARD */}

        <div className="bg-white rounded-xl shadow p-8 mb-10">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {venue.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">

            <p>
              <span className="font-semibold">Sports:</span> {venue.sports}
            </p>

            <p>
              <span className="font-semibold">Timing:</span>{" "}
              {venue.opentime} - {venue.closetime}
            </p>

            <p className="text-green-600 font-semibold text-lg">
              ₹ {venue.price} / hour
            </p>

            <p className="text-yellow-500 font-semibold">
              ⭐ {averageRating} / 5 ({reviews.length} reviews)
            </p>

          </div>


          {/* FACILITIES */}

          <div className="mt-8">

            <h3 className="font-semibold text-gray-800 mb-3">
              Facilities
            </h3>

            <div className="flex flex-wrap gap-3">

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Parking
              </span>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Flood Lights
              </span>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Drinking Water
              </span>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Washroom
              </span>

            </div>

          </div>


          <button
            onClick={() => nav(`/selecttime/${id}`)}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Book Now
          </button>

        </div>



        {/* REVIEWS */}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Reviews
        </h2>


        {reviews.length === 0 ? (

          <p className="text-gray-600">No reviews yet.</p>

        ) : (

          <div className="space-y-6">

            {reviews.map((r) => (

              <div
                key={r._id}
                className="bg-white shadow rounded-xl p-6"
              >

                <div className="flex justify-between items-center">

                  <p className="text-yellow-500 text-lg">
                    {"⭐".repeat(r.rating)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {r.user?.name}
                  </p>

                </div>

                <p className="mt-3 text-gray-700">
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