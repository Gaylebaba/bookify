import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function Adminuser() {

  const nav = useNavigate();

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");

  useEffect(()=>{

    const token = localStorage.getItem("token");
    const logged = JSON.parse(localStorage.getItem("loggeduser"));

    if(!token || !logged || logged.role !== "admin"){
      nav("/login");
      return;
    }

    const fetchUsers = async ()=>{

      const res = await fetch(
        "http://localhost:5000/api/auth/admin/users",
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      const data = await res.json();
      setUsers(data);
      setLoading(false);

    };

    fetchUsers();

  },[nav]);


  const toggleUser = async(id)=>{

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/auth/admin/users/${id}`,
      {
        method:"PUT",
        headers:{ Authorization:`Bearer ${token}` }
      }
    );

    const data = await res.json();

    if(!res.ok){
      alert(data.message);
      return;
    }

    setUsers(users.map(u =>
      u._id===id ? { ...u, blocked:!u.blocked } : u
    ));

  };


  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );


  return(

    <div className="min-h-screen bg-gray-50">

      <AdminNavbar/>

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* HEADER */}

        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>

        <p className="text-gray-500 text-sm mt-1 mb-6">
          Manage platform users and access control
        </p>



        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-80 mb-8"
        />



        {/* USERS */}

        {loading ? (

          <p className="text-gray-500">Loading users...</p>

        ) : filteredUsers.length===0 ? (

          <div className="bg-white p-6 rounded-xl border shadow-sm text-gray-500">
            No users found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {filteredUsers.map(u => (

              <div
                key={u._id}
                className="bg-white border rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition"
              >

                <div>

                  <h2 className="font-semibold text-gray-800">
                    {u.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {u.email}
                  </p>

                  <p className="text-sm mt-1 text-gray-600">
                    Role: <span className="font-medium">{u.role}</span>
                  </p>

                  <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-semibold
                    ${u.blocked
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600"
                    }`}
                  >
                    {u.blocked ? "Blocked" : "Active"}
                  </span>

                </div>


                {u.role !== "admin" && (

                  <button
                    onClick={()=>toggleUser(u._id)}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition
                    ${
                      u.blocked
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
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

    </div>

  );

}

export default Adminuser;