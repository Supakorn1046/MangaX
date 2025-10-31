import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg"; // ✅ แก้ไข import
import "./Seealltop10.css";
import logo from "../assets/logo.png";
import visaImage from '../assets/visa.png';
import mastercardImage from '../assets/mastercard.png';
import paypalImage from '../assets/paypal.png'; // ✅ เพิ่ม import
import fbImage from '../assets/fb.png';
import igImage from '../assets/ig.png';
import lineImage from '../assets/line.png';
import ytImage from '../assets/yt1.png';
import ttImage from '../assets/tt.png';
import xImage from '../assets/x.png';

// API URLs
const API_BASE_URL = 'http://localhost:5000/api/books';
const API_CART_URL = 'http://localhost:5000/api/cart';

// ✅ เพิ่ม Reusable Components
const PaymentIcon = ({ src, alt }) => (
    <div className="seealltop10-image-link">
        <img src={src} alt={alt} />
    </div>
);

const SocialIcon = ({ src, alt }) => (
    <div className="seealltop10-image-link">
        <img src={src} alt={alt} />
    </div>
);

// BookCard Component
const BookCard = ({ book, onBookClick, onAddToCart }) => {
    const bookImage = book.image || 'https://via.placeholder.com/150x220?text=Book';

    return (
        <div className="seealltop10-book-card">
            <div 
                className="seealltop10-book-image-container"
                onClick={() => onBookClick(book._id)}
            >
                <img src={bookImage} alt={book.title} className="seealltop10-book-image" />
            </div>
            <h3>{book.title}</h3>
            <p>{book.author || 'ไม่ทราบผู้แต่ง'}</p>
            <p className="seealltop10-price">฿{book.price ? book.price.toFixed(2) : 'N/A'}</p>
            <button 
                className="seealltop10-add-to-cart-btn"
                onClick={(e) => onAddToCart(e, book)}
            >
                เพิ่มลงตะกร้า
            </button>
        </div>
    );
};

function Seealltop10() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch top books
    useEffect(() => {
        const fetchTopBooks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/bestsellers`);
                if (!response.ok) {
                    throw new Error('ไม่สามารถดึงข้อมูลหนังสือขายดีได้');
                }
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError(err.message);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTopBooks();
    }, []);

    // Navigation handlers
    const handleCartClick = () => navigate('/buy');
    const handleProfileClick = () => navigate('/HomepageProfile');
    const handleBookClick = (bookId) => navigate(`/productdetail/${bookId}`);

    // Add to cart function
    const handleAddToCart = async (e, book) => {
        e.stopPropagation(); 
        
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            alert('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า');
            navigate('/login');
            return;
        }
        
        const user = JSON.parse(userInfo);
        const userId = user._id;

        const cartData = {
            userId: userId,
            bookId: book._id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        };

        try {
            const response = await fetch(`${API_CART_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartData)
            });

            if (response.ok) {
                alert(`เพิ่ม "${book.title}" ลงตะกร้าสำเร็จ!`);
            } else {
                const errData = await response.json();
                alert(`เกิดข้อผิดพลาด: ${errData.message || 'ไม่สามารถเพิ่มสินค้าได้'}`);
            }
        } catch (err) {
            alert('การเชื่อมต่อล้มเหลว ไม่สามารถเพิ่มสินค้าได้');
            console.error('Add to cart error:', err);
        }
    };

    return (
        <div className="seealltop10-page">
            {/* Header */}
            <header className="seealltop10-header">
                <img src={logo} alt="BookStore Logo" className="seealltop10-logo" />
                <nav className="seealltop10-nav">
                    <a href="/">หน้าแรก</a>
                    <a href="#shop">10 อันดับ</a>
                </nav>
                <div className="seealltop10-search-container">
                    <MdOutlineShoppingCart 
                        className="seealltop10-header-icon" 
                        onClick={handleCartClick}
                    />
                    <CgProfile 
                        className="seealltop10-header-icon" 
                        onClick={handleProfileClick}
                    />
                    <input
                        type="text"
                        placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
                        className="seealltop10-search-bar"
                    />
                    <FaSearch className="seealltop10-search-icon" />
                </div>
            </header>

            {/* Main Content */}
            <section className="seealltop10-books-section">
                <h2 className="seealltop10-red-box-top10">มังงะขายดี 10 อันดับ</h2>
                
                {loading && <p className="seealltop10-loading-text">กำลังโหลดข้อมูล...</p>}
                {error && <p className="seealltop10-error-text">เกิดข้อผิดพลาด: {error}</p>}

                <div className="seealltop10-books-grid">
                    {!loading && !error && books.length > 0 && (
                        books.map((book) => (
                            <BookCard 
                                key={book._id} 
                                book={book} 
                                onBookClick={handleBookClick}
                                onAddToCart={handleAddToCart}
                            />
                        ))
                    )}
                    {!loading && !error && books.length === 0 && (
                        <p className="seealltop10-no-books">ไม่พบข้อมูลหนังสือขายดี</p>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="seealltop10-footer">
                <div className="seealltop10-footer-content">
                    <div className="seealltop10-footer-section">
                        <p><strong>ทางลัด</strong></p>
                        <p>หนังสือขายดี 10 อันดับ</p>
                        <p>ต่อสู้</p>
                        <p>โรแมนซ์</p>
                        <p>กีฬา</p>
                    </div>
                    
                    <div className="seealltop10-footer-section">
                        <p><strong>ช่องทางชำระเงิน</strong></p>
                        <div className="seealltop10-payment-methods">
                            <PaymentIcon src={visaImage} alt="visa" />
                            <PaymentIcon src={mastercardImage} alt="mastercard" />
                            <PaymentIcon src={paypalImage} alt="paypal" />
                        </div>
                    </div>

                    <div className="seealltop10-footer-section seealltop10-third-column">
                        <p><strong>ติดตามข่าวสารได้ที่</strong></p>
                        <div className="seealltop10-social-icons">
                            <div className="seealltop10-social-row">
                                <SocialIcon src={fbImage} alt="facebook" />
                                <SocialIcon src={igImage} alt="instagram" />
                                <SocialIcon src={lineImage} alt="line" />
                            </div>
                            <div className="seealltop10-social-row">
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

export default Seealltop10;