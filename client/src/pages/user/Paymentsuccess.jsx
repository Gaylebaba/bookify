import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { light } from "../../assets";

function Paymentsuccess() {

  const nav = useNavigate();

  useEffect(() => {

    // optional auto redirect after few seconds
    const timer = setTimeout(() => {
      nav("/home");
    }, 5000);

    return () => clearTimeout(timer);

  }, [nav]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your booking has been confirmed successfully.
        </p>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => nav("/home")}
            className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={() => nav("/user/history")}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded font-semibold hover:bg-gray-300 transition"
          >
            View Booking History
          </button>

        </div>

        <p className="text-sm text-gray-400 mt-4">
          Redirecting to home in 5 seconds...
        </p>

      </div>

    </div>
  );
}

export default Paymentsuccess;