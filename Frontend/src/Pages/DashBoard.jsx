import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import API from "../utils/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (data) => {
    if (editingExpense) {
      await API.put(`/expenses/${editingExpense._id}`, data);
      toast.success("Expense Updated");
      setEditingExpense(null);
    } else {
      await API.post("/expenses", data);
      toast.success("Expense Added");
    }
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await API.delete(`/expenses/${id}`);
    toast.success("Expense Deleted 🗑");
    fetchExpenses();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged Out");
    navigate("/login");
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-3xl font-bold text-indigo-400">
          Expense Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
        
      </motion.div>
      

      <div className="bg-[#1e293b] p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg text-gray-400">Total Expenses</h2>
        <p className="text-4xl font-bold text-indigo-400 mt-2">
          ₹ {total}
        </p>
      </div>

      <ExpenseForm
        onSubmit={handleSubmit}
        editingExpense={editingExpense}
      />

      <ExpenseList
        expenses={expenses}
        onEdit={setEditingExpense}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
