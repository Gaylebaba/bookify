import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Payment() {

  const nav = useNavigate();
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  const handlePayment = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/payment/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ bookingId })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      const options = {

        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Bookify",
        description: "Sports Venue Booking",
        order_id: data.order.id,

        handler: async function (response) {

          await fetch(
            "http://localhost:5000/api/auth/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId
              })
            }
          );

          alert("Payment Successful!");
          nav("/payment-success");

        },

        theme: {
          color: "#6366f1"
        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      alert("Payment failed");

    }

    setLoading(false);

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


      {/* PAGE */}

      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Secure Payment
          </h1>

          <p className="text-gray-600 mb-6">
            Complete your venue booking using Razorpay.
          </p>


          {/* BOOKING INFO */}

          <div className="bg-gray-50 border rounded-xl p-6 mb-8">

            <p className="text-gray-700 text-sm mb-2">
              Booking Reference
            </p>

            <p className="font-mono text-gray-900 text-lg">
              {bookingId}
            </p>

          </div>


          {/* SECURITY BADGE */}

          <div className="flex justify-center gap-4 mb-8 text-sm text-gray-500">

            <span>🔒 100% Secure</span>
            <span>⚡ Instant Confirmation</span>
            <span>💳 Razorpay Gateway</span>

          </div>


          {/* PAY BUTTON */}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg transition"
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default Payment;