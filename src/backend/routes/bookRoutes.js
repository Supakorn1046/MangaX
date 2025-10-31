import express from "express";
import Book from "../models/Book.js";
import Order from "../models/Order.js";
const router = express.Router();

// GET /api/books/bestsellers
router.get("/bestsellers", async (req, res) => {
  try {
    const bestSellers = await Order.aggregate([
      // 2.1. แยกสินค้า (items) ในแต่ละ Order ออกมาเป็นเอกสารย่อย
      { $unwind: "$items" },
      
      // 2.2. จัดกลุ่มตาม bookId และนับยอดขาย (quantity)
      {
        $group: {
          _id: "$items.bookId",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      
      // 2.3. เรียงลำดับจากมากไปน้อย
      { $sort: { totalSold: -1 } },
      
      // 2.4. เอาแค่ 10 อันดับแรก
      { $limit: 10 },
      
      // 2.5. เชื่อม (lookup) กับ collection 'books' เพื่อดึงข้อมูลหนังสือ
      {
        $lookup: {
          from: "books", // (ชื่อ collection ของ Book model)
          localField: "_id", // (bookId จาก $group)
          foreignField: "_id", // (field ที่ตรงกันใน 'books')
          as: "bookDetails"
        }
      },
      
      // 2.6. $lookup จะคืนค่าเป็น array, ให้ $unwind เพื่อให้เหลือ object เดียว
      { $unwind: "$bookDetails" },
      
      // 2.7. เลือกฟิลด์ที่ต้องการส่งกลับไป (ข้อมูลหนังสือ)
      {
        $project: {
          _id: "$bookDetails._id",
          title: "$bookDetails.title",
          author: "$bookDetails.author",
          price: "$bookDetails.price",
          category: "$bookDetails.category",
          image: "$bookDetails.image",
          stock: "$bookDetails.stock",
          createdAt: "$bookDetails.createdAt"
          // totalSold: "$totalSold" // (ส่งยอดขายไปด้วยก็ได้ถ้าอยาก)
        }
      }
    ]);
    
    res.json(bestSellers);

  } catch (error) {
    res.status(500).json({ message: "Error fetching bestsellers: " + error.message });
  }
});
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