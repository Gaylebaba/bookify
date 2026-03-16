import { useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {

  const nav = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
        <h1
          className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => nav("/admin")}
        >
          Bookify Admin
        </h1>


        {/* NAV LINKS */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => nav("/admin")}
            className={linkClass("/admin")}
          >
            Dashboard
          </button>

          <button
            onClick={() => nav("/admin/users")}
            className={linkClass("/admin/users")}
          >
            Users
          </button>

          <button
            onClick={() => nav("/admin/venues")}
            className={linkClass("/admin/venues")}
          >
            Venues
          </button>

          <button
            onClick={() => nav("/admin/bookmanage")}
            className={linkClass("/admin/bookmanage")}
          >
            Bookings
          </button>

          <button
            onClick={() => nav("/admin/commission")}
            className={linkClass("/admin/commission")}
          >
            Commission
          </button>

        </div>


        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminNavbar;