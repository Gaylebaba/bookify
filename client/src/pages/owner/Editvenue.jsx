import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Editvenue() {
    const nav = useNavigate();
    const { id } = useParams();
    

    const [venue, setvenue] = useState(null);

    useEffect(() => {
        const venues = JSON.parse(localStorage.getItem("ovenue")) || [];
        const found = venues.find(v => String(v.id) === (id));
        setvenue(found);
    }, [id]);
    const handle = (e) => {
        setvenue({ ...venue, [e.target.name]: e.target.value });
    };
    const setchange = (e) => {
        e.preventDefault();

        const venues = JSON.parse(localStorage.getItem("ovenue")) || [];
        const update = venues.map(v => {
            return v.id === venue.id ? { ...venue, approved: false } : v
        });
        localStorage.setItem("ovenue", JSON.stringify(update));
        alert("venue updated");
        nav("/owner/venue");
    };
    if (!venue) {
        return <p>venue not found</p>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form action="" onSubmit={setchange} className="bg-white p-6 rounded shadow w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Edit Venue
                </h1>
                venue name <input type="text" name="name" value={venue.name} onChange={handle} className="w-full border p-2 rounded" />
                sports <input type="text" name="sports" value={venue.sports} onChange={handle} className="w-full border p-2 rounded" />
                opentime <input type="time" name="opentime" value={venue.opentime} onChange={handle} className="w-full border p-2 rounded" />
                closetime <input type="time" name="closetime" value={venue.closetime} onChange={handle} className="w-full border p-2 rounded" />

                <button type="submit"  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    update venue
                </button>
            </form>

        </div>
        
    );
}


export default Editvenue;

