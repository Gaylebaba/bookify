import { useState } from "react";

function FaqSecion() {

  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "How do I book a sports venue?",
      a: "Create an account, browse available venues, choose your preferred slot, and confirm booking through payment."
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, you can cancel bookings from the booking history before the scheduled time."
    },
    {
      q: "What payment methods are available?",
      a: "Users can pay online through Razorpay or choose cash payment depending on venue availability."
    },
    {
      q: "Where can I see my booking history?",
      a: "All bookings are available in the user dashboard under booking history."
    },
    {
      q: "How can venue owners register venues?",
      a: "Venue owners can register, add venue details and wait for admin approval."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 text-white">

      <h2 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="border border-gray-700 rounded-xl overflow-hidden"
          >

            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left text-lg font-medium hover:bg-gray-800 transition"
            >
              {faq.q}

              <span className="text-xl">
                {open === index ? "-" : "+"}
              </span>
            </button>

            {open === index && (
              <div className="px-5 pb-5 text-gray-300 text-sm">
                {faq.a}
              </div>
            )}

          </div>

        ))}

      </div>

    </section>
  );
}

export default FaqSecion;