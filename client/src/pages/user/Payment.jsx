import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { light } from "../../assets";

function Payment() {
    const nav = useNavigate();
    const [booking, setbooking] = useState(null);
    const [mode, setmode] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("selectedbooking"));
        if (!saved) {
            nav("/home");
        } else {
            setbooking(saved);
        }
    }, [nav]);

    const confirmbook = () => {
        if (!mode) {
            alert("please select mode");
            return;
        }
        const finalbook = {
            ...booking,
            Paymentmode: mode,
            status: "confirmed",
            date: new Date().toLocaleDateString(),
        };
        localStorage.setItem("lastbook", JSON.stringify(finalbook));

        alert("booking confirmed");

        nav("/home");
    };
    if (!booking) {
        return null;
    }
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

      {/* Card */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Payment
                </h1>
                <div className="mb-4 text-gray-700">
                    <p><strong>Venue ID:</strong> {booking.venueid}</p>
                    <p><strong>Time Slot:</strong> {booking.slot}</p>
                </div>

                <div className="mb-6">
                    <p className="font-semibold mb-2">Select Payment Mode</p>
                    <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="mode" value="cash" onChange={(e) => setmode(e.target.value)} />
                        cash
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="mode"
                            value="online"
                            onChange={(e) => setmode(e.target.value)}
                        />
                        Online
                    </label>
                </div>

                <button
                    onClick={confirmbook}
                    className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
}

export default Payment;
