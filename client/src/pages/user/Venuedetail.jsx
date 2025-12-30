import { useNavigate } from "react-router-dom";
import { light } from "../../assets";

function Venuedetail() {
  const nav = useNavigate();

  const venue = [{

    id: 1,
    name: "PlayBox Arena",
    location: "nadiad",
    sports: "swimming, Football,Basketball,Volleyball",
  },
  {
    id: 2,
    name: "mahida bhagod",
    location: "nadiad",
    sports: "Badminton, Tennis",
  },
  ];
  return (
      <div className="relative min-h-screen">

      {/* ✅ BACKGROUND IMAGE ONLY */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${light})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />

      {/* ✅ DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ✅ CONTENT (NO BLUR) */}
      <div className="relative z-10 p-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Browse Venues
        </h1>

        <p className="text-gray-200 mb-8">
          Choose a venue and slot
        </p>
       
        {venue.map((v) => (
          <div
            key={v.id}
            className="bg-white p-5 rounded shadow overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-800">
              {v.name}
            </h2>
            <p className="text-gray-600 mt-1">
              📍 {v.location}
            </p>

            <button
              onClick={() => nav(`/selecttime/${v.id}`)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Select Time
            </button>
          </div>

        )

        )}
      </div>
    </div>
  );
}

export default Venuedetail;