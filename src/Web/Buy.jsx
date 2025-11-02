import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 💡 เพิ่ม useNavigate
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Buy.css";
import logo from "../assets/logo.png";
import book1 from "../assets/book1.png"; // (ใช้เป็น Fallback)
// (Imports รูปภาพ Footer คงเดิม)
import visaImage from '../assets/visa.png';
import mastercardImage from '../assets/mastercard.png';
import paypalImage from '../assets/paypal.png';
import fbImage from '../assets/fb.png';
import igImage from '../assets/ig.png';
import lineImage from '../assets/line.png';
import ytImage from '../assets/yt1.png';
import ttImage from '../assets/tt.png';
import xImage from '../assets/x.png';
import { CgProfile } from "react-icons/cg";

// 💡 URL ฐานของ API Cart
const API_CART_URL = 'http://localhost:5000/api/cart';

function Buy() {
  const navigate = useNavigate();
  
  // 💡 State สำหรับเก็บข้อมูลตะกร้าจาก API
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------------------------------
  // 💡 1. ดึงข้อมูลผู้ใช้ (User ID) เมื่อโหลดหน้า
  // ----------------------------------------------------
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      alert('กรุณาเข้าสู่ระบบเพื่อดูตะกร้าสินค้า');
      navigate('/login');
    } else {
      const user = JSON.parse(userInfo);
      setUserId(user._id); // เก็บ User ID ไว้ใน State
    }
  }, [navigate]);

  // ----------------------------------------------------
  // 💡 2. ฟังก์ชันสำหรับดึงข้อมูลตะกร้า (Fetch Cart)
  // ----------------------------------------------------
  const fetchCart = async (currentUserId) => {
    if (!currentUserId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_CART_URL}/user/${currentUserId}`);
      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลตะกร้าได้');
      }
      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 💡 3. เรียก fetchCart เมื่อ User ID พร้อมใช้งาน
  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  // ----------------------------------------------------
  // 💡 4. ฟังก์ชันจัดการตะกร้า (เชื่อม Backend)
  // ----------------------------------------------------

  // 🔑 ฟังก์ชันลบสินค้า (DELETE /api/cart/remove/:userId/:bookId)
  const removeItem = async (bookId) => {
    try {
      const response = await fetch(`${API_CART_URL}/remove/${userId}/${bookId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchCart(userId); // 💡 ดึงข้อมูลตะกร้าใหม่
      } else {
        alert('เกิดข้อผิดพลาดในการลบสินค้า');
      }
    } catch (err) {
      console.error('Remove item error:', err);
      alert('การเชื่อมต่อล้มเหลว');
    }
  };

  // 🔑 ฟังก์ชันอัปเดตจำนวน (POST /api/cart/add)
  // (Backend API [cite: cartRoutes.js] ของคุณใช้ /add เพื่อบวก/ลบ จำนวน)
  const updateQuantity = async (book, quantityChange) => {
    try {
      const response = await fetch(`${API_CART_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          bookId: book.bookId,
          title: book.title,
          price: book.price,
          quantity: quantityChange // 💡 ส่งแค่ส่วนต่าง (1 หรือ -1)
        })
      });
      if (response.ok) {
        fetchCart(userId); // 💡 ดึงข้อมูลตะกร้าใหม่
      } else {
        alert('เกิดข้อผิดพลาดในการอัปเดตจำนวน');
      }
    } catch (err) {
      console.error('Update quantity error:', err);
      alert('การเชื่อมต่อล้มเหลว');
    }
  };

  // คำนวณราคารวม (ใช้ข้อมูลจาก state)
  const subtotal = cart.total;
  const shipping = 50; // ค่าจัดส่ง
  const total = subtotal + shipping;

  // ----------------------------------------------------
  // 💡 5. การแสดงผล (Render)
  // ----------------------------------------------------

  if (loading) {
    return <div className="loading-screen">กำลังโหลดตะกร้า...</div>;
  }
  
  if (error) {
    return <div className="error-screen">ข้อผิดพลาด: {error}</div>;
  }

  return (
    <div className="buy-page">
      {/* Header (💡 เพิ่ม onClick ให้ Icons) */}
      <header className="buy-header">
        <img src={logo} alt="BookStore Logo" className="buy-logo" />
        <nav>
          <Link to="/homepage">หน้าแรก</Link>
          <Link to="/SeeAlltop10">10 อันดับ</Link>
        </nav>
        <div className="buy-search-container">
          <MdOutlineShoppingCart 
            className="buy-header-icon" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/buy')} // คลิกไปหน้าตะกร้า (หน้าเดิม)
          />
          <CgProfile
            className="buy-header-icon" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/HomepageProfile')} // คลิกไปหน้า Login
          />
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
        {/* ... (ส่วน buy-steps คงเดิม) ... */}
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
              <h2 className="buy-section-title">รายการสินค้า ({cart.items.length})</h2>
              <div className="buy-cart-table">
                <div className="buy-table-header">
                  <div className="buy-header-item">สินค้า</div>
                  <div className="buy-header-item">ราคาต่อหน่วย</div>
                  <div className="buy-header-item">จำนวน</div>
                  <div className="buy-header-item">ราคารวม</div>
                  <div className="buy-header-item">จัดการ</div>
                </div>
                
                {/* 💡 วนลูปจาก cart.items ที่มาจาก API */}
                {cart.items.length > 0 ? cart.items.map((item) => (
                  <div key={item.bookId} className="buy-table-row">
                    <div className="buy-table-cell buy-product-info">
                      <img 
                        src={item.image || book1} // 💡 ใช้ book1 เป็น fallback
                        alt={item.title} 
                        className="buy-product-image" 
                      />
                      <span className="buy-product-title">{item.title}</span>
                    </div>
                    <div className="buy-table-cell buy-unit-price">
                      ฿{item.price.toFixed(2)}
                    </div>
                    <div className="buy-table-cell buy-quantity">
                      <div className="buy-quantity-controls">
                        <button 
                          className="buy-quantity-btn"
                          onClick={() => updateQuantity(item, -1)} // 💡 เรียก API
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="buy-quantity-number">{item.quantity}</span>
                        <button 
                          className="buy-quantity-btn"
                          onClick={() => updateQuantity(item, 1)} // 💡 เรียก API
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="buy-table-cell buy-total-price">
                      ฿{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="buy-table-cell buy-actions">
                      <button 
                        className="buy-remove-btn"
                        onClick={() => removeItem(item.bookId)} // 💡 เรียก API
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="buy-table-row empty-cart">
                    <p>ไม่มีสินค้าในตะกร้า</p>
                  </div>
                )}
              </div>
            </div>

            {/* สรุปรายการสั่งซื้อ (ใช้ subtotal และ total จาก state) */}
            <div className="buy-summary-section">
              <h2 className="buy-section-title">สรุปรายการสั่งซื้อ</h2>
              <div className="buy-summary-card">
                <div className="buy-summary-row">
                  <span>ยอดรวมสินค้า</span>
                  <span>฿{subtotal.toFixed(2)}</span>
                </div>
                <div className="buy-summary-row">
                  <span>ค่าจัดส่ง</span>
                  <span>฿{shipping.toFixed(2)}</span>
                </div>
                <div className="buy-summary-divider"></div>
                <div className="buy-summary-row buy-total">
                  <span>รวมทั้งหมด</span>
                  <span>฿{total.toFixed(2)}</span>
                </div>
                {/* 💡 ปิดปุ่มถ้าไม่มีสินค้า */}
                <Link to="/address" style={{ pointerEvents: cart.items.length === 0 ? 'none' : 'auto' }}>
                  <button 
                    className="buy-checkout-btn" 
                    disabled={cart.items.length === 0}
                  >
                    ดำเนินการชำระเงิน
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (โค้ดเดิม) */}
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
