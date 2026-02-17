import { useNavigate } from "react-router-dom";
import { useState } from "react";
import stadium from "../../assets/images/stadium.jpg";

function Addvenue() {

    const nav = useNavigate();

    const [venue, setvenue] = useState({
        name: "",
        sports: "",
        opentime: "",
        closetime: ""
    });

    const setchange = (e) => {
        setvenue({ ...venue, [e.target.name]: e.target.value });
    };

    const handle = (e) => {
        e.preventDefault();

        if (
            !venue.name ||
            !venue.sports ||
            !venue.opentime ||
            !venue.closetime
        ) {
            alert("all  fields required bro");
            return;
        }

        const existingvenue = JSON.parse(localStorage.getItem("ovenue")) || [];

        const newvenue = {
            id: Date.now(),
            ...venue,
            approved: false,
        };

        localStorage.setItem(
            "ownerv",
            JSON.stringify([...existingvenue, newvenue])
        );

        alert("venue added succesfully");
        nav("/owner/venues");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${stadium})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Form Container */}
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
                            onChange={setchange}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Button */}
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
