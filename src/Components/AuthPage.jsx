import React, { useState } from 'react';
import MangaXLogin from './MangaXLogin';
import MangaXRegister from './MangaXRegister';
import MangaXProfileDetails from './MangaProfileDetails';
import logo from '../assets/logo.png';
import styles from './AuthPage.module.css'; 

const AuthPage = () => {
  // ใช้ State เพื่อสลับฟอร์ม
  const [authMode, setAuthMode] = useState('login'); 

  // ฟังก์ชันสำหรับเปลี่ยนฟอร์ม
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
    // โครงสร้าง Layout 2 คอลัมน์
    <div className={styles.authPageWrapper}>
      <div className={styles.authContainer}>
        
        {/* คอลัมน์ซ้าย (Logo) */}
        <div className={styles.logoPanel}>
          <img src={logo} alt="MangaX Logo" className={styles.authLogo} />
          
        </div>
        
        {/* คอลัมน์ขวา (Form) */}
        <div className={styles.formPanel}>
          {renderForm()} 
        </div>

      </div>
    </div>
  );
};

export default AuthPage;