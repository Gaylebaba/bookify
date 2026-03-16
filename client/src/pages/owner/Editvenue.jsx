import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OwnerNavbar from "../../components/OwnerNavbar";

function Editvenue() {

  const nav = useNavigate();
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchVenue = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        setVenue(data);

      } catch {
        nav("/owner/venues");
      }

      setLoading(false);

    };

    fetchVenue();

  },[id,nav]);



  const handleChange = (e)=>{
    setVenue({...venue,[e.target.name]:e.target.value});
  };



  const handleSubmit = async (e)=>{

    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/auth/venues/${id}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(venue)
      }
    );

    if(!res.ok){
      alert("Update failed");
      return;
    }

    alert("Venue updated");
    nav("/owner/venues");

  };


  if(loading) return <div className="p-10">Loading...</div>;


  return(

    <div className="min-h-screen bg-gray-50">

      <OwnerNavbar/>

      {/* HEADER */}

      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 py-10 mb-8">

        <div className="max-w-6xl mx-auto px-6 text-white">

          <h1 className="text-3xl font-bold">
            Edit Venue
          </h1>

          <p className="text-indigo-100">
            Update venue details and pricing
          </p>

        </div>

      </div>



      {/* FORM */}

      <div className="max-w-4xl mx-auto px-6 pb-10">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFO CARD */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">

              <div>

                <label className="text-sm text-gray-600">
                  Venue Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={venue.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />

              </div>


              <div>

                <label className="text-sm text-gray-600">
                  Sports
                </label>

                <input
                  type="text"
                  name="sports"
                  value={venue.sports}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />

              </div>

            </div>

          </div>



          {/* PRICE CARD */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-gray-800 mb-4">
              Pricing
            </h2>

            <input
              type="number"
              name="price"
              value={venue.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />

          </div>



          {/* TIME CARD */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-gray-800 mb-4">
              Venue Timing
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="time"
                name="opentime"
                value={venue.opentime}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="time"
                name="closetime"
                value={venue.closetime}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />

            </div>

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Update Venue
          </button>


        </form>

      </div>

    </div>

  );

}

export default Editvenue;