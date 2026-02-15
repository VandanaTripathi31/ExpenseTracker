import Expense from "../Models/expenseschema.js";


//ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { expenseName, amount, date, description } = req.body;

    const expense = new Expense({
      user: req.user.id,
      expenseName,
      amount,
      date,
      description,
    });

    await expense.save();

    res.status(201).json({ message: "Expense added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL EXPENSES (USER SPECIFIC)
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
