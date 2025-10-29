import React, { useState } from 'react';
import './admin_list.css';
import logoImage from '../assets/mangax.png'; //
import { CartIcon, LogoutIcon, AddIcon, SearchIcon } from './admin_icon.jsx'; 

function ProductPage() {
    // สร้าง state สำหรับเก็บรายการสินค้า (เริ่มต้นเป็นอาร์เรย์ว่าง)
    const [products, setProducts] = useState([]);

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
                    <a href="#" className="nav-link active">
                        <CartIcon />
                        จัดการสินค้า
                    </a>
                    <a href="#" className="nav-link">
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
                    <button className="btn btn-primary">
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