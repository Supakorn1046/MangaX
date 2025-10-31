import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_list.css';
import logoImage from '../assets/logo.png';
import { CartIcon, LogoutIcon, AddIcon, SearchIcon } from './admin_icon.jsx';

// URL ฐานของ API
const API_BASE_URL = 'http://localhost:5000/api/books';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 💡 เพิ่ม state สำหรับเก็บคำค้นหา
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const navigate = useNavigate();

    // ----------------------------------------------------
    // 💡 ฟังก์ชัน Fetch ข้อมูลจาก Backend (GET /api/books)
    // ----------------------------------------------------
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หรือดึงข้อมูลได้');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ----------------------------------------------------
    // 💡 ฟังก์ชันจัดการ (CRUD & Utility)
    // ----------------------------------------------------

    const handleAddProduct = () => {
        navigate('/admin_add');
    };

    const handleEditProduct = (productId) => {
        navigate(`/admin_edit/${productId}`);
    };

    // 💡 ปรับปรุง: ลบสินค้า (ลบออกจาก DB และ Refetch)
    const handleDeleteProduct = async (productId, productTitle) => {
        if (!window.confirm(`คุณต้องการลบสินค้า "${productTitle}" (ID: ${productId}) ใช่หรือไม่?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert(`ลบสินค้า "${productTitle}" สำเร็จ!`);
                // 🔑 เรียก fetchProducts ซ้ำ เพื่อดึงรายการล่าสุดจาก DB มาอัปเดต
                fetchProducts(); 
            } else {
                alert('เกิดข้อผิดพลาดในการลบสินค้า');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์เพื่อลบสินค้าได้');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    // 💡 ฟังก์ชันค้นหาสินค้า (กรองข้อมูลใน Frontend)
    const filteredProducts = products.filter(product => {
        // กรองจากชื่อเรื่อง, ชื่อผู้แต่ง, หรือรายละเอียด
        const lowerCaseSearch = searchTerm.toLowerCase();
        return (
            product.title?.toLowerCase().includes(lowerCaseSearch) ||
            product.author?.toLowerCase().includes(lowerCaseSearch) ||
            product.description?.toLowerCase().includes(lowerCaseSearch)
        );
    });

    // ----------------------------------------------------
    // 💡 การแสดงผล (Render)
    // ----------------------------------------------------

    if (loading) {
        return <div className="loading-screen">กำลังโหลดข้อมูล...</div>;
    }

    if (error) {
        return <div className="error-screen">ข้อผิดพลาด: {error}</div>;
    }

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
                        รายการสินค้า ({products.length})
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
                        {/* 💡 ผูก input ค้นหาเข้ากับ state */}
                        <input 
                            type="text" 
                            placeholder="ค้นหาชื่อเรื่อง, ผู้แต่ง, หรือรายละเอียด..." 
                            className="search-input" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>รูปสินค้า</th>
                                <th>ชื่อเรื่อง</th>
                                <th>ชื่อผู้แต่ง</th>
                                <th>รายละเอียด</th>
                                <th>จำนวน (Stock)</th>
                                <th>ราคา</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? ( // 💡 ใช้ filteredProducts ในการวนลูป
                                filteredProducts.map((product) => (
                                    <tr key={product._id}> 
                                        <td>{product._id}</td>
                                        <td>
                                            <img src={product.image || 'placeholder.jpg'} alt={product.title} className="product-image" />
                                        </td>
                                        <td>{product.title}</td>
                                        <td>{product.author || '-'}</td>
                                        <td className="product-desc">{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>฿{product.price.toFixed(2)}</td> 
                                        <td>
                                            <div className="action-buttons">
                                                <button 
                                                    className="btn btn-edit"
                                                    onClick={() => handleEditProduct(product._id)}
                                                >
                                                    แก้ไข
                                                </button>
                                                <button 
                                                    className="btn btn-delete"
                                                    onClick={() => handleDeleteProduct(product._id, product.title)}
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>
                                        {searchTerm ? `ไม่พบสินค้าที่ตรงกับ "${searchTerm}"` : 'ไม่พบรายการสินค้าในฐานข้อมูล'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
}

export default ProductPage;