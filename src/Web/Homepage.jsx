import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Homepage.css";
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

const books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", price: "$12.99", image: book1 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", price: "$15.99", image: book2 },
  { id: 3, title: "1984", author: "George Orwell", price: "$10.99", image: book3 },
  { id: 4, title: "1984", author: "George Orwell", price: "$10.99", image: book4 },
  { id: 5, title: "1984", author: "George Orwell", price: "$10.99", image: book5 }
];

function Homepage() {
  const navigate = useNavigate();
  const images = [promo1, promo2, promo3, promo4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleCartClick = () => {
    navigate('/buy');
  };

  return (
    <div className="homepage">
      {/* Header */}
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
          <MdLogin className="homepage-header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="homepage-search-bar"
          />
          <FaSearch className="homepage-search-icon" />
        </div>
      </header>

      {/* Hero Section (Carousel) */}
      <section className="homepage-hero">
        <img src={images[current]} alt="Promotion" className="homepage-hero-image" />
        {/* ปุ่มเลือกภาพ */}
        <div className="homepage-hero-buttons">
          {images.map((_, index) => (
            <button
              key={index}
              className={current === index ? "homepage-active" : ""}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="homepage-books-section">
        <h2 className="homepage-red-box-top10">มังงะขายดี 10 อันดับ</h2>
        <div className="homepage-books-grid">
          {books.map((book) => (
            <div key={book.id} className="homepage-book-card">
              <img src={book.image} alt={book.title} className="homepage-book-image" />
              <h3 className="homepage-book-title">{book.title}</h3>
              <p className="homepage-book-author">{book.author}</p>
              <p className="homepage-book-price">{book.price}</p>
              <button className="homepage-add-to-cart-btn">เพิ่มลงตะกร้า</button>
            </div>
          ))}
          {/* ปุ่มดูทั้งหมดเป็น item ตัวสุดท้ายของ grid */}
          <div className="homepage-view-all-card">
            <button className="homepage-view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* New Books */}
      <section className="homepage-books-section">
        <h2 className="homepage-red-box">ใหม่</h2>
        <div className="homepage-books-grid">
          {books.map((book) => (
            <div key={book.id} className="homepage-book-card">
              <img src={book.image} alt={book.title} className="homepage-book-image" />
              <h3 className="homepage-book-title">{book.title}</h3>
              <p className="homepage-book-author">{book.author}</p>
              <p className="homepage-book-price">{book.price}</p>
              <button className="homepage-add-to-cart-btn">เพิ่มลงตะกร้า</button>
            </div>
          ))}
          <div className="homepage-view-all-card">
            <button className="homepage-view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* Fighting Genre */}
      <section className="homepage-books-section">
        <h2 className="homepage-red-box">ต่อสู้</h2>
        <div className="homepage-books-grid">
          {books.map((book) => (
            <div key={book.id} className="homepage-book-card">
              <img src={book.image} alt={book.title} className="homepage-book-image" />
              <h3 className="homepage-book-title">{book.title}</h3>
              <p className="homepage-book-author">{book.author}</p>
              <p className="homepage-book-price">{book.price}</p>
              <button className="homepage-add-to-cart-btn">เพิ่มลงตะกร้า</button>
            </div>
          ))}
          <div className="homepage-view-all-card">
            <button className="homepage-view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* Sports Genre */}
      <section className="homepage-books-section">
        <h2 className="homepage-red-box">กีฬา</h2>
        <div className="homepage-books-grid">
          {books.map((book) => (
            <div key={book.id} className="homepage-book-card">
              <img src={book.image} alt={book.title} className="homepage-book-image" />
              <h3 className="homepage-book-title">{book.title}</h3>
              <p className="homepage-book-author">{book.author}</p>
              <p className="homepage-book-price">{book.price}</p>
              <button className="homepage-add-to-cart-btn">เพิ่มลงตะกร้า</button>
            </div>
          ))}
          <div className="homepage-view-all-card">
            <button className="homepage-view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <div className="homepage-image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="homepage-image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="homepage-image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="homepage-footer-section homepage-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="homepage-social-icons">
              <div className="homepage-social-row">
                <div className="homepage-image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="homepage-image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="homepage-image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="homepage-social-row">
                <div className="homepage-image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="homepage-image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="homepage-image-link">
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

export default Homepage;