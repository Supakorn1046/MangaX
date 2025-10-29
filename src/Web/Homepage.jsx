import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { useState, useEffect } from "react";
import "./Homepage.css";
import logo from "../assets/logo.png"; 
import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";
import promo3 from "../assets/promo3.png";
import promo4 from "../assets/promo4.png";

const books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", price: "$12.99", image: "https://via.placeholder.com/150" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", price: "$15.99", image: "https://via.placeholder.com/150" },
  { id: 3, title: "1984", author: "George Orwell", price: "$10.99", image: "https://via.placeholder.com/150" },
];

function Homepage() {
  const images = [promo1, promo2, promo3 , promo4];
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
        <h2>มังงะขายดี 10 อันดับ</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="books-section">
        <h2>ใหม่</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="books-section">
        <h2>ต่อสู้</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>


      {/* Featured Books */}
      <section className="books-section">
        <h2>กีฬา</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 BookStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
