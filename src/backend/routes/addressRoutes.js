import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// ✅ ดึงที่อยู่ทั้งหมดของผู้ใช้
router.get("/user/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ เพิ่มที่อยู่ใหม่
router.post("/", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ อัปเดตที่อยู่
router.put("/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ ลบที่อยู่
router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
