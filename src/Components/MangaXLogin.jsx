import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './MangaXLogin.module.css';

const MangaXLogin = ({ onRegisterClick }) => { 
    
    const navigate = useNavigate(); 
    const [error, setError] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const email = e.target.elements['email-phone'].value;
        const password = e.target.elements['password'].value; 

        if (!email || !password) {
            setError('กรุณากรอกอีเมล/เบอร์มือถือและรหัสผ่านให้ครบถ้วน');
            return;
        }

        // --- 🔑 1. ตรวจสอบเงื่อนไข Admin Login (Hardcoded) ---
        if (email === 'Admin123123' && password === 'Admin123123') {
            alert('Admin Login สำเร็จ!');
            // 💡 เก็บสถานะ Admin ใน localStorage
            localStorage.setItem('isAdmin', 'true');
            // 💡 เปลี่ยนเส้นทางไปยังหน้า Admin
            navigate('/admin_list'); 
            return; // หยุดฟังก์ชันเพื่อไม่ให้เรียก API ต่อไป
        }
        // --- จบเงื่อนไข Admin Login ---


        // --- 2. Login ผู้ใช้ทั่วไป (เรียก API Backend) ---
        try {
            const response = await fetch('http://localhost:5000/api/users/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });

            const data = await response.json();

            if (response.ok) { // Login สำเร็จ (ต้องตรงกับข้อมูลใน DB)
                alert('เข้าสู่ระบบสำเร็จ!');
                
                // 4. เก็บข้อมูลผู้ใช้ใน localStorage
                localStorage.setItem('userInfo', JSON.stringify(data)); 
                localStorage.setItem('isAdmin', 'false'); // ตั้งค่าสถานะเป็น User ธรรมดา
                
                // 5. เปลี่ยนเส้นทางไปยัง /homepage
                navigate('/homepage'); 
                
            } else { // Login ไม่สำเร็จ
                setError(data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ตรวจสอบว่า Backend ทำงานอยู่หรือไม่');
            console.error('Network error:', err);
        }
    };

    return (
        <> 
            <div className={styles.loginFormPanel}>
                <form onSubmit={handleLoginSubmit}>
                    <p className={styles.sectionHeading}>เข้าสู่ระบบ</p>
                    
                    {/* 💡 ส่วนแสดงข้อผิดพลาด (ถ้ามี) */}
                    {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>} 

                    <div className={styles.inputGroup}>
                        <input 
                            type="text" 
                            id="email-phone"
                            name="email-phone"
                            placeholder="อีเมล/เบอร์มือถือ" 
                            required 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="รหัสผ่าน" 
                            required 
                        />
                    </div>

                    <button type="submit" className={`${styles.primaryBtn} ${styles.loginBtn}`}>
                        เข้าสู่ระบบ
                    </button>

                    <div className={styles.newAccountSection}>
                        <p className={styles.sectionHeading}>สมัครสมาชิก</p>
                        <button 
                            type="button" 
                            className={`${styles.primaryBtn} ${styles.createAccountBtn}`}
                            onClick={onRegisterClick} 
                        >
                            สร้างบัญชีใหม่
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MangaXLogin;