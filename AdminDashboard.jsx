import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [leaves, setLeaves] = useState([]);

  const loadData = async () => {
    const dash = await api.get("/admin/dashboard");
    setStats(dash.data);

    const allLeaves = await api.get("/leaves/my"); // temp reuse
    setLeaves(allLeaves.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateLeave = async (id, status) => {
    await api.put(`/admin/leave/${id}`, { status });
    loadData();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <p>Total Employees: {stats.employees}</p>
        <p>Pending Leaves: {stats.pendingLeaves}</p>

        <h3 className="font-bold mt-6">Leave Requests</h3>
        {leaves.map(l => (
          <div key={l._id} className="border p-2 mt-2">
            {l.reason} - {l.status}
            <button className="btn ml-2" onClick={() => updateLeave(l._id, "Approved")}>Approve</button>
            <button className="btn ml-2 bg-red-600" onClick={() => updateLeave(l._id, "Rejected")}>Reject</button>
          </div>
        ))}
      </div>
    </>
  );
}