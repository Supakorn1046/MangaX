import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./ProductDetailPage.css";
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

// --- เพิ่ม import รูปสินค้า (แก้ path ให้ถูกต้อง) ---
import bookImage from '../assets/book1.png'; // <-- แก้ชื่อไฟล์และ path ให้ถูก

// --- เปลี่ยนชื่อ Function ---
function ProductDetailPage() {

  return (
    // --- เปลี่ยน className ---
    <div className="product-detail-page"> 
      
      {/* Header (ส่วนบน - คงเดิม) */}
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

      {/* ===== 
        ส่วนกลางใหม่ (แทน content-fill) 
      ===== */}
      <main className="product-detail-container">
        {/* การ์ดสีขาวที่หุ้มเนื้อหา */}
        <div className="detail-card">
          <h2 className="detail-title">รายละเอียด</h2>
          
          <div className="detail-content">
            
            {/* ส่วนซ้าย: รูป และ ปุ่มสีน้ำเงิน */}
            <div className="detail-left">
              <img src={bookImage} alt="มหาเวทย์ผนึกมาร เล่ม 21" className="product-image" />
              <button className="bottom-action-btn">ย้อนกลับ</button>
            </div>

            {/* ส่วนขวา: ข้อมูลสินค้า */}
            <div className="detail-right">
              <h1 className="product-title">มหาเวทย์ผนึกมาร เล่ม 21</h1>
              <p className="product-description">
                ทัดสึคิฟูจิโกะและเขียนเรื่องราวในโลกแฟนตาซีที่มืดคาดจากเหตุเกิดความขัดแย้งของมนุษย์โดยปีศาจจะแข็งแกร่งขึ้นหากมนุษย์กลัวมากขึ้น
              </p>
              
              <div className="price-row">
                <span className="product-price">130 บาท</span>
                <div className="quantity-section">
                  <label htmlFor="quantity">จำนวน</label>
                  <input type="number" id="quantity" defaultValue="1" min="1" className="quantity-input" />
                </div>
              </div>

              <button className="add-to-cart-btn">Add to Cart</button>
            </div>

          </div>
        </div>
      </main>
      {/* ===== จบส่วนกลางใหม่ ===== */}

      {/* Footer (ส่วนล่าง - คงเดิม) */}
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
              {/* ... (โค้ด social icons เหมือนเดิม) ... */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- เปลี่ยนชื่อ export ---
export default ProductDetailPage;