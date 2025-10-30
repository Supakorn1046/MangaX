import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom"; // เพิ่ม import Link
import "./Address.css";
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

function Address() {
  const [addressOption, setAddressOption] = useState("user"); // "user" หรือ "new"
  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: ""
  });

  // ข้อมูลที่อยู่ผู้ใช้ (ตัวอย่าง)
  const userAddress = {
    firstName: "สมชาย",
    lastName: "ใจดี",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    phone: "0812345678"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ไปหน้าถัดไป (วิธีการชำระเงิน)
    console.log("ไปหน้าถัดไป");
  };

  return (
    <div className="address-page">
      {/* Header */}
      <header className="address-header">
        <img src={logo} alt="BookStore Logo" className="address-logo" />
        <nav>
          <a href="/">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="address-search-container">
          <MdOutlineShoppingCart className="address-header-icon" />
          <MdLogin className="address-header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="address-search-bar"
          />
          <FaSearch className="address-search-icon" />
        </div>
      </header>

      {/* เนื้อหาหลัก */}
      <main className="address-main">
        {/* ขั้นตอนการสั่งซื้อ */}
        <section className="address-steps">
          <div className="address-step">
            <div className="address-step-number">1</div>
            <div className="address-step-text">สินค้าในตะกร้า</div>
          </div>
          <div className="address-step active">
            <div className="address-step-number">2</div>
            <div className="address-step-text">ที่อยู่ที่จัดส่ง</div>
          </div>
          <div className="address-step">
            <div className="address-step-number">3</div>
            <div className="address-step-text">วิธีการชำระเงิน</div>
          </div>
        </section>

        {/* ฟอร์มที่อยู่จัดส่ง */}
        <section className="address-form-section">
          <h2 className="address-section-title">ที่อยู่จัดส่ง</h2>
          
          <div className="address-options">
            <label className="address-option">
              <input
                type="radio"
                name="addressOption"
                value="user"
                checked={addressOption === "user"}
                onChange={() => setAddressOption("user")}
              />
              <span className="address-option-text">ใช้ที่อยู่ตามข้อมูลผู้ใช้</span>
            </label>
            
            <label className="address-option">
              <input
                type="radio"
                name="addressOption"
                value="new"
                checked={addressOption === "new"}
                onChange={() => setAddressOption("new")}
              />
              <span className="address-option-text">กรอกที่อยู่จัดส่งใหม่</span>
            </label>
          </div>

          {addressOption === "user" ? (
            <div className="user-address-display">
              <div className="address-info">
                <p><strong>ชื่อ-นามสกุล:</strong> {userAddress.firstName} {userAddress.lastName}</p>
                <p><strong>ที่อยู่:</strong> {userAddress.address}</p>
                <p><strong>เบอร์โทรศัพท์:</strong> {userAddress.phone}</p>
              </div>
            </div>
          ) : (
            <form className="address-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">ชื่อ</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={addressForm.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">นามสกุล</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={addressForm.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">ที่อยู่</label>
                <textarea
                  id="address"
                  name="address"
                  value={addressForm.address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={addressForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          )}

          <div className="address-actions">
            <Link to="/buy" className="address-back-btn">
              ย้อนกลับ
            </Link>
            <Link to="/payment">
              <button className="address-next-btn">ดำเนินการต่อ</button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="address-footer">
        <div className="address-footer-content">
          <div className="address-footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="address-footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="address-payment-methods">
              <div className="address-image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="address-image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="address-image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="address-footer-section address-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="address-social-icons">
              <div className="address-social-row">
                <div className="address-image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="address-image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="address-image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="address-social-row">
                <div className="address-image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="address-image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="address-image-link">
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

export default Address;