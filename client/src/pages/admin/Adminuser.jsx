import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Adminuser() {

  const nav = useNavigate();
  const [users, setuser] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("loggeduser"));

    if (!admin || admin.role !== "admin") {
      nav("/login");
      return;
    }

    const storeduser = JSON.parse(localStorage.getItem("users")) || [];
    setuser(storeduser);

  }, [nav]);

  const toggle = (id) => {

    const updated = users.map((u) =>
      u.id === id ? { ...u, blocked: !u.blocked } : u
    );

    localStorage.setItem("users", JSON.stringify(updated));
    setuser(updated);
  };

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-10">
        User Management
      </h1>

      {users.length === 0 ? (
        <p className="text-purple-200">No users found</p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {users.map((u) => (
            <div
              key={u.id}
              className="bg-[#4c1d95] p-6 rounded-xl shadow-lg flex justify-between items-center"
            >

              <div>
                <h2 className="text-lg font-semibold">
                  {u.name}
                </h2>

                <p className="text-sm text-purple-200">
                  {u.email}
                </p>

                <p className="text-sm mt-1">
                  Role: <span className="font-medium">{u.role}</span>
                </p>

                <p className={`mt-2 text-sm font-semibold ${
                  u.blocked ? "text-red-400" : "text-green-400"
                }`}>
                  Status: {u.blocked ? "Blocked" : "Active"}
                </p>
              </div>

              <button
                onClick={() => toggle(u.id)}
                className={`px-5 py-2 rounded-lg font-semibold shadow-md transition ${
                  u.blocked
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {u.blocked ? "Unblock" : "Block"}
              </button>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}

export default Adminuser;
