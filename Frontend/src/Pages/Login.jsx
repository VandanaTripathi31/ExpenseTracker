import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          New User?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:underline"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
