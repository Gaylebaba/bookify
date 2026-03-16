import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

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

        const usersRes = await fetch(
          "http://localhost:5000/api/auth/admin/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const usersData = await usersRes.json();


        const venueRes = await fetch(
          "http://localhost:5000/api/auth/venue/all",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const venueData = await venueRes.json();


        const bookingRes = await fetch(
          "http://localhost:5000/api/auth/admin/bookings",
          { headers: { Authorization: `Bearer ${token}` } }
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



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-gray-50">

      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* HEADER */}

        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 text-sm mt-1 mb-8">
          Monitor users, venues and platform earnings
        </p>



        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Total Users"
            value={stats.user}
            color="text-indigo-600"
          />

          <StatCard
            title="Total Venues"
            value={stats.venues}
            color="text-blue-600"
          />

          <StatCard
            title="Pending Venues"
            value={stats.pendingvenue}
            color="text-orange-500"
          />

          <StatCard
            title="Total Commission"
            value={`₹ ${stats.totalcommission}`}
            color="text-green-600"
          />

        </div>



        {/* MANAGEMENT SECTION */}

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Management
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <ActionCard
            title="Manage Users"
            desc="Block or unblock platform users"
            onClick={() => nav("/admin/users")}
          />

          <ActionCard
            title="Manage Venues"
            desc="Approve or reject venue requests"
            onClick={() => nav("/admin/venues")}
          />

          <ActionCard
            title="Commission Analytics"
            desc="View system commission earnings"
            onClick={() => nav("/admin/commission")}
          />

          <ActionCard
            title="Booking Management"
            desc="Monitor all booking activity"
            onClick={() => nav("/admin/bookmanage")}
          />

        </div>

      </div>

    </div>

  );
}



/* KPI CARD */

function StatCard({ title, value, color }) {

  return (

    <div className="bg-white border rounded-xl shadow-sm p-6">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </h2>

    </div>

  );

}



/* ACTION CARD */

function ActionCard({ title, desc, onClick }) {

  return (

    <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">

      <div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-6">
          {desc}
        </p>

      </div>

      <button
        onClick={onClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-fit"
      >
        Open
      </button>

    </div>

  );

}

export default Adminhome;