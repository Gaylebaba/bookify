import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import stadium from "../../assets/images/stadium.jpg";

function Ownerhome() {
  const nav = useNavigate();
  const [owner, setOwner] = useState(null);
  const [stats, setStats] = useState({
    totalvenue: 0,
    approvedvenue: 0,
    pendingvenue: 0,
  });

  useEffect(() => {
    const loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
    const token = localStorage.getItem("token");

    if (!loggeduser || !token) {
      nav("/login");
      return;
    }

    setOwner(loggeduser);

    const fetchOwnerVenues = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/owner/venues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return;
        }

        const approved = data.filter(v => v.approved).length;
        const pending = data.filter(v => !v.approved).length;

        setStats({
          totalvenue: data.length,
          approvedvenue: approved,
          pendingvenue: pending,
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchOwnerVenues();

  }, [nav]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  if (!owner) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${stadium})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-8 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Owner Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Welcome */}
        <p className="mb-8 text-lg">
          Welcome back, <span className="font-semibold">{owner.name}</span>
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Statcard title="Total Venues" value={stats.totalvenue} />
          <Statcard title="Approved Venues" value={stats.approvedvenue} />
          <Statcard title="Pending Venues" value={stats.pendingvenue} />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Actioncard
            title="Add Venue"
            desc="Register a new sports venue"
            onClick={() => nav("/owner/addv")}
          />

          <Actioncard
            title="Manage Venues"
            desc="Edit venue details and manage slots"
            onClick={() => nav("/owner/venues")}
          />
        </div>

      </div>
    </div>
  );
}

/* ----- STAT CARD ----- */

function Statcard({ title, value }) {
  return (
    <div className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-indigo-600 mt-2">
        {value}
      </h2>
    </div>
  );
}

/* ----- ACTION CARD ----- */

function Actioncard({ title, desc, onClick }) {
  return (
    <div className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        {desc}
      </p>

      <button
        onClick={onClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Open
      </button>
    </div>
  );
}

export default Ownerhome;