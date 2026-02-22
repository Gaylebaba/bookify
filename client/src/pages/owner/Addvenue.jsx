import { useNavigate } from "react-router-dom";
import { useState } from "react";
import stadium from "../../assets/images/stadium.jpg";

function Addvenue() {

    const nav = useNavigate();

    const [venue, setvenue] = useState({
        name: "",
        sports: "",
        opentime: "",
        closetime: "",
        price: ""
    });

    const setchange = (e) => {
        setvenue({ ...venue, [e.target.name]: e.target.value });
    };

    const handle = (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !venue.name ||
            !venue.sports ||
            !venue.opentime ||
            !venue.closetime ||
            !venue.price
        ) {
            alert("All fields are required");
            return;
        }

        // Price validation
        if (Number(venue.price) <= 0) {
            alert("Price must be greater than 0");
            return;
        }

        // Time validation
        if (venue.closetime <= venue.opentime) {
            alert("Close time must be after open time");
            return;
        }

        const existingvenue = JSON.parse(localStorage.getItem("ovenue")) || [];

        const newvenue = {
            id: Date.now(),
            name: venue.name,
            sports: venue.sports,
            opentime: venue.opentime,
            closetime: venue.closetime,
            price: Number(venue.price),
            approved: false,
        };

        localStorage.setItem(
            "ovenue",
            JSON.stringify([...existingvenue, newvenue])
        );

        alert("Venue added successfully");
        nav("/owner/venues");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${stadium})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Form */}
            <form
                onSubmit={handle}
                className="relative z-10 bg-white/90 backdrop-blur-md w-full max-w-md p-8 rounded-xl shadow-2xl"
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Venue
                </h1>

                {/* Venue Name */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={venue.name}
                    onChange={setchange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Sports Type */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sports Type
                </label>
                <input
                    type="text"
                    name="sports"
                    value={venue.sports}
                    onChange={setchange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Price Per Hour */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Hour (₹)
                </label>
                <input
                    type="number"
                    name="price"
                    value={venue.price}
                    onChange={setchange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Time Section */}
                <div className="flex gap-4 mb-6">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Open Time
                        </label>
                        <input
                            type="time"
                            name="opentime"
                            value={venue.opentime}
                            onChange={setchange}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Close Time
                        </label>
                        <input
                            type="time"
                            name="closetime"
                            value={venue.closetime}
                            onChange={setchange}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Add Venue
                </button>
            </form>
        </div>
    );
}

export default Addvenue;