import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold">Dayflow Lite</h1>
      <div>
        {role === "EMPLOYEE" && <button onClick={() => navigate("/employee")} className="mr-4">Dashboard</button>}
        {role === "ADMIN" && <button onClick={() => navigate("/admin")} className="mr-4">Admin</button>}
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  );
}