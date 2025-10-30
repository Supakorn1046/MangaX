import React, { useState } from 'react'; 
import styles from './MangaXLogin.module.css';

const MangaXRegister = ({ onBackToLogin, onNextToProfile }) => {
    // 1. State สำหรับเก็บข้อมูลฟอร์มและข้อผิดพลาด
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        displayName: '', // ใช้สำหรับฟิลด์ name ใน Backend
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าใน Input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // 2. ฟังก์ชันส่งข้อมูลไปยัง Backend
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError(''); // ล้างข้อผิดพลาดเก่า
        
        const { firstName, lastName, displayName, email, password, confirmPassword } = formData;
        
        // ตรวจสอบรหัสผ่านตรงกันหรือไม่
        if (password !== confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
            return;
        }

        // ตรวจสอบความยาวรหัสผ่าน (อ้างอิงจาก minLength="8")
        if (password.length < 8) {
            setError('รหัสผ่านต้องมีความยาวอย่างน้อย 8 อักขระ');
            return;
        }
        
        try {
            // 💡 3. เรียก API สมัครสมาชิก: /api/users/register
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // ส่งข้อมูลที่ Backend ต้องการ
                body: JSON.stringify({
                    name: displayName || `${firstName} ${lastName}`, // ใช้ชื่อที่แสดง หรือรวมชื่อจริง
                    email,
                    password,
                    // ฟิลด์ phone, gender, address ถูกละไว้เพราะไม่มีในฟอร์ม แต่ Backend รองรับ
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // สมัครสมาชิกสำเร็จ
                alert('สมัครสมาชิกสำเร็จ! กรุณากรอกข้อมูลโปรไฟล์ต่อ');
                // Backend ควรส่งข้อมูลผู้ใช้ที่ถูกสร้างกลับมา
                localStorage.setItem('userInfo', JSON.stringify(data)); 
                onNextToProfile(); // ไปขั้นตอนต่อไป
            } else {
                // สมัครสมาชิกไม่สำเร็จ (เช่น อีเมลซ้ำ)
                setError(data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
            }
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ตรวจสอบว่า Backend ทำงานอยู่หรือไม่');
            console.error('Network error:', err);
        }
    };

    return (
        <div className={styles.loginFormPanel}>
            <form onSubmit={handleRegisterSubmit}>
                <p className={styles.sectionHeading}>สมัครสมาชิก</p>
                
                {/* 💡 ส่วนแสดงข้อผิดพลาด */}
                {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                <p className={styles.orText} style={{ textAlign: 'left', marginTop: '10px' }}>**ข้อมูลส่วนตัว**</p>
                <div className={styles.inputGroup} style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="ชื่อจริง" required style={{ flex: 1 }} 
                           name="firstName" value={formData.firstName} onChange={handleChange} />
                    <input type="text" placeholder="นามสกุล" required style={{ flex: 1 }} 
                           name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>ชื่อเรียกและแสดง</p>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="ชื่อเล่น หรือ ฉายาของคุณ" required 
                           name="displayName" value={formData.displayName} onChange={handleChange} />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>รหัสและข้อมูลคุณ</p>
                <div className={styles.inputGroup}>
                    <input type="email" placeholder="เช่น example@gmail.com" required 
                           name="email" value={formData.email} onChange={handleChange} />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>สร้างรหัสผ่านใหม่</p>
                <div className={styles.inputGroup}>
                    <input type="password" placeholder="อย่างน้อย 8 อักขระ" required minLength="8" 
                           name="password" value={formData.password} onChange={handleChange} />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>กรอกรหัสผ่านซ้ำอีกครั้ง</p>
                <div className={styles.inputGroup}>
                    <input type="password" placeholder="" required 
                           name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>

                <button type="submit" className={`${styles.primaryBtn} ${styles.loginBtn}`} style={{ marginTop: '20px' }}>
                    ไปขั้นตอนต่อไป
                </button>
                
                <button 
                    type="button" 
                    onClick={onBackToLogin}
                    className={`${styles.primaryBtn} ${styles.createAccountBtn}`}
                    style={{ marginTop: '10px', backgroundColor: '#808080', border: 'none' }}
                >
                    ย้อนกลับเข้าสู่ระบบ
                </button>
            </form>
        </div>
    );
};

export default MangaXRegister;