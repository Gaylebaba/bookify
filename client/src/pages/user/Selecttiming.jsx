import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { light } from "../../assets";

function Selecttiming() {
  const nav = useNavigate();
  const { id } = useParams();

  const [selected, setselected] = useState("");

  const slots = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];

  const handle = () => {
    if (!selected) {
      alert("please select a slot");
      return;
    }
    localStorage.setItem("selectedbooking", JSON.stringify({
      venueid: id,
      slot: selected
    }));
    nav("/payments");
  };
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Select Time Slot
        </h1>
        <p className="text-gray-600 mb-6">
          Venue ID: {id}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {slots.map((slot, index) => (
            <button key={index} onClick={() => setselected(slot)}
              className={`border px-4 py-3 rounded text-left transition
                  ${selected === slot
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white hover:bg-gray-100"
                }`}
            >
              {slot}
            </button>
          ))}
        </div>
        <button
          onClick={handle}
          className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
        >
          Continue to Payment
        </button>
      </div>

    </div>
  );
}

export default Selecttiming;