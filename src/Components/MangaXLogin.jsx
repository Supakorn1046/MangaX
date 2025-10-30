import React from 'react';
import styles from './MangaXLogin.module.css';

const MangaXLogin = ({ onRegisterClick }) => { 
    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const emailPhone = e.target.elements['email-phone'].value;
        if (emailPhone) {
            alert(`กำลังพยายามเข้าสู่ระบบด้วย: ${emailPhone}`);
        } else {
            alert('กรุณากรอกอีเมล/เบอร์มือถือ');
        }
    };

    const handleSocialLogin = (platform) => {
        alert(`กำลังเริ่มการเข้าสู่ระบบผ่าน ${platform}...`);
    };

    return (
        <> 
            <div className={styles.loginFormPanel}>
                <form onSubmit={handleLoginSubmit}>
                    <p className={styles.sectionHeading}>เข้าสู่ระบบ</p>
                    
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