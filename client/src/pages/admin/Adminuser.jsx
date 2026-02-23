import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Adminuser() {

  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if (!token || !logged || logged.role !== "admin") {
      nav("/login");
      return;
    }

    const fetchUsers = async () => {
      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert("Failed to fetch users");
          return;
        }

        setUsers(data);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchUsers();

  }, [nav]);

  const toggleUser = async (id) => {

    const token = localStorage.getItem("token");

    try {

      const res = await fetch(
        `http://localhost:5000/api/auth/admin/users/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Update UI instantly
      setUsers(users.map(u =>
        u._id === id ? { ...u, blocked: !u.blocked } : u
      ));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#3b0764] p-10 text-white">

      <h1 className="text-4xl font-bold mb-10">
        User Management
      </h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-purple-200">No users found</p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {users.map((u) => (

            <div
              key={u._id}
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

              {u.role !== "admin" && (
                <button
                  onClick={() => toggleUser(u._id)}
                  className={`px-5 py-2 rounded-lg font-semibold shadow-md transition ${
                    u.blocked
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  {u.blocked ? "Unblock" : "Block"}
                </button>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Adminuser;