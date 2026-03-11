import { useNavigate } from "react-router-dom";

function Navbar() {
    const n = useNavigate();

    return (
        <nav className="absolute top-0 left-0 w-full z-20 px-10 py-6 flex items-center justify-between text-white">
            <h1
                className="text-2xl font-bold tracking-wide cursor-pointer"
                onClick={() => n("/")}
            >
                BOOKIFY
            </h1>

            <div className="hidden md:flex gap-8 text-sm font-medium">
                <span className="cursor-pointer hover:text-blue-400">Games</span>
                <span className="cursor-pointer hover:text-blue-400">Venues</span>
                {/* <span className="cursor-pointer hover:text-blue-400">Coaches</span> */}
                <span className="cursor-pointer hover:text-blue-400">Tournaments</span>
            </div>
             <div className="flex gap-4 items-center">
        <button
          onClick={() => n("/login")}
          className="hover:text-blue-400"
        >
          Login
        </button>

        <button
          onClick={() => n("/regis")}
          className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/20 transition"
        >
          Register
        </button>
      </div>


        </nav>
    );
}

export default Navbar;