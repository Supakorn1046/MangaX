import React, { useState, useEffect } from 'react'; // 💡 เพิ่ม useState, useEffect
import { useNavigate } from 'react-router-dom';      // 💡 เพิ่ม useNavigate
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Action.css";
import logo from "../assets/logo.png";
// (Imports อื่นๆ)
import visaImage from '../assets/visa.png';
import mastercardImage from '../assets/mastercard.png';
import paypalImage from '../assets/paypal.png';
import fbImage from '../assets/fb.png';
import igImage from '../assets/ig.png';
import lineImage from '../assets/line.png';
import ytImage from '../assets/yt1.png';
import ttImage from '../assets/tt.png';
import xImage from '../assets/x.png';

// URL ฐานของ API
const API_BASE_URL = 'http://localhost:5000/api/books';
const TARGET_CATEGORY = 'Action'; // 🔑 กำหนดหมวดหมู่เป้าหมาย

function Action() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ----------------------------------------------------
    // 💡 ฟังก์ชัน Fetch & Filter ข้อมูลจาก Backend
    // ----------------------------------------------------
    const fetchActionBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. ดึงข้อมูลหนังสือทั้งหมด
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch all books');
            }
            const allData = await response.json();

            // 2. กรองข้อมูลตาม Category ใน Frontend
            const filteredBooks = allData.filter(book => 
                book.category && book.category.toLowerCase() === TARGET_CATEGORY.toLowerCase()
            );
            
            setBooks(filteredBooks);
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หรือดึงข้อมูลได้');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActionBooks();
    }, []);

    // Navigation Handlers
    const handleCartClick = () => navigate('/buy');
    const handleLoginClick = () => navigate('/login');
    const handleHomepageClick = () => navigate('/');


    // ----------------------------------------------------
    // 💡 การแสดงผล (Render)
    // ----------------------------------------------------

    if (loading) {
        return (
            <div className="action-page loading-screen">
                กำลังโหลดหนังสือหมวด "{TARGET_CATEGORY}"...
            </div>
        );
    }

    if (error) {
        return (
            <div className="action-page error-screen">
                ข้อผิดพลาดในการโหลด: {error}
            </div>
        );
    }


    return (
        <div className="action-page">
            {/* Header */}
            <header className="action-header">
                <img src={logo} alt="BookStore Logo" className="action-logo" />
                <nav>
                    <a href="#" onClick={handleHomepageClick}>หน้าแรก</a>
                    <a href="#shop">10 อันดับ</a>
                </nav>
                <div className="action-search-container">
                    <MdOutlineShoppingCart 
                        className="action-header-icon" 
                        onClick={handleCartClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <MdLogin 
                        className="action-header-icon" 
                        onClick={handleLoginClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
                        className="action-search-bar"
                    />
                    <FaSearch className="action-search-icon" />
                </div>
            </header>

            {/* เนื้อหาหลัก */}
            <section className="action-books-section">
                <h2 className="action-red-box">หมวด: {TARGET_CATEGORY} ({books.length} รายการ)</h2>
                
                {books.length === 0 ? (
                    <div className="no-books-found">ไม่พบหนังสือในหมวด "{TARGET_CATEGORY}"</div>
                ) : (
                    <div className="action-books-grid">
                        {books.map((book) => (
                            <div key={book._id} className="action-book-card">
                                
                                <div className="action-book-image-container">
                                    <img 
                                        src={book.image || 'placeholder.jpg'} 
                                        alt={book.title} 
                                        className="action-book-image"
                                    />
                                </div>
                                
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                {/* 💡 แสดงราคาจาก DB และ format */}
                                <p className="action-price">฿{book.price ? book.price.toFixed(2) : 'N/A'}</p> 
                                <button>เพิ่มลงตะกร้า</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="action-footer">
                <div className="action-footer-content">
                    {/* ... (Footer sections remain largely the same) */}
                    <div className="action-footer-section">
                        <p><strong>ทางลัด</strong></p>
                        <p>หนังสือขายดี 10 อันดับ</p>
                        <p>ต่อสู้</p>
                        <p>โรแมนซ์</p>
                        <p>กีฬา</p>
                    </div>
                    
                    <div className="action-footer-section">
                        <p><strong>ช่องทางชำระเงิน</strong></p>
                        <div className="action-payment-methods">
                            <div className="action-image-link">
                                <img src={visaImage} alt="visa" />
                            </div>
                            <div className="action-image-link">
                                <img src={mastercardImage} alt="mastercard" />
                            </div>
                            <div className="action-image-link">
                                <img src={paypalImage} alt="paypal" />
                            </div>
                        </div>
                    </div>

                    <div className="action-footer-section action-third-column">
                        <p><strong>ติดตามข่าวสารได้ที่</strong></p>
                        <div className="action-social-icons">
                            <div className="action-social-row">
                                <div className="action-image-link">
                                    <img src={fbImage} alt="facebook" />
                                </div>
                                <div className="action-image-link">
                                    <img src={igImage} alt="instagram" />
                                </div>
                                <div className="action-image-link">
                                    <img src={lineImage} alt="line" />
                                </div>
                            </div>
                            <div className="action-social-row">
                                <div className="action-image-link">
                                    <img src={ytImage} alt="youtube" />
                                </div>
                                <div className="action-image-link">
                                    <img src={ttImage} alt="tiktok" />
                                </div>
                                <div className="action-image-link">
                                    <img src={xImage} alt="x" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Action;