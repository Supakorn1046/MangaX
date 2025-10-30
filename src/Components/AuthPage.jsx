import React, { useState } from 'react';
import MangaXLogin from './MangaXLogin'; // ตรวจสอบ Path
import MangaXRegister from './MangaXRegister'; // ตรวจสอบ Path
import MangaXProfileDetails from './MangaProfileDetails'; // ตรวจสอบ Path
import logo from '../assets/logo.png'; // ตรวจสอบ Path ของโลโก้

// 1. นำเข้า CSS Module ใหม่สำหรับ Layout นี้
import styles from './AuthPage.module.css'; 

const AuthPage = () => {
  // 2. ใช้ State เพื่อสลับฟอร์ม
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'profile'

  // 3. ฟังก์ชันสำหรับเปลี่ยนฟอร์ม
  const renderForm = () => {
    switch (authMode) {
      case 'register':
        return <MangaXRegister 
                  onBackToLogin={() => setAuthMode('login')} 
                  onNextToProfile={() => setAuthMode('profile')} 
                />;
      case 'profile':
        return <MangaXProfileDetails 
                  onBackToRegister={() => setAuthMode('register')}
                  onRegistrationComplete={() => setAuthMode('login')} 
                />;
      case 'login':
      default:
        return <MangaXLogin 
                  onRegisterClick={() => setAuthMode('register')} 
                />;
    }
  };

  return (
    // 4. โครงสร้าง Layout 2 คอลัมน์
    <div className={styles.authPageWrapper}>
      <div className={styles.authContainer}>
        
        {/* คอลัมน์ซ้าย (Logo) */}
        <div className={styles.logoPanel}>
          {/* เราจะใช้ไฟล์ logo.png ที่คุณให้มา */}
          <img src={logo} alt="MangaX Logo" className={styles.authLogo} />
          
        </div>
        
        {/* คอลัมน์ขวา (Form) */}
        <div className={styles.formPanel}>
          {renderForm()} {/* เรียกฟังก์ชันเพื่อแสดงฟอร์มที่ถูกต้อง */}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;