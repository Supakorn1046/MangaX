import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_add.css';
import logo from '../assets/logo.png';
import { CartIcon, LogoutIcon, AddIcon } from './admin_icon.jsx'; 

function AdminAdd() {
    const navigate = useNavigate();

    // State สำหรับเก็บรายการสินค้า (Code unchanged)
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [imageName, setImageName] = useState('');
    const [description, setDescription] = useState('');

    // ฟังก์ชันย้อนกลับ
    const handleBack = () => {
        navigate('/admin_list');
    };
    
    // 💡 ฟังก์ชัน Logout
    const handleLogout = () => {
        // 1. ลบข้อมูลผู้ใช้ออกจาก Local Storage
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAdmin');
        
        // 2. เปลี่ยนเส้นทางไปยังหน้า Login
        navigate('/login');
    };

    // (ส่วน handleSubmit ... เหมือนเดิม)
    const handleSubmit = (event) => {
        event.preventDefault(); 
        const productData = {
            title: productName, 
            stock: parseInt(quantity, 10),
            price: parseFloat(price),
            image: imageName,
            description: description,
        };
        console.log('ข้อมูลที่จะบันทึก:', productData);
        // 💡 ในโค้ดจริง คุณจะเรียก fetch/axios POST ไปที่ /api/books ที่นี่
    };

    return (
        <div className="admin-add-page">
            {/* ===== ส่วน Sidebar (แถบด้านซ้าย) ===== */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Manga Logo" />
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active">
                            <a href="#" onClick={handleBack}>
                                <CartIcon /> จัดการสินค้า
                            </a>
                        </li>
                        <li>
                            {/* 💡 ผูก handleLogout เข้ากับปุ่ม */}
                            <a href="#" onClick={handleLogout}> 
                                <LogoutIcon /> ออกจากระบบ
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {/* ... ส่วน Content ที่เหลือ ... */}
            <main className="main-content">
                <header className="content-header">
                    <h1><AddIcon /> เพิ่มข้อมูลสินค้า</h1>
                    <button className="btn btn-back" onClick={handleBack}>กลับหน้าแรก</button>
                </header>
                
                {/* ... ส่วน Form ... */}
                <form className="product-form" onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor="productName">ชื่อเรื่อง</label>
                        <input 
                            type="text" 
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="ใส่ชื่อหนังสือ..."
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="quantity">จำนวน</label>
                            <input 
                                type="number" 
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">ราคา/บาท</label>
                            <input 
                                type="text" 
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageName">รูปสินค้า</label>
                        <input 
                            type="text" 
                            id="imageName"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            placeholder="เช่น my-image.png (หรือใส่ URL)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">รายละเอียด</label>
                        <textarea 
                            id="description" 
                            rows="8"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="ใส่รายละเอียดสินค้า..."
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-submit">
                            บันทึกข้อมูล
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}

export default AdminAdd;