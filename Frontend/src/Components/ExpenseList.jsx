import { motion } from "framer-motion";

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return (
      <p className="text-gray-400 text-center mt-6">
        No expenses added yet.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {expenses.map((expense) => (
        <motion.div
          key={expense._id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-lg hover:shadow-indigo-500/10 transition"
        >
          <h3 className="text-lg font-semibold text-white">
            {expense.expenseName}
          </h3>

          <p className="text-indigo-400 font-bold text-xl mt-2">
            ₹ {expense.amount}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            {expense.date?.substring(0, 10)}
          </p>

          <p className="text-gray-300 mt-2 text-sm">
            {expense.description}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onEdit(expense)}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 transition p-2 rounded-lg text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(expense._id)}
              className="flex-1 bg-red-600 hover:bg-red-700 transition p-2 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ExpenseList;
