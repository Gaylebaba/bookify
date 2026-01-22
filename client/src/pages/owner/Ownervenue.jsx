import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Ownervenue() {
    const nav = useNavigate();
    const [venue, setvenue] = useState([]);

    useEffect(() => {
        const ownerv = JSON.parse(localStorage.getItem("ovenue")) || [];
        setvenue(ownerv);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                my venues
            </h1>
            <h2 className="min-h-screen ng-gray-100 p-8">
        list of venues
            </h2>
            {venue.length === 0 ?
                (
                    <p className="text-gray-500">No venues added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {venue.map((v) => (
                            <div
                                key={v.id}
                                className="bg-white p-6 rounded-xl shadow">
                                <h2 className="text-lg font-semibold ">
                                    {v.name}
                                </h2>
                                <p className="text-gray-600">{v.location}</p>
                                <p className="text-sm mt-1">
                                    Sports: {v.sports}
                                </p>
                                <p className="text-sm mt-1">
                                    Timing: {v.opentime} - {v.closetime}
                                </p>

                               

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => nav(`/owner/edit/${v.id}`)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => nav(`/owner/slots/${v.id}`)}
                                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                                    >
                                        Set Slots
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>

                )}
                
        </div>
    );

}


export default Ownervenue;