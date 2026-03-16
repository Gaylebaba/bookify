import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../../components/OwnerNavbar";

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

        if (!res.ok) return;

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


  if (!owner) return null;

  return (

    <div className="min-h-screen bg-gray-100">

      <OwnerNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Owner Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back, <span className="font-semibold text-indigo-600">{owner.name}</span>
          </p>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <StatCard title="Total Venues" value={stats.totalvenue} />
          <StatCard title="Approved Venues" value={stats.approvedvenue} />
          <StatCard title="Pending Venues" value={stats.pendingvenue} />

        </div>


        {/* ACTION CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <ActionCard
            title="Add Venue"
            desc="Register a new sports venue"
            onClick={() => nav("/owner/addv")}
          />

          <ActionCard
            title="Manage Venues"
            desc="Edit venue details and manage slots"
            onClick={() => nav("/owner/venues")}
          />

          <ActionCard
            title="View Bookings"
            desc="Check bookings from users"
            onClick={() => nav("/owner/bookings")}
          />

        </div>

      </div>

    </div>

  );

}


/* ---------- STAT CARD ---------- */

function StatCard({ title, value }) {

  return (

    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-indigo-600 mt-2">
        {value}
      </h2>

    </div>

  );

}


/* ---------- ACTION CARD ---------- */

function ActionCard({ title, desc, onClick }) {

  return (

    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        {desc}
      </p>

      <button
        onClick={onClick}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Open
      </button>

    </div>

  );

}

export default Ownerhome;