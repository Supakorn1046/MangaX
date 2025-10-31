import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Homepage.css";

// Assets imports
import logo from "../assets/logo.png"; 
import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";
import promo3 from "../assets/promo3.png";
import promo4 from "../assets/promo4.png";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.gif";
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
const API_CART_URL = 'http://localhost:5000/api/cart'; 

// Mock data
const mockBooks = [
    { _id: 1, title: "Harry Potter", author: "J.K. Rowling", price: 12.99, image: book1, category: 'Fantasy', createdAt: new Date() },
];

const images = [promo1, promo2, promo3, promo4];

function Homepage() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    
    const [allBooks, setAllBooks] = useState([]); 
    const [topSellingBooks, setTopSellingBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                // ดึงหนังสือทั้งหมด
                const allBooksRes = await fetch(API_BASE_URL);
                
                if (!allBooksRes.ok) {
                    throw new Error('Failed to fetch books data');
                }
                
                const allBooksData = await allBooksRes.json();
                setAllBooks(allBooksData);

                // พยายามดึงหนังสือขายดี (มี fallback)
                try {
                    const topSellingRes = await fetch(`${API_BASE_URL}/bestsellers`);
                    if (topSellingRes.ok) {
                        const topSellingData = await topSellingRes.json();
                        // --- ⭐️ ส่วนที่แก้ไข 1 ⭐️ ---
                        setTopSellingBooks(topSellingData.slice(0, 5)); // 👈 แก้จาก 10 เป็น 5
                    } else {
                        // ถ้าไม่มี endpoint นี้ ให้ใช้หนังสือทั้งหมดเป็น fallback
                        // --- ⭐️ ส่วนที่แก้ไข 2 ⭐️ ---
                        setTopSellingBooks(allBooksData.slice(0, 5)); // 👈 แก้จาก 10 เป็น 5
                    }
                } catch (bestsellerError) {
                    console.warn('Bestsellers endpoint not available, using fallback');
                    // --- ⭐️ ส่วนที่แก้ไข 2 (ซ้ำ) ⭐️ ---
                    setTopSellingBooks(allBooksData.slice(0, 5)); // 👈 แก้จาก 10 เป็น 5
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setAllBooks(mockBooks); 
                setTopSellingBooks(mockBooks.slice(0, 5)); // 👈 แก้จาก 10 เป็น 5
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllData();
    }, []);

    // (Carousel effect - เหมือนเดิม)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // (Navigation handlers - เหมือนเดิม)
    const handleCartClick = () => {
        navigate('/buy');
    };
    const handleProfileClick = () => {
        navigate('/HomepageProfile');
    };
    const handleBookClick = (bookId) => {
        navigate(`/productdetail/${bookId}`);
    };
    const handleViewAll = (path) => {
        navigate(path);
    };
    
    // (Filter functions - เหมือนเดิม)
    const getNewBooks = () => {
        return [...allBooks]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
    };
    const getBooksByCategory = (category) => {
        return allBooks
            .filter(book => book.category && book.category.toLowerCase() === category.toLowerCase())
            .slice(0, 5);
    };
    
    // (Add to cart function - เหมือนเดิม)
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

    // (BookCard component - เหมือนเดิม)
    const BookCard = ({ book }) => {
        const bookImage = book.image || book1;
        return (
            <div 
                className="homepage-book-card" 
                onClick={() => handleBookClick(book._id)} 
                style={{ cursor: 'pointer' }}
            >
                <img src={bookImage} alt={book.title} className="homepage-book-image" />
                <h3 className="homepage-book-title">{book.title}</h3>
                <p className="homepage-book-author">{book.author || 'ไม่ทราบผู้แต่ง'}</p>
                <p className="homepage-book-price">
                    ฿{book.price ? book.price.toFixed(2) : 'N/A'}
                </p>
                <button 
                    className="homepage-add-to-cart-btn" 
                    onClick={(e) => handleAddToCart(e, book)}
                >
                    เพิ่มลงตะกร้า
                </button>
            </div>
        );
    };
    
    // (BookSection component - เหมือนเดิม)
    const BookSection = ({ title, isTop10 = false, booksToShow = [], viewAllPath }) => (
        <section className="homepage-books-section">
            <h2 className={isTop10 ? "homepage-red-box-top10" : "homepage-red-box"}>
                {title}
            </h2>
            {loading ? (
                <div className="loading-text">กำลังโหลดหนังสือ...</div>
            ) : error ? (
                <div className="error-text">เกิดข้อผิดพลาด: {error}</div>
            ) : (
                <div className="homepage-books-grid">
                    {booksToShow && booksToShow.length > 0 ? (
                        booksToShow.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))
                    ) : (
                        <div className="no-books-found">ไม่พบหนังสือในหมวดหมู่นี้</div>
                    )}
                    
                    <div className="homepage-view-all-card">
                        <button 
                            className="homepage-view-all-btn" 
                            onClick={() => handleViewAll(viewAllPath)}
                        >
                            ดูทั้งหมด
                        </button>
                    </div>
                </div>
            )}
        </section>
    );

    // (Reusable components - เหมือนเดิม)
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
            {/* Header Section (เหมือนเดิม) */}
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

            {/* Hero Carousel Section (เหมือนเดิม) */}
            <section className="homepage-hero">
                <img 
                    src={images[current]} 
                    alt="Promotion" 
                    className="homepage-hero-image" 
                />
                <CarouselButtons />
            </section>

            {/* Books Sections */}
            {/* --- ⭐️ ส่วนที่แก้ไข 3 ⭐️ --- */}
            <BookSection 
                title="มังงะขายดี 10 อันดับ" // 👈 เปลี่ยน Title
                isTop10={true} 
                booksToShow={topSellingBooks} // 👈 (State นี้ถูก slice เหลือ 5 แล้ว)
                viewAllPath="/SeeAlltop10"
            />

            <BookSection 
                title="ใหม่" 
                booksToShow={getNewBooks()}
                viewAllPath="/New"
            />

            <BookSection 
                title="ต่อสู้" 
                booksToShow={getBooksByCategory('Action')}
                viewAllPath="/Action"
            />

            <BookSection 
                title="กีฬา" 
                booksToShow={getBooksByCategory('Sport')}
                viewAllPath="/Sport"
            />

            {/* Footer Section (เหมือนเดิม) */}
            <footer className="homepage-footer">
                <div className="homepage-footer-content">
                    <div className="homepage-footer-section">
                        <p><strong>ทางลัด</strong></p>
                        <p>หนังสือขายดี 10 อันดับ</p>
                        <p>ต่อสู้</p>
                        <p>โรแมนซ์</p>
                        <p>กีฬา</p>
                    </div>
                    <div className="homepage-footer-section">
                        <p><strong>ช่องทางชำระเงิน</strong></p>
                        <div className="homepage-payment-methods">
                            <PaymentIcon src={visaImage} alt="visa" />
                            <PaymentIcon src={mastercardImage} alt="mastercard" />
                            <PaymentIcon src={paypalImage} alt="paypal" />
                        </div>
                    </div>
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