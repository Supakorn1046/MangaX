import express from "express";
import Order from "../models/Order.js";
import Book from "../models/Book.js"; 

const router = express.Router();

// (เพิ่ม) GET / (ดึง Order ทั้งหมด)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ดึงประวัติการสั่งซื้อทั้งหมดของผู้ใช้
router.get("/user/:userId", async (req, res) => {
  try {
    // ค้นหา Order ทั้งหมดที่ตรงกับ userId
    const orders = await Order.find({ userId: req.params.userId })
                              .sort({ createdAt: -1 }); 

    if (!orders) {
      return res.json([]); 
    }
    
    // ส่งข้อมูลประวัติการซื้อกลับไป
    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { userId, items, total, addressId } = req.body;

  try {
    // 2. ตรวจสอบสต็อกสินค้าก่อน (Validation)
    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({ message: `ไม่พบสินค้า: ${item.title}` });
      }
      if (book.stock < item.quantity) {
        return res.status(400).json({ 
          message: `สินค้า '${item.title}' มีไม่เพียงพอ (เหลือ ${book.stock} ชิ้น)` 
        });
      }
    }

    // 3. ถ้าสต็อกพอ ให้ทำการ "ตัดสต็อก" (Update)
    for (const item of items) {
      await Book.findByIdAndUpdate(item.bookId, { 
        $inc: { stock: -item.quantity } 
      });
    }

    // 4. สร้างคำสั่งซื้อ (Order)
    const newOrder = new Order({
      userId,
      items,
      total,
      addressId,
      paymentMethod: req.body.paymentMethod || "QR Code",
      paymentStatus: "Paid",
      orderStatus: "Processing"
    });
    
    const savedOrder = await newOrder.save();
    
    // 5. ส่ง Order ที่บันทึกแล้วกลับไป
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่ Server: " + error.message });
  }
});


export default router;