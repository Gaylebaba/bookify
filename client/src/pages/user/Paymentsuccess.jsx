import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Paymentsuccess() {

  const nav = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      nav("/home");
    }, 5000);

    return () => clearTimeout(timer);

  }, [nav]);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <div className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => nav("/home")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Bookify
          </h1>

          <div className="flex items-center gap-6">

            <button
              onClick={() => nav("/home")}
              className="text-gray-700 hover:text-indigo-600"
            >
              Home
            </button>

            <button
              onClick={() => nav("/venues")}
              className="text-gray-700 hover:text-indigo-600"
            >
              Browse Venues
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="text-gray-700 hover:text-indigo-600"
            >
              My Bookings
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </div>


      {/* SUCCESS PAGE */}

      <div className="flex items-center justify-center py-24 px-6">

        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-10 text-center">

          {/* SUCCESS ICON */}

          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">

              <span className="text-3xl text-green-600">
                ✓
              </span>

            </div>

          </div>


          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Successful
          </h1>

          <p className="text-gray-600 mb-8">
            Your venue booking has been confirmed successfully.
          </p>


          {/* ACTION BUTTONS */}

          <div className="flex flex-col gap-3">

            <button
              onClick={() => nav("/home")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Go to Home
            </button>

            <button
              onClick={() => nav("/user/history")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              View Booking History
            </button>

          </div>


          <p className="text-sm text-gray-400 mt-6">
            Redirecting to home in 5 seconds...
          </p>

        </div>

      </div>

    </div>

  );

}

export default Paymentsuccess;