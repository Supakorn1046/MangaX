import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Seealltop10.css";
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

function Seealltop10() {
  // ตัวอย่างข้อมูลชั่วคราว สำหรับให้ backend มาแทนที่
  const books = [
    { id: 1, title: "หนังสือตัวอย่าง 1", author: "ผู้เขียน 1", price: "฿299", image: "" },
    { id: 2, title: "หนังสือตัวอย่าง 2", author: "ผู้เขียน 2", price: "฿349", image: "" },
    { id: 3, title: "หนังสือตัวอย่าง 3", author: "ผู้เขียน 3", price: "฿199", image: "" },
    { id: 4, title: "หนังสือตัวอย่าง 4", author: "ผู้เขียน 4", price: "฿399", image: "" },
    { id: 5, title: "หนังสือตัวอย่าง 5", author: "ผู้เขียน 5", price: "฿249", image: "" },
    { id: 6, title: "หนังสือตัวอย่าง 6", author: "ผู้เขียน 6", price: "฿279", image: "" },
    { id: 7, title: "หนังสือตัวอย่าง 7", author: "ผู้เขียน 7", price: "฿319", image: "" },
    { id: 8, title: "หนังสือตัวอย่าง 8", author: "ผู้เขียน 8", price: "฿229", image: "" },
    { id: 9, title: "หนังสือตัวอย่าง 9", author: "ผู้เขียน 9", price: "฿369", image: "" },
    { id: 10, title: "หนังสือตัวอย่าง 10", author: "ผู้เขียน 10", price: "฿189", image: "" }
  ];

  return (
    <div className="seeall-page">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="BookStore Logo" className="logo" />
        <nav>
          <a href="/">หน้าแรก</a>
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

      {/* เนื้อหาหลัก */}
      <section className="books-section">
        <h2 className="red-box-top10">มังงะขายดี 10 อันดับ</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image-placeholder">
                {/* ใส่ placeholder สำหรับรูปภาพ */}
                <span>รูปภาพ</span>
              </div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
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

export default Seealltop10;