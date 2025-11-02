import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './admin_edit.css';
import logoImage from '../assets/logo.png';
import { CartIcon, LogoutIcon, SaveIcon, CancelIcon } from './admin_icon.jsx';

// URL ฐานของ API
const API_BASE_URL = 'https://mangax.onrender.com/api/books';

function AdminEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // ปรับ State: เพิ่ม 'category'
    const [product, setProduct] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        category: '' // New: เพิ่ม category
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ----------------------------------------------------
    // useEffect: ดึงข้อมูลเดิมมาแสดง (GET /api/books/:id)
    // ----------------------------------------------------
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                
                // แมปข้อมูล: รวม category
                setProduct({
                    title: data.title || '',
                    author: data.author || '',
                    description: data.description || '',
                    price: data.price?.toString() || '',
                    stock: data.stock?.toString() || '',
                    image: data.image || '',
                    category: data.category || '' // New: ดึง category
                });
            } catch (err) {
                setError('ไม่สามารถดึงข้อมูลสินค้าเดิมได้');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
        }
    }, [id, navigate]);

    // ฟังก์ชันจัดการการเปลี่ยนแปลง input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const key = name === 'quantity' ? 'stock' : name; 
        setProduct(prev => ({
            ...prev,
            [key]: value
        }));
    };
    
    // ฟังก์ชันบันทึกการเปลี่ยนแปลง (PUT /api/books/:id)
    const handleSave = async (e) => {
        e.preventDefault();
        
        // 1. ตรวจสอบข้อมูลที่จำเป็น (เพิ่ม category)
        if (!product.title || !product.author || !product.price || !product.stock || !product.category) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน (รวมถึง ประเภท)');
            return;
        }
        
        // 2. เตรียมข้อมูลสำหรับ API (แปลงเป็นตัวเลข)
        const updateData = {
            title: product.title,
            author: product.author,
            description: product.description,
            price: parseFloat(product.price),
            stock: parseInt(product.stock, 10),
            image: product.image,
            category: product.category, // New: รวม category
        };

        try {
            // 3. เรียก API PUT เพื่ออัปเดตข้อมูล
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('แก้ไขสินค้าสำเร็จ!');
                navigate('/admin_list');
            } else {
                alert(`เกิดข้อผิดพลาด: ${data.message || 'ไม่สามารถบันทึกข้อมูลได้'}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        }
    };

    const handleCancel = () => {
        if (window.confirm('ยกเลิกการแก้ไข? การเปลี่ยนแปลงจะไม่ถูกบันทึก')) {
            navigate('/admin_list');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="layout-container">
                <div className="loading">กำลังโหลดข้อมูล...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="layout-container">
                <div className="error">ข้อผิดพลาดในการโหลด: {error}</div>
            </div>
        );
    }

    return (
        <div className="layout-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-box">
                        <img src={logoImage} alt="MANGA X Logo"/>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    <a href="#" className="nav-link" onClick={() => navigate('/admin_list')}>
                        <CartIcon />
                        จัดการสินค้า
                    </a>
                    <a href="#" className="nav-link active">
                        <CartIcon />
                        แก้ไขสินค้า
                    </a>
                    <a href="#" className="nav-link" onClick={handleLogout}>
                        <LogoutIcon />
                        ออกจากระบบ
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="main-header">
                    <h1 className="main-title">
                        <CartIcon />
                        แก้ไขสินค้า (รหัส: {id})
                    </h1>
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handleSave}>
                            <SaveIcon />
                            บันทึกการเปลี่ยนแปลง
                        </button>
                        <button className="btn btn-cancel" onClick={handleCancel}>
                            <CancelIcon />
                            ยกเลิก
                        </button>
                    </div>
                </header>

                <form className="edit-form" onSubmit={handleSave}>
                    <div className="form-grid">
                        {/* รูปสินค้า */}
                        <div className="form-group image-group">
                            <label className="form-label">รูปสินค้า</label>
                            <div className="image-preview">
                                {product.image ? (
                                    <img src={product.image} alt="Preview" className="preview-image" />
                                ) : (
                                    <div className="no-image">ไม่มีรูปภาพ</div>
                                )}
                            </div>
                            <input
                                type="text"
                                name="image"
                                placeholder="URL รูปภาพ"
                                value={product.image}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>

                        {/* ข้อมูลสินค้า */}
                        <div className="form-group details-group">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">ชื่อเรื่อง *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={product.title}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label">ชื่อผู้แต่ง *</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={product.author}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* New: Input สำหรับ ประเภท (Category) */}
                            <div className="form-group">
                                <label className="form-label">ประเภท (Category) *</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="เช่น: ต่อสู้, กีฬา"
                                    required
                                />
                            </div>
                            {/* End New Input */}


                            <div className="form-group">
                                <label className="form-label">รายละเอียด</label>
                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                    className="form-textarea"
                                    rows="4"
                                    placeholder="รายละเอียดสินค้า..."
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">ราคา (บาท) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label">จำนวน (Stock) *</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminEdit;