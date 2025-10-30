import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Payment.css";
import logo from "../assets/logo.png";
import qrCodeImage from '../assets/qrcode.png'; // เปลี่ยนเป็น path รูป QR Code ของคุณ
import visaImage from '../assets/visa.png';
import mastercardImage from '../assets/mastercard.png';
import paypalImage from '../assets/paypal.png';
import fbImage from '../assets/fb.png';
import igImage from '../assets/ig.png';
import lineImage from '../assets/line.png';
import ytImage from '../assets/yt1.png';
import ttImage from '../assets/tt.png';
import xImage from '../assets/x.png';

function Payment() {
  // ตัวอย่างข้อมูลราคา (ควรส่งมาจากหน้าเดิม)
  const total = 1246; // ตัวอย่างราคารวม

  const handleConfirm = () => {
    // ฟังก์ชันยืนยันการชำระเงิน
    alert("ชำระเงินสำเร็จ!");
    // สามารถ redirect ไปหน้าอื่นได้ที่นี่
  };

  return (
    <div className="payment-page">
      {/* Header */}
      <header className="payment-header">
        <img src={logo} alt="BookStore Logo" className="payment-logo" />
        <nav>
          <a href="/">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="payment-search-container">
          <MdOutlineShoppingCart className="payment-header-icon" />
          <MdLogin className="payment-header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="payment-search-bar"
          />
          <FaSearch className="payment-search-icon" />
        </div>
      </header>

      {/* เนื้อหาหลัก */}
      <main className="payment-main">
        {/* ขั้นตอนการสั่งซื้อ */}
        <section className="payment-steps">
          <div className="payment-step">
            <div className="payment-step-number">1</div>
            <div className="payment-step-text">สินค้าในตะกร้า</div>
          </div>
          <div className="payment-step">
            <div className="payment-step-number">2</div>
            <div className="payment-step-text">ที่อยู่ที่จัดส่ง</div>
          </div>
          <div className="payment-step active">
            <div className="payment-step-number">3</div>
            <div className="payment-step-text">วิธีการชำระเงิน</div>
          </div>
        </section>

        {/* วิธีการชำระเงิน */}
        <section className="payment-content">
          <div className="payment-info">
            <h2 className="payment-section-title">วิธีการชำระเงิน</h2>
            
            <div className="payment-total">
              <h3>ราคารวมทั้งหมด</h3>
              <div className="total-amount">฿{total}</div>
            </div>

            <div className="qr-code-section">
              <h3>สแกน QR Code เพื่อชำระเงิน</h3>
              <div className="qr-code-container">
                <img 
                  src={qrCodeImage} 
                  alt="QR Code สำหรับชำระเงิน" 
                  className="qr-code-image" 
                />
              </div>
              <p className="qr-code-note">
                กรุณาสแกน QR Code และชำระเงินภายใน 24 ชั่วโมง
              </p>
            </div>

            <div className="payment-actions">
              <Link to="/address" className="payment-back-btn">
                ย้อนกลับ
              </Link>
              <button 
                className="payment-confirm-btn"
                onClick={handleConfirm}
              >
                ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="payment-footer">
        <div className="payment-footer-content">
          <div className="payment-footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="payment-footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="payment-payment-methods">
              <div className="payment-image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="payment-image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="payment-image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="payment-footer-section payment-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="payment-social-icons">
              <div className="payment-social-row">
                <div className="payment-image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="payment-image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="payment-image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="payment-social-row">
                <div className="payment-image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="payment-image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="payment-image-link">
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

export default Payment;