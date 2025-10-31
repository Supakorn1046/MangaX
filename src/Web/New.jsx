import React, { useState, useEffect } from 'react'; // 💡 เพิ่ม useEffect
import { useNavigate } from 'react-router-dom';      // 💡 เพิ่ม useNavigate
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./New.css";
// Assets imports
import logo from "../assets/logo.png";
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

function New() {
    const navigate = useNavigate();
    
    // 💡 State สำหรับเก็บข้อมูล, Loading, และ Error
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ----------------------------------------------------
    // 💡 ฟังก์ชัน Fetch & Sort ข้อมูลจาก Backend
    // ----------------------------------------------------
    const fetchNewBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch all books');
            }
            const allData = await response.json();

            // 🔑 จัดเรียง: เรียงจากใหม่สุดไปเก่าสุด (ตาม createdAt)
            const sortedBooks = [...allData].sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            
            setBooks(sortedBooks);
        } catch (err) {
            setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หรือดึงข้อมูลได้');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    // 🔑 useEffect: เรียกฟังก์ชันเมื่อคอมโพเนนต์โหลดครั้งแรก
    useEffect(() => {
        fetchNewBooks();
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
            <div className="new-page loading-screen">
                กำลังโหลดหนังสือใหม่ล่าสุด...
            </div>
        );
    }

    if (error) {
        return (
            <div className="new-page error-screen">
                ข้อผิดพลาดในการโหลด: {error}
            </div>
        );
    }


    return (
        <div className="new-page">
            {/* Header */}
            <header className="new-header">
                <img src={logo} alt="BookStore Logo" className="new-logo" />
                <nav>
                    <a href="#" onClick={handleHomepageClick}>หน้าแรก</a>
                    <a href="#shop">10 อันดับ</a>
                </nav>
                <div className="new-search-container">
                    <MdOutlineShoppingCart 
                        className="new-header-icon" 
                        onClick={handleCartClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <MdLogin 
                        className="new-header-icon" 
                        onClick={handleLoginClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
                        className="new-search-bar"
                    />
                    <FaSearch className="new-search-icon" />
                </div>
            </header>

            {/* เนื้อหาหลัก */}
            <section className="new-books-section">
                <h2 className="new-red-box">ใหม่ล่าสุด ({books.length} รายการ)</h2>
                
                {books.length === 0 ? (
                    <div className="no-books-found">ไม่พบรายการหนังสือ</div>
                ) : (
                    <div className="new-books-grid">
                        {books.map((book) => (
                            <div key={book._id} className="new-book-card">
                                
                                <div className="new-book-image-container">
                                    {/* 💡 แสดงรูปภาพจาก URL ที่บันทึกใน DB */}
                                    <img 
                                        src={book.image || 'placeholder.jpg'} 
                                        alt={book.title} 
                                        className="new-book-image"
                                    />
                                </div>
                                
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                {/* 💡 แสดงราคาจาก DB และ format */}
                                <p className="new-price">฿{book.price ? book.price.toFixed(2) : 'N/A'}</p> 
                                <button>เพิ่มลงตะกร้า</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="new-footer">
                <div className="new-footer-content">
                    {/* Footer sections (โค้ดเดิม) */}
                    <div className="new-footer-section">
                        <p><strong>ทางลัด</strong></p>
                        <p>หนังสือขายดี 10 อันดับ</p>
                        <p>ต่อสู้</p>
                        <p>โรแมนซ์</p>
                        <p>กีฬา</p>
                    </div>
                    
                    <div className="new-footer-section">
                        <p><strong>ช่องทางชำระเงิน</strong></p>
                        <div className="new-payment-methods">
                            <div className="new-image-link">
                                <img src={visaImage} alt="visa" />
                            </div>
                            <div className="new-image-link">
                                <img src={mastercardImage} alt="mastercard" />
                            </div>
                            <div className="new-image-link">
                                <img src={paypalImage} alt="paypal" />
                            </div>
                        </div>
                    </div>

                    <div className="new-footer-section new-third-column">
                        <p><strong>ติดตามข่าวสารได้ที่</strong></p>
                        <div className="new-social-icons">
                            <div className="new-social-row">
                                <div className="new-image-link">
                                    <img src={fbImage} alt="facebook" />
                                </div>
                                <div className="new-image-link">
                                    <img src={igImage} alt="instagram" />
                                </div>
                                <div className="new-image-link">
                                    <img src={lineImage} alt="line" />
                                </div>
                            </div>
                            <div className="new-social-row">
                                <div className="new-image-link">
                                    <img src={ytImage} alt="youtube" />
                                </div>
                                <div className="new-image-link">
                                    <img src={ttImage} alt="tiktok" />
                                </div>
                                <div className="new-image-link">
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

export default New;