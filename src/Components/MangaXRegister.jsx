import React from 'react';
import styles from './MangaXLogin.module.css'; 

const MangaXRegister = ({ onBackToLogin, onNextToProfile }) => { 
    
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        onNextToProfile(); 
    };

    return (
        <div className={styles.loginFormPanel}>
            <form onSubmit={handleRegisterSubmit}>
                <p className={styles.sectionHeading}>สมัครสมาชิก</p>

                <p className={styles.orText} style={{ textAlign: 'left', marginTop: '10px' }}>**ข้อมูลส่วนตัว**</p>
                <div className={styles.inputGroup} style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="ชื่อจริง" required style={{ flex: 1 }} />
                    <input type="text" placeholder="นามสกุล" required style={{ flex: 1 }} />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>ชื่อเรียกและแสดง</p>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="ชื่อเล่น หรือ ฉายาของคุณ" required />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>รหัสและข้อมูลคุณ</p>
                <div className={styles.inputGroup}>
                    <input type="email" placeholder="เช่น example@gmail.com" required />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>สร้างรหัสผ่านใหม่</p>
                <div className={styles.inputGroup}>
                    <input type="password" placeholder="อย่างน้อย 8 อักขระ" required minLength="8" />
                </div>

                <p className={styles.orText} style={{ textAlign: 'left', marginBottom: '5px' }}>กรอกรหัสผ่านซ้ำอีกครั้ง</p>
                <div className={styles.inputGroup}>
                    <input type="password" placeholder="" required />
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