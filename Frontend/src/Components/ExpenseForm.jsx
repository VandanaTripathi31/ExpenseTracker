import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ExpenseForm({ onSubmit, editingExpense }) {
  const [form, setForm] = useState({
    expenseName: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        ...editingExpense,
        date: editingExpense.date?.substring(0, 10),
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    setForm({
      expenseName: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="expenseName"
          placeholder="Expense Name"
          value={form.expenseName}
          onChange={handleChange}
          className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </motion.form>
  );
}

export default ExpenseForm;
