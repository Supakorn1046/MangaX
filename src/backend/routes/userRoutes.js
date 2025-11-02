import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'; // นำเข้า bcrypt สำหรับเข้ารหัสและเปรียบเทียบรหัสผ่าน

const router = express.Router();

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select('-password'); // ไม่ส่งรหัสผ่านกลับไป
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// สมัครสมาชิก (เพิ่มผู้ใช้ใหม่)
router.post("/register", async (req, res) => { // เปลี่ยนเป็น /register เพื่อให้ชัดเจน
  const { name, email, password, phone, gender, address } = req.body;
  
  try {
    // 1. ตรวจสอบว่ามีอีเมลนี้อยู่แล้วหรือไม่
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // 2. เข้ารหัสรหัสผ่าน (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. สร้าง User Object ใหม่ด้วยรหัสผ่านที่เข้ารหัสแล้ว
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, // ใช้รหัสผ่านที่ถูก Hash แล้ว
      phone, 
      gender, 
      address
    });
    
    // 4. บันทึกและส่งกลับข้อมูล
    const saved = await user.save();
    // ส่งข้อมูลกลับไปแต่ไม่รวมรหัสผ่าน
    res.status(201).json({ 
        _id: saved._id, 
        name: saved.name, 
        email: saved.email,
        // (ในโปรเจกต์จริง ควรสร้าง JWT Token ที่นี่)
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ---



// เข้าสู่ระบบ
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. ค้นหาผู้ใช้ด้วยอีเมล
    const user = await User.findOne({ email });

    // 2. ตรวจสอบผู้ใช้และเปรียบเทียบรหัสผ่าน
    // bcrypt.compare() จะเปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนกับรหัสผ่านที่ถูก Hash ในฐานข้อมูล
    if (user && (await bcrypt.compare(password, user.password))) {
      
      // 3. Login สำเร็จ
      // ในโปรเจกต์จริง ควรสร้าง JWT Token ที่นี่
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: 'GENERATED_JWT_TOKEN_HERE', 
      });
      
    } else {
      // 4. ไม่พบผู้ใช้หรือรหัสผ่านผิด
      res.status(401).json({ message: "Invalid email or password" });
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;