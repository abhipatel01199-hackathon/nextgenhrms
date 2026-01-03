import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [leaveForm, setLeaveForm] = useState({});

  const loadLeaves = async () => {
    const res = await api.get("/leaves/my");
    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const applyLeave = async () => {
    await api.post("/leaves/apply", leaveForm);
    loadLeaves();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Employee Dashboard</h2>

        <div className="mt-4">
          <button className="btn" onClick={() => api.post("/attendance/check-in")}>Check In</button>
          <button className="btn ml-2" onClick={() => api.post("/attendance/check-out")}>Check Out</button>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">Apply Leave</h3>
          <input type="date" className="input mt-2" onChange={e => setLeaveForm({ ...leaveForm, from: e.target.value })} />
          <input type="date" className="input mt-2" onChange={e => setLeaveForm({ ...leaveForm, to: e.target.value })} />
          <input className="input mt-2" placeholder="Reason" onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })} />
          <button className="btn mt-2" onClick={applyLeave}>Submit</button>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">My Leaves</h3>
          {leaves.map(l => (
            <div key={l._id} className="border p-2 mt-2">
              {l.from.slice(0,10)} → {l.to.slice(0,10)} | {l.status}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}