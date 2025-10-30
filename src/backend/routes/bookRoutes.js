import express from "express";
import Book from "../models/Book.js";
const router = express.Router();

// ดึงหนังสือทั้งหมด
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// เพิ่มหนังสือใหม่
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  const saved = await newBook.save();
  res.json(saved);
});

export default router;
