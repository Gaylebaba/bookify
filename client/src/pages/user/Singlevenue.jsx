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
                // Fetch venue
                const venueRes = await fetch(
                    `http://localhost:5000/api/auth/venues/${id}`
                );
                const venueData = await venueRes.json();
                setVenue(venueData);

                // Fetch reviews
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
                reviews.reduce((sum, r) => sum +Number(r.rating), 0) /
                reviews.length
            ).toFixed(1)
            : 0;

    if (loading) {
        return <p className="text-white p-10">Loading...</p>;
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

            <div className="fixed inset-0 backdrop-blur-xl bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 p-10 text-white max-w-4xl mx-auto">

                {/* Venue Info */}
                <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10 mb-8">
                    <h1 className="text-3xl font-bold mb-3">{venue?.name}</h1>

                    <p><strong>Sports:</strong> {venue?.sports}</p>
                    <p><strong>Time:</strong> {venue?.opentime} - {venue?.closetime}</p>
                    <p className="text-green-400 font-semibold mt-2">
                        ₹ {venue?.price} / hour
                    </p>

                    <div className="mt-4">
                        <p className="text-yellow-400 text-lg">
                            ⭐ {averageRating} / 5 ({reviews.length} reviews)
                        </p>
                    </div>

                    <button
                        onClick={() => nav(`/selecttime/${id}`)}
                        className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Book Now
                    </button>
                </div>

                {/* Reviews */}
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>

                {reviews.length === 0 ? (
                    <p className="text-gray-300">No reviews yet.</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((r) => (
                            <div
                                key={r._id}
                                className="bg-black/40 backdrop-blur-xl p-5 rounded-xl border border-white/10"
                            >
                                <p className="text-yellow-400">
                                    {"⭐".repeat(r.rating)}
                                </p>
                                <p className="mt-2">{r.comment}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    — {r.user?.name}
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