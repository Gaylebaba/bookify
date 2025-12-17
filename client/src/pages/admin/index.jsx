function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-2">
          Welcome Admin
        </h1>
        <p className="text-gray-600">
          Control users, venues, and platform settings.
        </p>
      </div>
    </div>
  );
}

export default Admin;
