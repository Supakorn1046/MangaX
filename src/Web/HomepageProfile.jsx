import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Homepage.css"; 
import "./HomepageProfile.css";
import logo from "../assets/logo.png"; 

const UserInfoContent = ({ user }) => (
    <section className="user-info-section">
        <h2 className="section-title">ข้อมูลผู้ใช้งาน</h2>
        <div className="user-details-grid">
            <div className="profile-icon">
                <span className="icon-large-user">👤</span>
            </div>
            
            <div className="detail-label">ชื่อ</div>
            <div className="detail-value">{user.name}</div>
            
            <div className="detail-label">อีเมล</div>
            <div className="detail-value">{user.email}</div>

            <div className="detail-label">เพศ</div>
            <div className="detail-value">{user.gender}</div>
            
            <div className="detail-label">เบอร์</div>
            <div className="detail-value">{user.phone}</div>
            
            <div className="detail-label">ที่อยู่</div>
            <div className="detail-value address-line">{user.address}</div>
        </div>
    </section>
);

const OrderHistoryContent = () => {
    const history = [
        { id: 101, title: "มหาเวทย์ผนึกมาร เล่ม 21", quantity: 10, price: 1300.00, image: "https://via.placeholder.com/60x90?text=JJK21" },
        { id: 102, title: "มหาเวทย์ผนึกมาร เล่ม 21", quantity: 5, price: 650.00, image: "https://via.placeholder.com/60x90?text=JJK21_2" },
    ];

    return (
        <section className="user-info-section">
            <h2 className="section-title">ประวัติการซื้อ</h2>
            
            <table className="order-history-table">
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
                                <img src={item.image} alt={item.title} className="order-item-img" />
                                <div className="order-item-title">{item.title}</div>
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


const mockUserData = {
    name: "สมศรี ใจดี", email: "supakorn.jeam@ku.th", gender: "ชาย",
    phone: "092-321-1222", address: "บ้านเลขที่ 8 ซอยอนามัย 33 ชลบุรี 10150"
};


const HomepageProfile = ({ user = mockUserData }) => {
   
    const [activeTab, setActiveTab] = useState('account'); 

    const renderContent = () => {
        if (activeTab === 'account') {
            return <UserInfoContent user={user} />;
        }
        if (activeTab === 'history') {
            return <OrderHistoryContent />;
        }
        return null;
    };

    return (
        <div className="homepage">
            
            <header className="header">
    
                <img src={logo} alt="BookStore Logo" className="logo" />
                <nav>
                    <a href="#home">หน้าแรก</a>
                    <a href="#shop">10 อันดับ</a>
                    <a href="#categories">หมวดหมู่</a> 
                </nav>
                <div className="search-container">
                    <MdOutlineShoppingCart className="header-icon" />
                    <a href="#profile"><MdLogin className="header-icon" /></a> 
                    <input type="text" placeholder="ค้นหาสินค้าที่ต้องการ" className="search-bar" />
                    <FaSearch className="search-icon" />
                </div>
            </header>

            <main className="profile-main-content"> 
                <div className="user-profile-box">
                    
                    <aside className="sidebar">
                        <a 
                            href="#" 
                            className={`sidebar-link ${activeTab === 'account' ? 'active' : ''}`}
                            onClick={() => setActiveTab('account')}
                        >
                            บัญชีของฉัน
                        </a>
                        <a 
                            href="#" 
                            className={`sidebar-link ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            ประวัติการซื้อ
                        </a>
                        <a href="#" className="sidebar-link logout">ออกจากระบบ</a>
                    </aside>
                    
                    {renderContent()}

                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2025 BookStore. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomepageProfile;