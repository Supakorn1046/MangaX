import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_add.css';
import logo from '../assets/logo.png';
import { CartIcon, LogoutIcon, AddIcon } from './admin_icon.jsx'; 

// URL ฐานของ API
const API_BASE_URL = 'http://localhost:5000/api/books';

function AdminAdd() {
    const navigate = useNavigate();

    // 💡 ปรับ State: เพิ่ม 'category'
    const [product, setProduct] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        category: '' // 💡 New: เพิ่ม category
    });

    // ฟังก์ชันจัดการการเปลี่ยนแปลง input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ฟังก์ชันจัดการราคา (Code unchanged)
    const handlePriceChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d.]/g, '');
        const decimalCount = (value.match(/\./g) || []).length;
        if (decimalCount > 1) {
            value = value.slice(0, -1);
        }
        setProduct(prev => ({
            ...prev,
            price: value
        }));
    };

    const handleBack = () => {
        navigate('/admin_list');
    };
    
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    // 💡 ฟังก์ชันบันทึกข้อมูล (เรียก API จริง)
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        // --- 1. การตรวจสอบความถูกต้องของข้อมูล (Validation) ---
        // 💡 เพิ่ม category ในการตรวจสอบ
        if (!product.title || !product.author || !product.price || !product.stock || !product.category) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อเรื่อง, ชื่อผู้แต่ง, ราคา, จำนวน, ประเภท)');
            return;
        }

        const priceValue = parseFloat(product.price);
        const stockValue = parseInt(product.stock, 10);
        
        if (isNaN(priceValue) || priceValue < 0) {
            alert('กรุณากรอกราคาเป็นตัวเลขที่ถูกต้อง');
            return;
        }
        if (isNaN(stockValue) || stockValue < 0) {
            alert('กรุณากรอกจำนวนเป็นตัวเลขที่ถูกต้อง');
            return;
        }
        // --- จบ Validation ---

        const productData = {
            title: product.title,
            author: product.author,
            description: product.description,
            price: priceValue,
            stock: stockValue,
            image: product.image,
            category: product.category, // 💡 New: ส่ง category ไป Backend
        };
        
        try {
            // 2. เรียก API POST ไปที่ /api/books
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            
            const data = await response.json();

            if (response.ok) { // Status 200 OK (ตาม bookRoutes.js)
                alert('เพิ่มสินค้าสำเร็จ!');
                navigate('/admin_list');
            } else {
                alert(`เกิดข้อผิดพลาดในการเพิ่มสินค้า: ${data.message || 'Unknown Error'}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        }
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
                            <a href="#" onClick={handleLogout}> 
                                <LogoutIcon /> ออกจากระบบ
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* ===== ส่วน Content หลัก ===== */}
            <main className="main-content">
                <header className="content-header">
                    <h1><AddIcon /> เพิ่มข้อมูลสินค้า</h1>
                    <button className="btn btn-back" onClick={handleBack}>กลับหน้าแรก</button>
                </header>
                
                {/* ===== ส่วน Form ===== */}
                <form className="product-form" onSubmit={handleSubmit}>
                    
                    {/* ชื่อเรื่อง */}
                    <div className="form-group">
                        <label htmlFor="title">ชื่อเรื่อง *</label>
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={product.title}
                            onChange={handleInputChange}
                            placeholder="ใส่ชื่อหนังสือ..."
                            required
                        />
                    </div>

                    {/* ชื่อผู้แต่ง */}
                    <div className="form-group">
                        <label htmlFor="author">ชื่อผู้แต่ง *</label>
                        <input 
                            type="text" 
                            id="author"
                            name="author"
                            value={product.author}
                            onChange={handleInputChange}
                            placeholder="ใส่ชื่อผู้แต่ง..."
                            required
                        />
                    </div>

                    {/* 💡 New: ประเภทสินค้า */}
                    <div className="form-group">
                        <label htmlFor="category">ประเภท (Category) *</label>
                        <input 
                            type="text" 
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
                            placeholder="เช่น: ต่อสู้, กีฬา, โรแมนซ์"
                            required
                        />
                    </div>

                    {/* จำนวนและราคา */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="stock">จำนวน (Stock) *</label>
                            <input 
                                type="text" 
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onChange={handleInputChange}
                                placeholder="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">ราคา (บาท) *</label>
                            <input 
                                type="text" 
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handlePriceChange}
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    {/* รูปสินค้า */}
                    <div className="form-group">
                        <label htmlFor="image">รูปสินค้า</label>
                        <input 
                            type="text" 
                            id="image"
                            name="image"
                            value={product.image}
                            onChange={handleInputChange}
                            placeholder="เช่น URL รูปภาพ"
                        />
                        {product.image && (
                            <div className="image-preview">
                                <img src={product.image} alt="Preview" className="preview-image" />
                                <small></small>
                            </div>
                        )}
                    </div>

                    {/* รายละเอียด */}
                    <div className="form-group">
                        <label htmlFor="description">รายละเอียด</label>
                        <textarea 
                            id="description" 
                            name="description"
                            rows="6"
                            value={product.description}
                            onChange={handleInputChange}
                            placeholder="ใส่รายละเอียดสินค้า..."
                        ></textarea>
                    </div>

                    {/* ปุ่มดำเนินการ */}
                    <div className="form-actions">
                        <button type="submit" className="btn btn-submit">
                            บันทึกข้อมูล
                        </button>
                        <button type="button" className="btn btn-cancel" onClick={handleBack}>
                            ยกเลิก
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}

export default AdminAdd;