import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OwnerNavbar from "../../components/OwnerNavbar";

function OwnersetSlot() {

  const nav = useNavigate();
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FETCH VENUE */

  useEffect(() => {

    const fetchVenue = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/auth/venues/${id}`
        );

        const data = await res.json();
        setVenue(data);

      } catch (err) {
        console.error(err);
      }

    };

    fetchVenue();

  }, [id]);



  /* SLOT GENERATOR */

  const generateSlots = (start, end) => {

    const slots = [];

    const toMinutes = (time)=>{
      const [h,m]=time.split(":").map(Number);
      return h*60+m;
    };

    const toTimeString = (minutes)=>{
      const h=Math.floor(minutes/60);
      const m=minutes%60;
      return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
    };

    let current = toMinutes(start);
    const endMinutes = toMinutes(end);

    while(current+60<=endMinutes){
      slots.push(`${toTimeString(current)} - ${toTimeString(current+60)}`);
      current+=60;
    }

    return slots;

  };

  const slots =
    venue && venue.opentime && venue.closetime
      ? generateSlots(venue.opentime, venue.closetime)
      : [];

  const sportsList =
    venue && venue.sports ? venue.sports.split(",") : [];



  /* BLOCK SLOT */

  const handleBlockSlot = async () => {

    if(!selectedSport){
      alert("Select sport first");
      return;
    }

    if(!selectedSlot){
      alert("Select slot");
      return;
    }

    const token = localStorage.getItem("token");
    const [startTime,endTime] = selectedSlot.split(" - ");

    setLoading(true);

    try{

      const res = await fetch(
        "http://localhost:5000/api/auth/owner/block-slot",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({
            venueId:id,
            sport:selectedSport,
            date:selectedDate,
            startTime,
            endTime
          })
        }
      );

      if(!res.ok){
        alert("Failed to block slot");
        return;
      }

      alert("Slot blocked");

    }catch{
      alert("Error");
    }

    setLoading(false);

  };



  return(

    <div className="min-h-screen bg-gray-50">

      <OwnerNavbar/>


      {/* HEADER */}

      <div className="max-w-6xl mx-auto px-6 pt-8">

        <h1 className="text-2xl font-semibold text-gray-800">
          Slot Management
        </h1>

        {venue && (
          <p className="text-gray-500 text-sm mt-1">
            Venue: {venue.name}
          </p>
        )}

      </div>



      {/* MAIN CARD */}

      <div className="max-w-5xl mx-auto px-6 py-8">

        <div className="bg-white rounded-xl shadow border p-8 space-y-6">

          {/* SPORT SELECT */}

          <div>

            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Select Sport
            </h2>

            <div className="flex gap-3 flex-wrap">

              {sportsList.map((s,i)=>(
                <button
                  key={i}
                  onClick={()=>setSelectedSport(s)}
                  className={`px-4 py-2 rounded-lg border text-sm transition
                  ${
                    selectedSport===s
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}

            </div>

          </div>



          {/* DATE */}

          <div>

            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e)=>setSelectedDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />

          </div>



          {/* SLOTS */}

          <div>

            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Available Slots
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {slots.map((slot,index)=>{

                const isBooked = bookedSlots.includes(slot);

                return(

                  <button
                    key={index}
                    disabled={isBooked}
                    onClick={()=>setSelectedSlot(slot)}
                    className={`py-3 rounded-lg border text-sm font-medium transition
                    ${
                      isBooked
                        ? "bg-red-100 text-red-600"
                        : selectedSlot===slot
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {slot}
                  </button>

                );

              })}

            </div>

          </div>



          {/* ACTION BUTTON */}

          <button
            onClick={handleBlockSlot}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            {loading ? "Processing..." : "Block Selected Slot"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default OwnersetSlot;