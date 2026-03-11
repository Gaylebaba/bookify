import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { light } from "../../assets";

function Payment() {

  const nav = useNavigate();
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    setLoading(true);

    try {

      // Create Razorpay Order
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

        description: "Venue Booking Payment",

        order_id: data.order.id,

        handler: async function (response) {

          // Verify payment
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
    <div className="relative min-h-screen flex items-center justify-center p-6">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Razorpay Secure Payment
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Booking ID: {bookingId}
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

      </div>

    </div>
  );
}

export default Payment;