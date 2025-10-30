import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ ดึงตะกร้าของผู้ใช้
router.get("/user/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ items: [], total: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ เพิ่มสินค้าเข้าตะกร้า
router.post("/add", async (req, res) => {
  try {
    const { userId, bookId, title, price, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const itemIndex = cart.items.findIndex(i => i.bookId.toString() === bookId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ bookId, title, price, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ ลบสินค้าออกจากตะกร้า
router.delete("/remove/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.bookId.toString() !== bookId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
