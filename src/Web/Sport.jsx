import React, { useState, useEffect } from 'react'; // 💡 เพิ่ม useState, useEffect
import { useNavigate } from 'react-router-dom';      // 💡 เพิ่ม useNavigate
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Sport.css";
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
const TARGET_CATEGORY = 'Sport'; // 🔑 กำหนดหมวดหมู่เป้าหมาย

function Sport() {
    const navigate = useNavigate();

    // 💡 State สำหรับเก็บข้อมูล, Loading, และ Error
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ----------------------------------------------------
    // 💡 ฟังก์ชัน Fetch & Filter ข้อมูลจาก Backend
    // ----------------------------------------------------
    const fetchSportBooks = async () => {
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

    // 🔑 useEffect: เรียกฟังก์ชันเมื่อคอมโพเนนต์โหลดครั้งแรก
    useEffect(() => {
        fetchSportBooks();
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
            <div className="sport-page loading-screen">
                กำลังโหลดหนังสือหมวด "{TARGET_CATEGORY}"...
            </div>
        );
    }

    if (error) {
        return (
            <div className="sport-page error-screen">
                ข้อผิดพลาดในการโหลด: {error}
            </div>
        );
    }


    return (
        <div className="sport-page">
            {/* Header */}
            <header className="sport-header">
                <img src={logo} alt="BookStore Logo" className="sport-logo" />
                <nav>
                    <a href="#" onClick={handleHomepageClick}>หน้าแรก</a>
                    <a href="#shop">10 อันดับ</a>
                </nav>
                <div className="sport-search-container">
                    <MdOutlineShoppingCart 
                        className="sport-header-icon" 
                        onClick={handleCartClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <MdLogin 
                        className="sport-header-icon" 
                        onClick={handleLoginClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
                        className="sport-search-bar"
                    />
                    <FaSearch className="sport-search-icon" />
                </div>
            </header>

            {/* เนื้อหาหลัก */}
            <section className="sport-books-section">
                <h2 className="sport-red-box">หมวด: {TARGET_CATEGORY} ({books.length} รายการ)</h2>
                
                {books.length === 0 ? (
                    <div className="no-books-found">ไม่พบหนังสือในหมวด "{TARGET_CATEGORY}"</div>
                ) : (
                    <div className="sport-books-grid">
                        {books.map((book) => (
                            <div key={book._id} className="sport-book-card">
                                
                                <div className="sport-book-image-container">
                                    {/* 💡 แสดงรูปภาพจาก URL ที่บันทึกใน DB */}
                                    <img 
                                        src={book.image || 'placeholder.jpg'} 
                                        alt={book.title} 
                                        className="sport-book-image"
                                    />
                                </div>
                                
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                {/* 💡 แสดงราคาจาก DB และ format */}
                                <p className="sport-price">฿{book.price ? book.price.toFixed(2) : 'N/A'}</p> 
                                <button>เพิ่มลงตะกร้า</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="sport-footer">
                <div className="sport-footer-content">
                    {/* ... (Footer sections remain largely the same) */}
                    <div className="sport-footer-section">
                        <p><strong>ทางลัด</strong></p>
                        <p>หนังสือขายดี 10 อันดับ</p>
                        <p>ต่อสู้</p>
                        <p>โรแมนซ์</p>
                        <p>กีฬา</p>
                    </div>
                    
                    <div className="sport-footer-section">
                        <p><strong>ช่องทางชำระเงิน</strong></p>
                        <div className="sport-payment-methods">
                            <div className="sport-image-link">
                                <img src={visaImage} alt="visa" />
                            </div>
                            <div className="sport-image-link">
                                <img src={mastercardImage} alt="mastercard" />
                            </div>
                            <div className="sport-image-link">
                                <img src={paypalImage} alt="paypal" />
                            </div>
                        </div>
                    </div>

                    <div className="sport-footer-section sport-third-column">
                        <p><strong>ติดตามข่าวสารได้ที่</strong></p>
                        <div className="sport-social-icons">
                            <div className="sport-social-row">
                                <div className="sport-image-link">
                                    <img src={fbImage} alt="facebook" />
                                </div>
                                <div className="sport-image-link">
                                    <img src={igImage} alt="instagram" />
                                </div>
                                <div className="sport-image-link">
                                    <img src={lineImage} alt="line" />
                                </div>
                            </div>
                            <div className="sport-social-row">
                                <div className="sport-image-link">
                                    <img src={ytImage} alt="youtube" />
                                </div>
                                <div className="sport-image-link">
                                    <img src={ttImage} alt="tiktok" />
                                </div>
                                <div className="sport-image-link">
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

export default Sport;