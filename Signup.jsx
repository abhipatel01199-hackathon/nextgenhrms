import { useState } from "react";
import api from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({ role: "EMPLOYEE" });

  const submit = async () => {
    try {
      await api.post("/auth/signup", form);
      alert("User registered successfully");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>

      <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="input mt-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="input mt-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <select className="input mt-2" onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="EMPLOYEE">Employee</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button onClick={submit} className="btn mt-4 w-full">Signup</button>
    </div>
  );
}