import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_list.css';
import logoImage from '../assets/logo.png';
import { CartIcon, LogoutIcon, AddIcon, SearchIcon } from './admin_icon.jsx'; 

function ProductPage() {
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/admin_add');
    };

    // 💡 ฟังก์ชัน Logout
    const handleLogout = () => {
        // 1. ลบข้อมูลผู้ใช้ออกจาก Local Storage
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAdmin');
        
        // 2. เปลี่ยนเส้นทางไปยังหน้า Login
        navigate('/login');
    };

    return (
        <div className="layout-container">
            {/* ==== Sidebar (เมนูด้านซ้าย) ==== */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-box">
                        <img src={logoImage} alt="MANGA X Logo"/>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    <a href="#" className="nav-link active" onClick={() => navigate('/admin_list')}>
                        <CartIcon />
                        จัดการสินค้า
                    </a>
                    {/* 💡 ผูก handleLogout เข้ากับปุ่ม */}
                    <a href="#" className="nav-link" onClick={handleLogout}>
                        <LogoutIcon />
                        ออกจากระบบ
                    </a>
                </nav>
            </aside>

            {/* ==== Main Content (เนื้อหาหลัก) ==== */}
            <main className="main-content">
                
                <header className="main-header">
                    <h1 className="main-title">
                        <CartIcon />
                        รายการสินค้า
                    </h1>
                    <button className="btn btn-primary" onClick={handleAddProduct}> 
                        <AddIcon />
                        เพิ่มข้อมูล
                    </button>
                </header>

                <div className="search-bar">
                    <div className="search-wrapper">
                        <span className="search-icon">
                            <SearchIcon />
                        </span>
                        <input type="text" placeholder="ค้นหา..." className="search-input" />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>รูปสินค้า</th>
                                <th>ชื่อเรื่อง</th>
                                <th>รายละเอียด</th>
                                <th>จำนวน</th>
                                <th>ราคา</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}> 
                                    <td>{product.id}</td>
                                    <td>
                                        <img src={product.img} alt={product.title} className="product-image" />
                                    </td>
                                    <td>{product.title}</td>
                                    <td className="product-desc">{product.desc}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn btn-edit">แก้ไข</button>
                                            <button className="btn btn-delete">ลบ</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
}

export default ProductPage;