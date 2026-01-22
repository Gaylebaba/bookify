import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

        localStorage.setItem("ownerv", JSON.stringify([...existingvenue, newvenue])
        );
        alert("venue added succesfully");
        nav("/owner/venues");
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <form onSubmit={handle}
                className="bg-white w-full max-w-md p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    add new venue
                </h1>


                <label className="block mb-2 text-sm font-medium">
                    venue name
                </label>
                name:<input type="text" name="name" onChange={setchange} className="w-full border roundede mb-4" />

                sports:<input type="text" name="sports" onChange={setchange} className="w-full border roundede mb-4" />

                <div className="flex gap-4 mb-4">
                    <div className="w-1/2" >
                        opentime:<input type="time" name="opentime" onChange={setchange} className="w-full border p-2 rounded" />

                    </div>
                    <div>
                        closetime:<input type="time" onChange={setchange} name="closetime" className="w-full border p-2 rounded" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded     hover:-blue-700">
                    add button
                </button>
            </form>
            
        </div>
    );
}


export default Addvenue;