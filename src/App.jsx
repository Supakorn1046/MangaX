import React, { useState } from 'react'; 
import MangaXLogin from "./components/MangaXLogin.jsx"; 
import MangaXRegister from "./components/MangaXRegister.jsx";
import MangaXProfileDetails from "./components/MangaXProfileDetails.jsx";
import MangaXLogo from './assets/manga_x_logo.png'; 
import styles from './components/MangaXLogin.module.css'; 

export default function App() {

  const [currentPage, setCurrentPage] = useState('login'); 

  const CurrentForm = (() => {
    switch (currentPage) {
      case 'login':
        return (
            <MangaXLogin 
                onRegisterClick={() => setCurrentPage('register')} 
                onLoginClick={() => setCurrentPage('profile')} 
            />
        );
      case 'register':
        return (
            <MangaXRegister 
                onBackToLogin={() => setCurrentPage('login')} 
                onNextToProfile={() => setCurrentPage('profile')}
            />
        );
      case 'profile':
        return (
             <MangaXProfileDetails 
                 onBackToRegister={() => setCurrentPage('register')}
                 onRegistrationComplete={() => setCurrentPage('login')} 
             />
        );
      default:
        return <MangaXLogin onRegisterClick={() => setCurrentPage('register')} onLoginClick={() => setCurrentPage('profile')} />;
    }
  })();

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0' 
    }}>
      <div style={{
          display: 'flex',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          maxWidth: '800px',
          width: '90%',
          backgroundColor: '#fff',
      }}>
          <div className={styles.logoPanel}> 
                <div className={styles.logoBox}>
                    <img 
                        src={MangaXLogo} 
                        alt="MANGA X Logo" 
                        className={styles.mangaXImageLogo} 
                    />
                </div>
          </div>
          
          {CurrentForm} 
      </div>
    </div>
  );
}