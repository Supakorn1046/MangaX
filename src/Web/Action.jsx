import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
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

function Action() {
  // ตัวอย่างข้อมูลชั่วคราว สำหรับให้ backend มาแทนที่
  const books = [
    { id: 1, title: "การต่อสู้ 1", author: "ผู้เขียน 1", price: "฿299", image: "" },
    { id: 2, title: "การต่อสู้ 2", author: "ผู้เขียน 2", price: "฿349", image: "" },
    { id: 3, title: "การต่อสู้ 3", author: "ผู้เขียน 3", price: "฿199", image: "" },
    { id: 4, title: "การต่อสู้ 4", author: "ผู้เขียน 4", price: "฿399", image: "" },
    { id: 5, title: "การต่อสู้ 5", author: "ผู้เขียน 5", price: "฿249", image: "" },
    { id: 6, title: "การต่อสู้ 6", author: "ผู้เขียน 6", price: "฿279", image: "" },
    { id: 7, title: "การต่อสู้ 7", author: "ผู้เขียน 7", price: "฿319", image: "" },
    { id: 8, title: "การต่อสู้ 8", author: "ผู้เขียน 8", price: "฿229", image: "" },
    { id: 9, title: "การต่อสู้ 9", author: "ผู้เขียน 9", price: "฿369", image: "" },
    { id: 10, title: "การต่อสู้ 10", author: "ผู้เขียน 10", price: "฿189", image: "" }
  ];

  return (
    <div className="action-page">
      {/* Header */}
      <header className="action-header">
        <img src={logo} alt="BookStore Logo" className="action-logo" />
        <nav>
          <a href="/">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="action-search-container">
          <MdOutlineShoppingCart className="action-header-icon" />
          <MdLogin className="action-header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="action-search-bar"
          />
          <FaSearch className="action-search-icon" />
        </div>
      </header>

      {/* เนื้อหาหลัก */}
      <section className="action-books-section">
        <h2 className="action-red-box">ต่อสู้</h2>
        <div className="action-books-grid">
          {books.map((book) => (
            <div key={book.id} className="action-book-card">
              <div className="action-book-image-placeholder">
                {/* ใส่ placeholder สำหรับรูปภาพ */}
                <span>รูปภาพ</span>
              </div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="action-price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
        </div>
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
              <div className="action-image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="action-image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="action-image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="action-footer-section action-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="action-social-icons">
              <div className="action-social-row">
                <div className="action-image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="action-image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="action-image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="action-social-row">
                <div className="action-image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="action-image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="action-image-link">
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

export default Action;