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

                    <button type="submit" className={`${styles.primaryBtn} ${styles.loginBtn}`}>
                        เข้าสู่ระบบ
                    </button>

                    <div className={styles.divider}>
                        <p className={styles.orText}>หรือ **เข้าสู่ระบบด้วย**</p>
                    </div>

                    <div className={styles.socialLoginGroup}>
                        <button type="button" className={`${styles.socialBtn} ${styles.facebookBtn}`} onClick={() => handleSocialLogin('Facebook')}>
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" className={`${styles.socialBtn} ${styles.lineBtn}`} onClick={() => handleSocialLogin('LINE')}>
                            <i className="fab fa-line"></i>
                        </button>
                        <button type="button" className={`${styles.socialBtn} ${styles.googleBtn}`} onClick={() => handleSocialLogin('Google')}>
                            <i className="fab fa-google"></i>
                        </button>
                        <button type="button" className={`${styles.socialBtn} ${styles.xBtn}`} onClick={() => handleSocialLogin('X')}>
                            <i className="fab fa-twitter"></i>
                        </button>
                    </div>

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