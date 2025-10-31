import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Homepage.css";
// (Assets imports คงเดิม)
import logo from "../assets/logo.png"; 
import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";
import promo3 from "../assets/promo3.png";
import promo4 from "../assets/promo4.png";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.gif";
// (imports อื่นๆ)
import book4 from "../assets/book4.png";
import book5 from "../assets/book5.png";
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

// Mock data (ใช้เป็น Fallback ถ้าดึงข้อมูลไม่ได้)
const mockBooks = [
    { _id: 1, title: "Harry Potter", author: "J.K. Rowling", price: 12.99, image: book1, category: 'Fantasy', createdAt: new Date() },
];
const images = [promo1, promo2, promo3, promo4];


function Homepage() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    
    // 🔑 New: State สำหรับเก็บข้อมูลหนังสือทั้งหมดจาก API
    const [allBooks, setAllBooks] = useState([]); 
    const [loading, setLoading] = useState(true);

    // ----------------------------------------------------
    // 💡 ฟังก์ชัน Fetch ข้อมูลจาก Backend
    // ----------------------------------------------------

    const fetchAllBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            // 💡 บันทึกข้อมูลที่ดึงมา
            setAllBooks(data); 
        } catch (error) {
            console.error("Error fetching books:", error);
            // ใช้ Mock Data เป็น Fallback ถ้า API ล้มเหลว
            setAllBooks(mockBooks); 
        } finally {
            setLoading(false);
        }
    };
    
    // 🔑 useEffect: ดึงข้อมูลหนังสือทั้งหมดเมื่อโหลดครั้งแรก
    useEffect(() => {
        fetchAllBooks();
    }, []);

    // Carousel auto-slide effect (โค้ดเดิม)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Navigation handlers
    const handleCartClick = () => {
        navigate('/buy');
    };

    const handleProfileClick = () => {
        navigate('/HomepageProfile');
    };
    
    // ----------------------------------------------------
    // 💡 ฟังก์ชันจัดเรียงและกรองข้อมูล
    // ----------------------------------------------------

    // 🔑 จัดเรียง: สินค้ามาใหม่ (เรียงตาม createdAt ล่าสุด)
    const getNewBooks = () => {
        return [...allBooks] // สำเนา array เพื่อไม่แก้ไข state เดิม
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5); // 5 อันดับแรก
    };
    
    // 🔑 กรอง: หนังสือตาม Category
    const getBooksByCategory = (category) => {
        return allBooks
            .filter(book => book.category && book.category.toLowerCase() === category.toLowerCase())
            .slice(0, 5); // 5 อันดับแรก
    };
    
    // 🔑 จัดอันดับ: *สมมติ* ว่ามีข้อมูลการขาย (หากไม่มีจะใช้ 'ใหม่' แทน)
    const getTopSellingBooks = () => {
        // 🚨 ในตอนนี้ ไม่มี API Top Selling จริง ผมจะใช้ 'สินค้าใหม่' เป็นตัวแทน 
        // 🚨 เมื่อคุณสร้าง API Top Selling แล้ว ให้เปลี่ยนมาใช้ API นั้น
        return getNewBooks(); 
    };


    // Book card component (ปรับให้รองรับข้อมูลจริง)
    const BookCard = ({ book }) => (
        <div className="homepage-book-card">
            {/* 💡 ใช้ product.image จาก DB */}
            <img src={book.image || book1} alt={book.title} className="homepage-book-image" /> 
            <h3 className="homepage-book-title">{book.title}</h3>
            <p className="homepage-book-author">{book.author}</p>
            {/* 💡 ใช้ product.price จาก DB และ format */}
            <p className="homepage-book-price">฿{book.price ? book.price.toFixed(2) : 'N/A'}</p> 
            <button className="homepage-add-to-cart-btn">เพิ่มลงตะกร้า</button>
        </div>
    );
    
    // Book section component (ปรับให้รับข้อมูลที่กรองแล้ว)
    const BookSection = ({ title, isTop10 = false, booksToShow }) => (
        <section className="homepage-books-section">
            <h2 className={isTop10 ? "homepage-red-box-top10" : "homepage-red-box"}>
                {title}
            </h2>
            {loading ? (
                <div className="loading-text">กำลังโหลดหนังสือ...</div>
            ) : (
                <div className="homepage-books-grid">
                    {booksToShow.length > 0 ? (
                        booksToShow.map((book) => (
                            <BookCard key={book._id || book.id} book={book} />
                        ))
                    ) : (
                         <div className="no-books-found">ไม่พบหนังสือในหมวดหมู่นี้</div>
                    )}
                    
                    <div className="homepage-view-all-card">
                        <button className="homepage-view-all-btn">ดูทั้งหมด</button>
                    </div>
                </div>
            )}
        </section>
    );

    // Carousel buttons component (โค้ดเดิม)
    const CarouselButtons = () => (
        <div className="homepage-hero-buttons">
            {images.map((_, index) => (
                <button
                    key={index}
                    className={current === index ? "homepage-active" : ""}
                    onClick={() => setCurrent(index)}
                />
            ))}
        </div>
    );

    // Reusable components for icons (โค้ดเดิม)
    const PaymentIcon = ({ src, alt }) => (
        <div className="homepage-image-link">
            <img src={src} alt={alt} />
        </div>
    );

    const SocialIcon = ({ src, alt }) => (
        <div className="homepage-image-link">
            <img src={src} alt={alt} />
        </div>
    );


    return (
        <div className="homepage">
            
            {/* Header Section */}
            <header className="homepage-header">
                <img src={logo} alt="BookStore Logo" className="homepage-logo" />
                
                <nav className="homepage-nav">
                    <a href="#home">หน้าแรก</a>
                    <a href="#shop">10 อันดับ</a>
                </nav>
                
                <div className="homepage-search-container">
                    <MdOutlineShoppingCart 
                        className="homepage-header-icon" 
                        onClick={handleCartClick}
                        style={{ cursor: 'pointer' }}
                    />
                    
                    <CgProfile 
                        className="homepage-header-icon" 
                        onClick={handleProfileClick} 
                        style={{ cursor: 'pointer' }} 
                    />
                    
                    <input
                        type="text"
                        placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
                        className="homepage-search-bar"
                    />
                    
                    <FaSearch className="homepage-search-icon" />
                </div>
            </header>

            {/* Hero Carousel Section */}
            <section className="homepage-hero">
                <img 
                    src={images[current]} 
                    alt="Promotion" 
                    className="homepage-hero-image" 
                />
                <CarouselButtons />
            </section>

            {/* Books Sections (ใช้ข้อมูลที่กรองแล้ว) */}
            <BookSection 
                title="มังงะขายดี 10 อันดับ" 
                isTop10={true} 
                booksToShow={getTopSellingBooks()} // 🔑 ใช้ฟังก์ชันจัดอันดับ
            />

            <BookSection 
                title="ใหม่" 
                booksToShow={getNewBooks()} // 🔑 ใช้ฟังก์ชันสินค้ามาใหม่
            />

            <BookSection 
                title="ต่อสู้" 
                booksToShow={getBooksByCategory('Action')} // 🔑 กรองตาม 'ต่อสู้'
            />

            <BookSection 
                title="กีฬา" 
                booksToShow={getBooksByCategory('Sport')} // 🔑 กรองตาม 'กีฬา'
            />

            {/* Footer Section (โค้ดเดิม) */}
            <footer className="homepage-footer">
                <div className="homepage-footer-content">
                    
                    {/* Quick Links */}
                    <div className="homepage-footer-section">
                        <p><strong>ทางลัด</strong></p>
                        <p>หนังสือขายดี 10 อันดับ</p>
                        <p>ต่อสู้</p>
                        <p>โรแมนซ์</p>
                        <p>กีฬา</p>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="homepage-footer-section">
                        <p><strong>ช่องทางชำระเงิน</strong></p>
                        <div className="homepage-payment-methods">
                            <PaymentIcon src={visaImage} alt="visa" />
                            <PaymentIcon src={mastercardImage} alt="mastercard" />
                            <PaymentIcon src={paypalImage} alt="paypal" />
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="homepage-footer-section homepage-third-column">
                        <p><strong>ติดตามข่าวสารได้ที่</strong></p>
                        <div className="homepage-social-icons">
                            <div className="homepage-social-row">
                                <SocialIcon src={fbImage} alt="facebook" />
                                <SocialIcon src={igImage} alt="instagram" />
                                <SocialIcon src={lineImage} alt="line" />
                            </div>
                            <div className="homepage-social-row">
                                <SocialIcon src={ytImage} alt="youtube" />
                                <SocialIcon src={ttImage} alt="tiktok" />
                                <SocialIcon src={xImage} alt="x" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Homepage;