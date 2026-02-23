import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Adminhome() {

  const nav = useNavigate();

  const [stats, setStats] = useState({
    user: 0,
    venues: 0,
    pendingvenue: 0,
    totalcommission: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if (!token || !logged || logged.role !== "admin") {
      nav("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {

        // USERS
        const usersRes = await fetch(
          "http://localhost:5000/api/auth/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const usersData = await usersRes.json();

        // VENUES
        const venueRes = await fetch(
          "http://localhost:5000/api/auth/venue/all",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const venueData = await venueRes.json();

        // BOOKINGS
        const bookingRes = await fetch(
          "http://localhost:5000/api/auth/admin/bookings",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const bookingData = await bookingRes.json();

        const pendingvenue = venueData.filter(v => !v.approved).length;

        const totalcommission = bookingData.reduce(
          (sum, b) => sum + (b.commission || 0),
          0
        );

        setStats({
          user: usersData.length,
          venues: venueData.length,
          pendingvenue,
          totalcommission,
        });

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchDashboard();

  }, [nav]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <div className="flex justify-between items-center mb-14">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <StatCard title="Total Users" value={stats.user} />
            <StatCard title="Total Venues" value={stats.venues} />
            <StatCard title="Pending Venues" value={stats.pendingvenue} />
            <StatCard title="Total Commission" value={`₹ ${stats.totalcommission}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ActionCard
              title="Manage Users"
              desc="View, block or unblock registered users"
              onClick={() => nav("/admin/users")}
            />
            <ActionCard
              title="Manage Venues"
              desc="Approve or reject venue registrations"
              onClick={() => nav("/admin/venues")}
            />
            <ActionCard
              title="Commission Analytics"
              desc="Track system commission and reports"
              onClick={() => nav("/admin/commission")}
            />
            <ActionCard
              title="Booking Management"
              desc="Monitor all booking activity"
              onClick={() => nav("/admin/bookmanage")}
            />
          </div>
        </>
      )}

    </div>
  );
}

/* STAT CARD */

function StatCard({ title, value }) {
  return (
    <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg">
      <p className="text-sm text-purple-200">{title}</p>
      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

/* ACTION CARD */

function ActionCard({ title, desc, onClick }) {
  return (
    <div className="bg-[#4c1d95] p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold mb-3">
          {title}
        </h3>
        <p className="text-sm text-purple-200 mb-6">
          {desc}
        </p>
      </div>
      <button
        onClick={onClick}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-500 transition shadow-md w-fit"
      >
        Open
      </button>
    </div>
  );
}

export default Adminhome;