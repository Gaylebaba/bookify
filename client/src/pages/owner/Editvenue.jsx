import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

function Editvenue() {
    const nav = useNavigate();
    const { id } = useParams();

    const [venue, setvenue] = useState(null);

    useEffect(() => {
        const venues = JSON.parse(localStorage.getItem("ownerv")) || [];
        const found = venues.find(v => String(v.id) === String(id));
        setvenue(found);
    }, [id]);

    const handle = (e) => {
        setvenue({ ...venue, [e.target.name]: e.target.value });
    };

    const setchange = (e) => {
        e.preventDefault();

        const venues = JSON.parse(localStorage.getItem("ownerv")) || [];

        const update = venues.map(v =>
            v.id === venue.id ? { ...venue, approved: false } : v
        );

        localStorage.setItem("ownerv", JSON.stringify(update));

        alert("venue updated");
        nav("/owner/venues");
    };

    if (!venue) {
        return (
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${stadium})` }}
            >
                <div className="bg-black/60 p-6 rounded-xl">
                    Venue not found
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${stadium})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <form
                onSubmit={setchange}
                className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Edit Venue
                </h1>

                <label className="block text-sm text-gray-700 mb-1">
                    Venue Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={venue.name}
                    onChange={handle}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <label className="block text-sm text-gray-700 mb-1">
                    Sports
                </label>
                <input
                    type="text"
                    name="sports"
                    value={venue.sports}
                    onChange={handle}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <label className="block text-sm text-gray-700 mb-1">
                    Open Time
                </label>
                <input
                    type="time"
                    name="opentime"
                    value={venue.opentime}
                    onChange={handle}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <label className="block text-sm text-gray-700 mb-1">
                    Close Time
                </label>
                <input
                    type="time"
                    name="closetime"
                    value={venue.closetime}
                    onChange={handle}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Update Venue
                </button>
            </form>
        </div>
    );
}

export default Editvenue;
