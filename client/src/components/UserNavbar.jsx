import { useNavigate } from "react-router-dom";

function UserNavbar() {

  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");
    nav("/login");
  };

  return (

    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => nav("/home")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          Bookify
        </h1>


        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <button
            onClick={() => nav("/home")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </button>

          <button
            onClick={() => nav("/venues")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Browse Venues
          </button>

          <button
            onClick={() => nav("/user/history")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            My Bookings
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>

        </nav>

      </div>

    </header>

  );
}

export default UserNavbar;