import express from "express";
import { addExpense, deleteExpense, getExpenses, updateExpense } from "../Controller/expresscontroller.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

export default router;
