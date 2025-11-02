import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './MangaXLogin.module.css';

const MangaXLogin = ({ onRegisterClick }) => { 
    
    const navigate = useNavigate(); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 🔥 ตรวจสอบว่าล็อกอินอยู่แล้วหรือไม่
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin');
        
        if (token) {
            if (isAdmin === 'true') {
                navigate('/admin_list', { replace: true });
            } else {
                navigate('/homepage', { replace: true });
            }
        }
    }, [navigate]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const email = e.target.elements['email-phone'].value;
        const password = e.target.elements['password'].value; 

        if (!email || !password) {
            setError('กรุณากรอกอีเมล/เบอร์มือถือและรหัสผ่านให้ครบถ้วน');
            setLoading(false);
            return;
        }

        // 🔑 1. ตรวจสอบเงื่อนไข Admin Login (Hardcoded)
        if (email === 'Admin123123' && password === 'Admin123123') {
            alert('Admin Login สำเร็จ!');
            // เก็บข้อมูลใน localStorage
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('token', 'admin-token-' + Date.now());
            localStorage.setItem('userInfo', JSON.stringify({
                _id: 'admin',
                name: 'Administrator',
                email: 'admin@mangax.com',
                role: 'admin'
            }));
            
            setLoading(false);
            navigate('/admin_list', { replace: true });
            return;
        }

        // 2. Login ผู้ใช้ทั่วไป (เรียก API Backend)
        try {
            const response = await fetch('http://localhost:5000/api/users/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });

            const data = await response.json();

            if (response.ok) {
                alert('เข้าสู่ระบบสำเร็จ!');
                
                // 🔥 เก็บข้อมูลทั้งหมดที่จำเป็น
                localStorage.setItem('userInfo', JSON.stringify(data));
                localStorage.setItem('token', data.token || 'user-token-' + Date.now());
                localStorage.setItem('isAdmin', 'false');
                
                navigate('/homepage', { replace: true });
                
            } else {
                setError(data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ตรวจสอบว่า Backend ทำงานอยู่หรือไม่');
            console.error('Network error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <> 
            <div className={styles.loginFormPanel}>
                <form onSubmit={handleLoginSubmit}>
                    <p className={styles.sectionHeading}>เข้าสู่ระบบ</p>
                    
                    {error && (
                        <div style={{ 
                            color: 'red', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            padding: '10px',
                            backgroundColor: '#ffe6e6',
                            borderRadius: '5px',
                            marginBottom: '15px'
                        }}>
                            {error}
                        </div>
                    )} 

                    <div className={styles.inputGroup}>
                        <input 
                            type="text" 
                            id="email-phone"
                            name="email-phone"
                            placeholder="อีเมล/เบอร์มือถือ" 
                            required 
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="รหัสผ่าน" 
                            required 
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`${styles.primaryBtn} ${styles.loginBtn}`}
                        disabled={loading}
                    >
                        {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                    </button>

                    <div className={styles.newAccountSection}>
                        <p className={styles.sectionHeading}>สมัครสมาชิก</p>
                        <button 
                            type="button" 
                            className={`${styles.primaryBtn} ${styles.createAccountBtn}`}
                            onClick={onRegisterClick}
                            disabled={loading}
                        >
                            สร้างบัญชีใหม่
                        </button>
                    </div>

                    {/* 🔥 ข้อมูลสำหรับทดสอบ */}
                    <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        <p><strong>สำหรับทดสอบ:</strong></p>
                        <p>Admin: Admin123123 / Admin123123</p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MangaXLogin;