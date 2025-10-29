import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { useState, useEffect } from "react";
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
  const images = [promo1, promo2, promo3, promo4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="BookStore Logo" className="logo" />
        <nav>
          <a href="#home">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="search-container">
          <MdOutlineShoppingCart className="header-icon" />
          <MdLogin className="header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="search-bar"
          />
          <FaSearch className="search-icon" />
        </div>
      </header>

      {/* Hero Section (Carousel) */}
      <section className="hero">
        <img src={images[current]} alt="Promotion" className="hero-image" />
        {/* ปุ่มเลือกภาพ */}
        <div className="hero-buttons">
          {images.map((_, index) => (
            <button
              key={index}
              className={current === index ? "active" : ""}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="books-section">
        <h2 className="red-box-top10">มังงะขายดี 10 อันดับ</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
          {/* ปุ่มดูทั้งหมดเป็น item ตัวสุดท้ายของ grid */}
          <div className="view-all-card">
            <button className="view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* New Books */}
      <section className="books-section">
        <h2 className="red-box">ใหม่</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
          <div className="view-all-card">
            <button className="view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* Fighting Genre */}
      <section className="books-section">
        <h2 className="red-box">ต่อสู้</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
          <div className="view-all-card">
            <button className="view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* Sports Genre */}
      <section className="books-section">
        <h2 className="red-box">กีฬา</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
          <div className="view-all-card">
            <button className="view-all-btn">ดูทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="payment-methods">
              <div className="image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="footer-section third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="social-icons">
              <div className="social-row">
                <div className="image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="social-row">
                <div className="image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="image-link">
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