import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ดึงตะกร้าของผู้ใช้
router.get("/user/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ items: [], total: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// เพิ่มสินค้าเข้าตะกร้า (แก้ไข)
router.post("/add", async (req, res) => {
  try {
    // 1. ดึง image (URL รูปภาพ) มาจาก req.body
    const { userId, bookId, title, price, quantity, image } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const itemIndex = cart.items.findIndex(i => i.bookId.toString() === bookId);

    if (itemIndex > -1) {
      // ถ้ามีสินค้าอยู่แล้ว ให้อัปเดตจำนวน
      cart.items[itemIndex].quantity += quantity;
      
      // 3. (Optional) อัปเดต URL รูปภาพหากยังไม่มี
      if (!cart.items[itemIndex].image && image) {
          cart.items[itemIndex].image = image;
      }

    } else {
      // 2. เพิ่ม image เมื่อ push สินค้าใหม่
      cart.items.push({ bookId, title, price, image, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ลบสินค้าออกจากตะกร้า
router.delete("/remove/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(4.04).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.bookId.toString() !== bookId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ล้างตะกร้าสินค้าทั้งหมดของผู้ใช้ (Clear Cart)
router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // หาทั้งตะกร้าและลบมันทิ้ง
    const deletedCart = await Cart.findOneAndDelete({ userId: userId });

    if (!deletedCart) {
      return res.status(404).json({ message: "ไม่พบตะกร้าสินค้า" });
    }

    res.json({ message: "ล้างตะกร้าสินค้าสำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

