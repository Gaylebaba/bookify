import { useNavigate } from "react-router-dom";

function OwnerNavbar() {

  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  return (

    <div className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1
          onClick={() => nav("/owner")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          Bookify
        </h1>

        <div className="flex items-center gap-6">

          <button
            onClick={() => nav("/owner")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Dashboard
          </button>

          <button
            onClick={() => nav("/owner/addv")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Add Venue
          </button>

          <button
            onClick={() => nav("/owner/venues")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Manage Venues
          </button>

          <button
            onClick={() => nav("/owner/bookings")}
            className="text-gray-700 hover:text-indigo-600"
          >
            Bookings
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default OwnerNavbar;