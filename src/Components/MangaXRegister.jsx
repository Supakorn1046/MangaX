// 📄 ในไฟล์ MangaXRegister.jsx

import React, { useState } from 'react'; 
import styles from './MangaXLogin.module.css';

const MangaXRegister = ({ onBackToLogin, onNextToProfile }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        displayName: '', 
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        
        const { firstName, lastName, displayName, email, password, confirmPassword } = formData;
        
        if (password !== confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
            return;
        }
        if (password.length < 8) {
            setError('รหัสผ่านต้องมีความยาวอย่างน้อย 8 อักขระ');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: displayName || `${firstName} ${lastName}`, 
                    email,
                    password,
                }),
            });

            const data = await response.json(); // data ที่ได้จาก server คือ { _id, name, email }

            if (response.ok) {
                alert('สมัครสมาชิกสำเร็จ! กรุณากรอกข้อมูลโปรไฟล์ต่อ');

                // --- ⭐️ นี่คือส่วนที่แก้ไข ⭐️ ---
                // 'data.name' ที่ได้มาคือ 'displayName' (เช่น "Kornza")
                // เราต้องสร้าง Object ใหม่เพื่อเก็บใน localStorage
                
                const userInfoToStore = {
                    _id: data._id,
                    email: data.email,
                    // ‼️ บังคับให้ 'name' ใน localStorage เป็นชื่อจริงเสมอ
                    name: `${firstName} ${lastName}` 
                };

                // บันทึก object ที่แก้ไขแล้วลง localStorage
                localStorage.setItem('userInfo', JSON.stringify(userInfoToStore)); 
                // --- จบส่วนที่แก้ไข ---
                
                onNextToProfile(); // ไปขั้นตอนต่อไป
            } else {
                setError(data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
            }
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
            console.error('Network error:', err);
        }
    };

    return (
        <div className={styles.loginFormPanel}>
            <form onSubmit={handleRegisterSubmit}>
                <p className={styles.sectionHeading}>สมัครสมาชิก</p>
                
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