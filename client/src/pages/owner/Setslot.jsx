import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

function Setslot() {
  const { id } = useParams();
  const nav = useNavigate();

  const [slot, setslot] = useState({
    date: "",
    starttime: "",
    endtime: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`slots_${id}`));
    if (saved) setslot(saved);
  }, [id]);

  const handlechange = (e) => {
    setslot({ ...slot, [e.target.name]: e.target.value });
  };

  const saveslot = (e) => {
    e.preventDefault();

    if (!slot.date || !slot.starttime || !slot.endtime) {
      alert("All fields are required");
      return;
    }

    localStorage.setItem(`slots_${id}`, JSON.stringify(slot));
    alert("Slot saved successfully");
    nav("/owner/venues");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <form
        onSubmit={saveslot}
        className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Set Slots (Venue ID: {id})
        </h1>

        <label className="block text-sm text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={slot.date}
          onChange={handlechange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">
          Start Time
        </label>
        <input
          type="time"
          name="starttime"
          value={slot.starttime}
          onChange={handlechange}
          className="w-full border p-2.5 rounded-lg mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">
          End Time
        </label>
        <input
          type="time"
          name="endtime"
          value={slot.endtime}
          onChange={handlechange}
          className="w-full border p-2.5 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition"
        >
          Save Slot
        </button>
      </form>
    </div>
  );
}

export default Setslot;
