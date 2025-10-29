import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Sport.css";
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

function Sport() {
  // ตัวอย่างข้อมูลชั่วคราว สำหรับให้ backend มาแทนที่
  const books = [
    { id: 1, title: "กีฬา 1", author: "ผู้เขียน 1", price: "฿299", image: "" },
    { id: 2, title: "กีฬา 2", author: "ผู้เขียน 2", price: "฿349", image: "" },
    { id: 3, title: "กีฬา 3", author: "ผู้เขียน 3", price: "฿199", image: "" },
    { id: 4, title: "กีฬา 4", author: "ผู้เขียน 4", price: "฿399", image: "" },
    { id: 5, title: "กีฬา 5", author: "ผู้เขียน 5", price: "฿249", image: "" },
    { id: 6, title: "กีฬา 6", author: "ผู้เขียน 6", price: "฿279", image: "" },
    { id: 7, title: "กีฬา 7", author: "ผู้เขียน 7", price: "฿319", image: "" },
    { id: 8, title: "กีฬา 8", author: "ผู้เขียน 8", price: "฿229", image: "" },
    { id: 9, title: "กีฬา 9", author: "ผู้เขียน 9", price: "฿369", image: "" },
    { id: 10, title: "กีฬา 10", author: "ผู้เขียน 10", price: "฿189", image: "" }
  ];

  return (
    <div className="sport-page">
      {/* Header */}
      <header className="sport-header">
        <img src={logo} alt="BookStore Logo" className="sport-logo" />
        <nav>
          <a href="/">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="sport-search-container">
          <MdOutlineShoppingCart className="sport-header-icon" />
          <MdLogin className="sport-header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="sport-search-bar"
          />
          <FaSearch className="sport-search-icon" />
        </div>
      </header>

      {/* เนื้อหาหลัก */}
      <section className="sport-books-section">
        <h2 className="sport-red-box">กีฬา</h2>
        <div className="sport-books-grid">
          {books.map((book) => (
            <div key={book.id} className="sport-book-card">
              <div className="sport-book-image-placeholder">
                {/* ใส่ placeholder สำหรับรูปภาพ */}
                <span>รูปภาพ</span>
              </div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="sport-price">{book.price}</p>
              <button>เพิ่มลงตะกร้า</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="sport-footer">
        <div className="sport-footer-content">
          <div className="sport-footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="sport-footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="sport-payment-methods">
              <div className="sport-image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="sport-image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="sport-image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="sport-footer-section sport-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="sport-social-icons">
              <div className="sport-social-row">
                <div className="sport-image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="sport-image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="sport-image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="sport-social-row">
                <div className="sport-image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="sport-image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="sport-image-link">
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

export default Sport;