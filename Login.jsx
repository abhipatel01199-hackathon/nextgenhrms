import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      res.data.role === "ADMIN"
        ? navigate("/admin")
        : navigate("/employee");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input mt-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit} className="btn mt-4 w-full">Login</button>
    </div>
  );
}