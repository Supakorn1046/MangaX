import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./Homepage.css"; 
import "./HomepageProfile.css";
import logo from "../assets/logo.png"; 

// (Imports รูปภาพสำหรับ Footer)
import visaImage from '../assets/visa.png';
import mastercardImage from '../assets/mastercard.png';
import paypalImage from '../assets/paypal.png';
import fbImage from '../assets/fb.png';
import igImage from '../assets/ig.png';
import lineImage from '../assets/line.png';
import ytImage from '../assets/yt1.png';
import ttImage from '../assets/tt.png';
import xImage from '../assets/x.png';

// --- ⭐️ ส่วนที่แก้ไข 1: UserInfoContent ---
const UserInfoContent = ({ user }) => {
  if (!user) {
    return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;
  }

  return (
    <section className="hp-profile-info-section">
      <h2 className="hp-profile-section-title">ข้อมูลผู้ใช้งาน</h2>
      <div className="hp-profile-details-grid">
        <div className="hp-profile-icon">
          <span className="hp-profile-icon-user">👤</span>
        </div>
        <div className="hp-profile-label">ชื่อ</div>
        {/* แก้ตรงนี้: ให้แสดง firstName + lastName (จาก Address) 
          ถ้าไม่มี ให้ใช้ displayName (จาก User/localStorage) เป็นค่าสำรอง
        */}
        <div className="hp-profile-value">
          {(user.firstName && user.lastName) 
            ? `${user.firstName} ${user.lastName}`
            : user.displayName 
          }
        </div>
        <div className="hp-profile-label">อีเมล</div>
        <div className="hp-profile-value">{user.email || '-'}</div>
        
        <div className="hp-profile-label">เบอร์</div>
        <div className="hp-profile-value">{user.phone || '-'}</div>
        <div className="hp-profile-label">ที่อยู่</div>
        {/* แก้ตรงนี้: user.address จะมีแค่ที่อยู่ (จาก useEffect ที่แก้ไข) */}
        <div className="hp-profile-value hp-profile-address">{user.address || 'ยังไม่ได้ตั้งค่าที่อยู่'}</div>
      </div>
    </section>
  );
};
// --- จบส่วนที่แก้ไข 1 ---

// --- ส่วนประวัติการซื้อ (เหมือนเดิม) ---
const OrderHistoryContent = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <section className="hp-profile-info-section">
        <h2 className="hp-profile-section-title">ประวัติการซื้อ</h2>
        <p>ไม่พบประวัติการซื้อ</p>
      </section>
    );
  }

  return (
    <section className="hp-profile-info-section">
      <h2 className="hp-profile-section-title">ประวัติการซื้อ</h2>
      <table className="hp-profile-history-table">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>จำนวน</th>
            <th>ราคา</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>
               
                <div className="hp-profile-item-title">{item.title}</div>
              </td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
// --- จบส่วนประวัติการซื้อ ---

// --- (Reusable components สำหรับ Footer - เหมือนเดิม) ---
const PaymentIcon = ({ src, alt }) => (
  <div className="homepage-image-link">
    <img src={src} alt={alt} />
  </div>
);
const SocialIcon = ({ src, alt }) => (
  <div className="homepage-image-link">
    <img src={src} alt={alt} />
  </div>
);

// --- Component หลัก ---
const HomepageProfile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null); 
  const [orderHistory, setOrderHistory] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;
  const userId = userInfo ? userInfo._id : null;

  // --- ⭐️ ส่วนที่แก้ไข 2: useEffect ---
  useEffect(() => {
    if (!userId) {
      setError("ไม่พบข้อมูลผู้ใช้");
      setLoading(false);
      navigate('/login'); 
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- 3.1 ดึงข้อมูลที่อยู่ (สำหรับ Phone/Address/FirstName/LastName) ---
        const addrRes = await fetch(`http://localhost:5000/api/address/user/${userId}`);
        let userPhone = '';
        let userAddress = 'ยังไม่ได้ตั้งค่าที่อยู่';
        let userFirstName = ''; // 👈 เพิ่ม
        let userLastName = '';  // 👈 เพิ่ม

        if (addrRes.ok) {
          const addresses = await addrRes.json();
          const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
          if (defaultAddress) {
            userPhone = defaultAddress.phone;
            userAddress = defaultAddress.address; // 👈 แก้ไข: เอาเฉพาะที่อยู่
            userFirstName = defaultAddress.firstName; // 👈 เพิ่ม
            userLastName = defaultAddress.lastName;   // 👈 เพิ่ม
          }
        }

        // --- 3.2 รวมข้อมูลผู้ใช้ (จาก localStorage + Address) ---
        setUserData({
          displayName: userInfo.name, // 👈 นี่คือ displayName (เช่น "Kornza" หรือ "XXXX")
          email: userInfo.email, 
          phone: userPhone, 
          address: userAddress,     // 👈 ที่อยู่ (ไม่รวมชื่อ)
          firstName: userFirstName, // 👈 ส่ง firstName (จาก Address)
          lastName: userLastName    // 👈 ส่ง lastName (จาก Address)
        });

        // --- 3.3 ดึงข้อมูลประวัติการซื้อ (Orders) ---
        const orderRes = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
        if (!orderRes.ok) throw new Error('ไม่สามารถดึงประวัติการซื้อได้');
        
        const fetchedOrders = await orderRes.json(); 
        
        // --- 3.4 แปลงข้อมูล (Flattening) ---
        const flatHistory = [];
        for (const order of fetchedOrders) {
          for (const item of order.items) {
            flatHistory.push({
              id: item._id || item.bookId, 
              title: item.title,
              quantity: item.quantity,
              price: item.price * item.quantity,
              image: item.image 
            });
          }
        }
        setOrderHistory(flatHistory.reverse()); 

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // 💡 ลบ userInfo.name, userInfo.email ออกจาก dependencies
  // เพราะมันมาจาก localStorage และไม่ควร trigger re-fetch
  }, [userId, navigate]); 
  // --- จบส่วนที่แก้ไข 2 ---


  // (ฟังก์ชัน Navigation & Logout - เหมือนเดิม)
  const handleCartClick = () => navigate('/buy');
  const handleProfileClick = () => navigate('/HomepageProfile');
  const handleHomepageClick = () => navigate('/homepage');
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  // (renderContent - เหมือนเดิม)
  const renderContent = () => {
    if (loading) {
      return (
        <section className="hp-profile-info-section">
          <h2>กำลังโหลดข้อมูล...</h2>
        </section>
      );
    }
    if (error) {
      return (
        <section className="hp-profile-info-section">
          <h2 style={{ color: 'red' }}>เกิดข้อผิดพลาด: {error}</h2>
        </section>
      );
    }

    if (activeTab === 'account') {
      return <UserInfoContent user={userData} />; 
    }
    if (activeTab === 'history') {
      return <OrderHistoryContent history={orderHistory} />; 
    }
    return null;
  };

  return (
    <div className="homepage"> 
      {/* Header (เหมือนเดิม) */}
      <header className="homepage-header">
        <img src={logo} alt="BookStore Logo" className="homepage-logo" />
        <nav className="homepage-nav">
          <a href="#" onClick={handleHomepageClick}>หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="homepage-search-container">
          <MdOutlineShoppingCart 
            className="homepage-header-icon" 
            onClick={handleCartClick}
            style={{ cursor: 'pointer' }}
          />
          <CgProfile 
            className="homepage-header-icon" 
            onClick={handleProfileClick} 
            style={{ cursor: 'pointer' }} 
          />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="homepage-search-bar"
          />
          <FaSearch className="homepage-search-icon" />
        </div>
      </header>

      {/* Main Content (เหมือนเดิม) */}
      <main className="hp-profile-main-content"> 
        <div className="hp-profile-box">
          <aside className="hp-profile-sidebar">
            <a 
              href="#" 
              className={`hp-profile-link ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              บัญชีของฉัน
            </a>
            <a 
              href="#" 
              className={`hp-profile-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              ประวัติการซื้อ
            </a>
            <a href="#" className="hp-profile-link logout" onClick={handleLogout}>
              ออกจากระบบ
            </a>
          </aside>
          {renderContent()}
        </div>
      </main>

      {/* Footer (เหมือนเดิม) */}
      <footer className="homepage-footer">
        <div className="homepage-footer-content">
          
          <div className="homepage-footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="homepage-footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="homepage-payment-methods">
              <PaymentIcon src={visaImage} alt="visa" />
              <PaymentIcon src={mastercardImage} alt="mastercard" />
              <PaymentIcon src={paypalImage} alt="paypal" />
            </div>
          </div>

          <div className="homepage-footer-section homepage-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="homepage-social-icons">
              <div className="homepage-social-row">
                <SocialIcon src={fbImage} alt="facebook" />
                <SocialIcon src={igImage} alt="instagram" />
                <SocialIcon src={lineImage} alt="line" />
              </div>
              <div className="homepage-social-row">
                <SocialIcon src={ytImage} alt="youtube" />
                <SocialIcon src={ttImage} alt="tiktok" />
                <SocialIcon src={xImage} alt="x" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomepageProfile;