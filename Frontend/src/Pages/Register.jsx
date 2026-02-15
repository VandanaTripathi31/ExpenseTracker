import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Account Created");
      navigate("/login");
    } catch (error) {
      toast.error("User already exists");
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
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Username"
            required
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            placeholder="Full Name"
            required
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all">
            Register
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
