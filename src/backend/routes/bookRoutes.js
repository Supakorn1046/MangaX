import express from "express";
import Book from "../models/Book.js";
const router = express.Router();

// ดึงหนังสือทั้งหมด
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// เพิ่มหนังสือใหม่
router.post("/", async (req, res) => {
  try {
    // 💡 ควรมีการตรวจสอบข้อมูลที่นี่ก่อน
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ เพิ่ม: ลบหนังสือตาม ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 💡 ตอบกลับว่าลบสำเร็จแล้ว
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    // 400 Bad Request ถ้า ID ที่ส่งมาไม่ถูกต้อง (Invalid ObjectId)
    res.status(500).json({ message: error.message });
  }
});

// ✅ เพิ่ม: ดึงหนังสือตาม ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    // 400 Bad Request ถ้า ID ที่ส่งมาไม่ถูกต้อง (Invalid ObjectId)
    res.status(500).json({ message: error.message });
  }
});

// ✅ เพิ่ม: อัปเดตหนังสือตาม ID
router.put("/:id", async (req, res) => {
  try {
    // 💡 ใช้ findByIdAndUpdate เพื่ออัปเดตข้อมูล
    // { new: true } หมายถึงให้คืนค่าเอกสารที่ถูกอัปเดตแล้วกลับมา
    // { runValidators: true } หมายถึงตรวจสอบตาม Mongoose Schema (เช่น title, price ต้องมี)
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 สำหรับ Validation Error
  }
});

export default router;