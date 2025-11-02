import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
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
    
    // 🔥 State สำหรับการค้นหา
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // 🔥 ตรวจสอบการล็อกอินเมื่อ component โหลด
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userInfo = localStorage.getItem('userInfo');
            
            if (!token || !userInfo) {
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('isAdmin');
                navigate('/', { replace: true });
                return;
            }
        };

        checkAuth();
    }, [navigate]);

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
                        setTopSellingBooks(topSellingData.slice(0, 5));
                    } else {
                        setTopSellingBooks(allBooksData.slice(0, 5));
                    }
                } catch (bestsellerError) {
                    console.warn('Bestsellers endpoint not available, using fallback');
                    setTopSellingBooks(allBooksData.slice(0, 5));
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setAllBooks(mockBooks); 
                setTopSellingBooks(mockBooks.slice(0, 5));
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllData();
    }, []);

    // Carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // 🔥 ฟังก์ชันการค้นหาแบบ debounce
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        const searchTimer = setTimeout(() => {
            setIsSearching(true);
            
            // ค้นหาจากข้อมูลหนังสือทั้งหมด
            const results = allBooks.filter(book => 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (book.category && book.category.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            
            setSearchResults(results);
        }, 300); // ดีเลย์ 300ms

        return () => clearTimeout(searchTimer);
    }, [searchTerm, allBooks]);

    // 🔥 ฟังก์ชันเมื่อกด Enter ในช่องค้นหา
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 🔥 ฟังก์ชันค้นหาเมื่อคลิกไอคอน
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        
        const results = allBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (book.category && book.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        setSearchResults(results);
    };

    // 🔥 ฟังก์ชันล้างการค้นหา
    const handleClearSearch = () => {
        setSearchTerm("");
        setIsSearching(false);
        setSearchResults([]);
    };

    // Navigation handlers
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
    
    // Filter functions
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
    
    // Add to cart function
    const handleAddToCart = async (e, book) => {
        e.stopPropagation();
        
        // 🔥 ตรวจสอบการล็อกอินใหม่ทุกครั้ง
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        
        if (!token || !userInfo) {
            alert('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า');
            navigate('/', { replace: true });
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
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(cartData)
            });

            if (response.ok) {
                alert(`เพิ่ม "${book.title}" ลงตะกร้าสำเร็จ!`);
            } else if (response.status === 401) {
                // Token หมดอายุหรือไม่ถูกต้อง
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง');
                navigate('/', { replace: true });
            } else {
                const errData = await response.json();
                alert(`เกิดข้อผิดพลาด: ${errData.message || 'ไม่สามารถเพิ่มสินค้าได้'}`);
            }
        } catch (err) {
            alert('การเชื่อมต่อล้มเหลว ไม่สามารถเพิ่มสินค้าได้');
            console.error('Add to cart error:', err);
        }
    };

    // 🔥 ฟังก์ชันออกจากระบบ
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAdmin');
        navigate('/', { replace: true });
    };

    // BookCard component
    const BookCard = ({ book }) => {
        const bookImage = book.image || book1;
        return (
            <div 
                className="homepage-book-card" 
                onClick={() => handleBookClick(book._id)} 
                style={{ cursor: 'pointer' }}
            >
                <div className="homepage-book-image-container">
                    <img src={bookImage} alt={book.title} className="homepage-book-image" />
                </div>
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
    
    // BookSection component
    const BookSection = ({ title, isTop10 = false, booksToShow = [], viewAllPath }) => (
        <section className="homepage-books-section">
            <h2 className={isTop10 ? "homepage-red-box-top10" : "homepage-red-box"}>
                {title}
            </h2>
            {loading ? (
                <div className="homepage-loading-text">กำลังโหลดหนังสือ...</div>
            ) : error ? (
                <div className="homepage-error-text">เกิดข้อผิดพลาด: {error}</div>
            ) : (
                <div className="homepage-books-grid">
                    {booksToShow && booksToShow.length > 0 ? (
                        booksToShow.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))
                    ) : (
                        <div className="homepage-no-books-found">ไม่พบหนังสือในหมวดหมู่นี้</div>
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

    // 🔥 Search Results Section
    const SearchResultsSection = () => (
        <section className="homepage-books-section">
            <div className="homepage-search-results-header">
                <h2 className="homepage-red-box">
                    ผลการค้นหา: "{searchTerm}"
                </h2>
                <button 
                    className="homepage-clear-search-btn"
                    onClick={handleClearSearch}
                >
                    ล้างการค้นหา
                </button>
            </div>
            <div className="homepage-books-grid">
                {searchResults.length > 0 ? (
                    searchResults.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))
                ) : (
                    <div className="homepage-no-books-found">
                        ไม่พบหนังสือที่ตรงกับการค้นหา "{searchTerm}"
                    </div>
                )}
            </div>
        </section>
    );

    // Reusable components
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
            {/* Header Section */}
            <header className="homepage-header">
                <img src={logo} alt="BookStore Logo" className="homepage-logo" />
                <nav className="homepage-nav">
                    <a href="/homepage">หน้าแรก</a>
                    <a href="/SeeAlltop10">10 อันดับ</a>
                    
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
                    <div className="homepage-search-wrapper">
                        <input
                            type="text"
                            placeholder="ค้นหาหนังสือตามชื่อเรื่อง, ผู้แต่ง, หมวดหมู่"
                            className="homepage-search-bar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <FaSearch 
                            className="homepage-search-icon" 
                            onClick={handleSearch}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
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

            {/* 🔥 แสดงผลการค้นหาหากกำลังค้นหา */}
            {isSearching && <SearchResultsSection />}

            {/* Books Sections - แสดงเฉพาะเมื่อไม่มีการค้นหา */}
            {!isSearching && (
                <>
                    <BookSection 
                        title="มังงะขายดี 10 อันดับ"
                        isTop10={true} 
                        booksToShow={topSellingBooks}
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
                </>
            )}

            {/* Footer Section */}
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