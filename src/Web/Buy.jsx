import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";  // เพิ่ม import Link
import "./Buy.css";
import logo from "../assets/logo.png";
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

function Buy() {
  // ตัวอย่างข้อมูลตะกร้าสินค้า
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Harry Potter", price: 299, quantity: 2, image: book1 },
    { id: 2, title: "The Hobbit", price: 349, quantity: 1, image: book1 },
    { id: 3, title: "1984", price: 199, quantity: 3, image: book1 }
  ]);

  // ฟังก์ชันลบสินค้า
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  // คำนวณราคารวม
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 50; // ค่าจัดส่ง
  const total = subtotal + shipping;

  return (
    <div className="buy-page">
      {/* Header */}
      <header className="buy-header">
        <img src={logo} alt="BookStore Logo" className="buy-logo" />
        <nav>
          <a href="/">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
        </nav>
        <div className="buy-search-container">
          <MdOutlineShoppingCart className="buy-header-icon" />
          <MdLogin className="buy-header-icon" />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="buy-search-bar"
          />
          <FaSearch className="buy-search-icon" />
        </div>
      </header>

      {/* เนื้อหาหลัก */}
      <main className="buy-main">
        {/* ขั้นตอนการสั่งซื้อ */}
        <section className="buy-steps">
          <div className="buy-step active">
            <div className="buy-step-number">1</div>
            <div className="buy-step-text">สินค้าในตะกร้า</div>
          </div>
          <div className="buy-step">
            <div className="buy-step-number">2</div>
            <div className="buy-step-text">ที่อยู่ที่จัดส่ง</div>
          </div>
          <div className="buy-step">
            <div className="buy-step-number">3</div>
            <div className="buy-step-text">วิธีการชำระเงิน</div>
          </div>
        </section>

        {/* ตารางรายการสินค้าและสรุปรายการ */}
        <section className="buy-cart-container">
          <div className="buy-cart-content">
            {/* ตารางรายการสินค้า */}
            <div className="buy-cart-section">
              <h2 className="buy-section-title">รายการสินค้า</h2>
              <div className="buy-cart-table">
                <div className="buy-table-header">
                  <div className="buy-header-item">สินค้า</div>
                  <div className="buy-header-item">ราคาต่อหน่วย</div>
                  <div className="buy-header-item">จำนวน</div>
                  <div className="buy-header-item">ราคารวม</div>
                  <div className="buy-header-item">จัดการ</div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="buy-table-row">
                    <div className="buy-table-cell buy-product-info">
                      <img src={item.image} alt={item.title} className="buy-product-image" />
                      <span className="buy-product-title">{item.title}</span>
                    </div>
                    <div className="buy-table-cell buy-unit-price">
                      ฿{item.price}
                    </div>
                    <div className="buy-table-cell buy-quantity">
                      <div className="buy-quantity-controls">
                        <button 
                          className="buy-quantity-btn"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="buy-quantity-number">{item.quantity}</span>
                        <button 
                          className="buy-quantity-btn"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="buy-table-cell buy-total-price">
                      ฿{item.price * item.quantity}
                    </div>
                    <div className="buy-table-cell buy-actions">
                      <button 
                        className="buy-remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* สรุปรายการสั่งซื้อ */}
            <div className="buy-summary-section">
              <h2 className="buy-section-title">สรุปรายการสั่งซื้อ</h2>
              <div className="buy-summary-card">
                <div className="buy-summary-row">
                  <span>ยอดรวมสินค้า</span>
                  <span>฿{subtotal}</span>
                </div>
                <div className="buy-summary-row">
                  <span>ค่าจัดส่ง</span>
                  <span>฿{shipping}</span>
                </div>
                <div className="buy-summary-divider"></div>
                <div className="buy-summary-row buy-total">
                  <span>รวมทั้งหมด</span>
                  <span>฿{total}</span>
                </div>
                <Link to="/address">
                  <button className="buy-checkout-btn">ดำเนินการชำระเงิน</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="buy-footer">
        <div className="buy-footer-content">
          <div className="buy-footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="buy-footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="buy-payment-methods">
              <div className="buy-image-link">
                <img src={visaImage} alt="visa" />
              </div>
              <div className="buy-image-link">
                <img src={mastercardImage} alt="mastercard" />
              </div>
              <div className="buy-image-link">
                <img src={paypalImage} alt="paypal" />
              </div>
            </div>
          </div>

          <div className="buy-footer-section buy-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="buy-social-icons">
              <div className="buy-social-row">
                <div className="buy-image-link">
                  <img src={fbImage} alt="facebook" />
                </div>
                <div className="buy-image-link">
                  <img src={igImage} alt="instagram" />
                </div>
                <div className="buy-image-link">
                  <img src={lineImage} alt="line" />
                </div>
              </div>
              <div className="buy-social-row">
                <div className="buy-image-link">
                  <img src={ytImage} alt="youtube" />
                </div>
                <div className="buy-image-link">
                  <img src={ttImage} alt="tiktok" />
                </div>
                <div className="buy-image-link">
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

export default Buy;