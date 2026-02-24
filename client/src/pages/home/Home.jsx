import { useNavigate } from "react-router-dom";
import sppic2 from "../../assets/images/sppic2.jpeg";
import Navbar from "../../components/Navbar";

function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${sppic2})` }}
      >

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-indigo-900/80"></div>

        <Navbar />

        <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16">
          <div className="max-w-xl">

            <h1 className="text-5xl font-extrabold leading-tight">
              Book. Play. <span className="text-indigo-400">Repeat.</span>
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Discover nearby sports venues and book instantly with Bookify.
              No calls. No hassle. Just play.
            </p>

            <div className="flex gap-4">

              <button
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("loggeduser"));
                  const token = localStorage.getItem("token");

                  if (!token || !user) {
                    nav("/login");
                    return;
                  }

                  if (user.role === "admin") {
                    nav("/admin");
                  } else if (user.role === "owner") {
                    nav("/owner");
                  } else {
                    nav("/home");
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-lg font-semibold transition active:scale-95"
              >
                Get Started
              </button>

              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    nav("/venues");
                  } else {
                    nav("/login");
                  }
                }}
                className="border border-white/40 hover:bg-white/10 px-8 py-3 rounded-xl text-lg font-semibold transition"
              >
                Browse Venues
              </button>

            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-gray-900 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Bookify?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Find Nearby Venues
            </h3>
            <p className="text-gray-600">
              Explore sports venues around you with complete details and photos.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Instant Booking
            </h3>
            <p className="text-gray-600">
              Choose your slot and confirm booking in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Play Without Hassle
            </h3>
            <p className="text-gray-600">
              No phone calls, no waiting — just show up and play.
            </p>
          </div>

        </div>
      </div>

      <footer className="bg-black text-gray-400 text-center py-6">
        © 2025 Bookify. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;