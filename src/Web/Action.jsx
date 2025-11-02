import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./Action.css";
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
import bookPlaceholder from "../assets/book1.png";

// URL ฐานของ API
const API_BASE_URL = 'http://localhost:5000/api/books';
const API_CART_URL = 'http://localhost:5000/api/cart';
const TARGET_CATEGORY = 'Action';

function Action() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // ✅ State สำหรับค้นหา

    // ✅ ฟังก์ชันดึงข้อมูลหนังสือ
    const fetchActionBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch all books');
            }
            const allData = await response.json();

            const filteredBooks = allData.filter(book => 
                book.category && book.category.toLowerCase() === TARGET_CATEGORY.toLowerCase()
            );
            
            setBooks(filteredBooks);
            setFilteredBooks(filteredBooks); // ✅ ตั้งค่าเริ่มต้นให้ filteredBooks
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

    // ✅ ฟังก์ชันการค้นหาในหน้านี้
    const handleSearch = (e) => {
        if (e) {
            e.preventDefault();
        }
        
        const query = searchQuery.trim().toLowerCase();
        
        if (query === '') {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter(book => 
                book.title.toLowerCase().includes(query) ||
                (book.author && book.author.toLowerCase().includes(query)) ||
                (book.category && book.category.toLowerCase().includes(query))
            );
            setFilteredBooks(filtered);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredBooks(books);
    };

    // Navigation Handlers
    const handleCartClick = () => navigate('/buy');
    const handleProfileClick = () => navigate('/HomepageProfile');
    const handleHomepageClick = () => navigate('/homepage');
    const handleBookClick = (bookId) => navigate(`/productdetail/${bookId}`);

    // ✅ ฟังก์ชันเพิ่มลงตะกร้า
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

    // ✅ BookCard Component
    const BookCard = ({ book }) => {
        const bookImage = book.image || bookPlaceholder;
        return (
            <div 
                className="action-book-card" 
                onClick={() => handleBookClick(book._id)}
                style={{ cursor: 'pointer' }}
            >
                <div className="action-book-image-container">
                    <img 
                        src={bookImage} 
                        alt={book.title} 
                        className="action-book-image"
                    />
                </div>
                <h3 className="action-book-title">{book.title}</h3>
                <p className="action-book-author">{book.author || 'ไม่ทราบผู้แต่ง'}</p>
                <p className="action-price">฿{book.price ? book.price.toFixed(2) : 'N/A'}</p>
                <button 
                    className="action-add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, book)}
                >
                    เพิ่มลงตะกร้า
                </button>
            </div>
        );
    };

    // ✅ Reusable Components
    const PaymentIcon = ({ src, alt }) => (
        <div className="action-image-link">
            <img src={src} alt={alt} />
        </div>
    );

    const SocialIcon = ({ src, alt }) => (
        <div className="action-image-link">
            <img src={src} alt={alt} />
        </div>
    );

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
                    <a href="/homepage" onClick={handleHomepageClick}>หน้าแรก</a>
                    <a href="/SeeAlltop10">10 อันดับ</a>
                </nav>
                <div className="action-search-container">
                    <MdOutlineShoppingCart 
                        className="action-header-icon" 
                        onClick={handleCartClick}
                        style={{ cursor: 'pointer' }}
                    />
                    <CgProfile
                        className="action-header-icon" 
                        onClick={handleProfileClick}
                        style={{ cursor: 'pointer' }}
                    />
                    {/* ✅ แถบค้นหาที่ทำงานได้ */}
                    <div className="action-search-wrapper">
                        <input
                            type="text"
                            placeholder="ค้นหาหนังสือตามชื่อเรื่อง, ผู้แต่ง, หมวดหมู่"
                            className="action-search-bar"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyPress={handleSearchKeyPress}
                        />
                        <FaSearch 
                            className="action-search-icon" 
                            onClick={handleSearch}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </header>

            {/* เนื้อหาหลัก */}
            <section className="action-books-section">
                <div className="action-header-section">
                    <h2 className="action-red-box">หมวด: {TARGET_CATEGORY} ({filteredBooks.length} รายการ)</h2>
                    
                    {/* ✅ แสดงผลการค้นหา */}
                    {searchQuery && (
                        <div className="action-search-results-info">
                            <p>
                                ผลการค้นหาสำหรับ: "<strong>{searchQuery}</strong>" 
                                <button 
                                    className="action-clear-search"
                                    onClick={handleClearSearch}
                                >
                                    ล้างการค้นหา
                                </button>
                            </p>
                        </div>
                    )}
                </div>
                
                {filteredBooks.length === 0 ? (
                    <div className="action-no-books-found">
                        {searchQuery ? 
                            `ไม่พบหนังสือที่ตรงกับการค้นหา "${searchQuery}"` : 
                            `ไม่พบหนังสือในหมวด "${TARGET_CATEGORY}"`
                        }
                        {searchQuery && (
                            <button 
                                className="action-clear-search-btn"
                                onClick={handleClearSearch}
                            >
                                แสดงหนังสือทั้งหมด
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="action-books-grid">
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="action-footer">
                <div className="action-footer-content">
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
                            <PaymentIcon src={visaImage} alt="visa" />
                            <PaymentIcon src={mastercardImage} alt="mastercard" />
                            <PaymentIcon src={paypalImage} alt="paypal" />
                        </div>
                    </div>

                    <div className="action-footer-section action-third-column">
                        <p><strong>ติดตามข่าวสารได้ที่</strong></p>
                        <div className="action-social-icons">
                            <div className="action-social-row">
                                <SocialIcon src={fbImage} alt="facebook" />
                                <SocialIcon src={igImage} alt="instagram" />
                                <SocialIcon src={lineImage} alt="line" />
                            </div>
                            <div className="action-social-row">
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

export default Action;