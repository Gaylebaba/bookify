
import { sppic1 } from "../../assets";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${sppic1})` }}
    >

      <Navbar />

      <div className="relative z-10 flex items-center min-h-screen px-10">
      <div className="max-w-xl text-white">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          The easiest way <br />
          to book <span className="text-blue-400">sports venues</span>
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Explore nearby turfs, grounds and arenas.
          Book instantly, play more.</p>

        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition">
          Start Booking

        </button>
      </div>
    </div>

    </div>
  );
}
export default Home;