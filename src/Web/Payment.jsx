import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import "./Payment.css";

// --- Import รูปภาพ ---
import logo from "../assets/logo.png";
import qrCodeImage from '../assets/qrcode.png'; 
import visaImage from '../assets/visa.png';
import mastercardImage from '../assets/mastercard.png';
import paypalImage from '../assets/paypal.png';
import fbImage from '../assets/fb.png';
import igImage from '../assets/ig.png';
import lineImage from '../assets/line.png';
import ytImage from '../assets/yt1.png';
import ttImage from '../assets/tt.png';
import xImage from '../assets/x.png';
// --- จบ Import รูปภาพ ---

function Payment() {
  // --- States สำหรับราคา ---
  const [subtotal, setSubtotal] = useState(0); 
  const shippingFee = 50; 
  const [total, setTotal] = useState(shippingFee); 
  
  // --- States สำหรับการทำงาน ---
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- ดึงข้อมูล User ---
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;
  const userId = userInfo ? userInfo._id : null;

  // --- ดึงข้อมูลตะกร้าและที่อยู่ ---
  useEffect(() => {
    if (!userId) {
      setError("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบ");
      setLoading(false);
      navigate('/login'); 
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. ดึงข้อมูลตะกร้า (Cart)
        const cartRes = await fetch(`http://localhost:5000/api/cart/user/${userId}`);
        if (!cartRes.ok) throw new Error('ไม่สามารถดึงข้อมูลตะกร้าได้');
        const cartData = await cartRes.json();

        const cartTotal = cartData.total || 0;
        setSubtotal(cartTotal);
        setTotal(cartTotal + shippingFee);
        setCartItems(cartData.items || []);

        // 2. ดึงข้อมูลที่อยู่ (Address)
        const addrRes = await fetch(`http://localhost:5000/api/address/user/${userId}`);
        if (!addrRes.ok) throw new Error('ไม่สามารถดึงข้อมูลที่อยู่ได้');
        const addresses = await addrRes.json();
        
        const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
        if (!defaultAddress) {
          throw new Error('ไม่พบที่อยู่จัดส่ง กรุณากลับไปเพิ่มที่อยู่');
        }
        setSelectedAddressId(defaultAddress._id);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate, shippingFee]);

  // --- ฟังก์ชันยืนยันการชำระเงิน ---
  const handleConfirm = async () => {
    if (!userId || !selectedAddressId || cartItems.length === 0) {
      alert("ข้อมูลการสั่งซื้อไม่ครบถ้วน (ผู้ใช้, ที่อยู่, หรือสินค้า)");
      return;
    }

    const orderData = {
      userId: userId,
      items: cartItems,
      total: total,
      addressId: selectedAddressId,
      paymentMethod: "QR Code"
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // --- ล้างตะกร้าสินค้า (ไม่บล็อก) ---
        try {
          await fetch(`http://localhost:5000/api/cart/user/${userId}`, {
            method: 'DELETE'
          });
        } catch (cartErr) {
          console.error("ผิดพลาดตอนล้างตะกร้า:", cartErr);
        }

        alert("สร้างคำสั่งซื้อสำเร็จ!");
        navigate('/homepage');

      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'ไม่สามารถสร้างคำสั่งซื้อได้');
      }
      
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
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
          <input type="text" placeholder="ค้นหาหนังสือตามชื่อเรื่อง" className="payment-search-bar" />
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
            
            {loading && <div>กำลังโหลดข้อมูล...</div>}
            {error && <div style={{ color: 'red' }}>เกิดข้อผิดพลาด: {error}</div>}
            
            {!loading && !error && (
              <>
                {/* แสดงราคา */}
                <div className="payment-total-details">
                  <div className="payment-total-row">
                    <span>ราคาสินค้า (Subtotal)</span>
                    <span>฿{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="payment-total-row">
                    <span>ค่าจัดส่ง (Shipping)</span>
                    <span>฿{shippingFee.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="payment-total">
                  <h3>ราคารวมทั้งหมด (Total)</h3>
                  <div className="total-amount">฿{total.toFixed(2)}</div>
                </div>

                {/* QR Code */}
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

                {/* ปุ่ม */}
                <div className="payment-actions">
                  <Link to="/address" className="payment-back-btn">ย้อนกลับ</Link>
                  <button 
                    className="payment-confirm-btn"
                    onClick={handleConfirm}
                    disabled={loading}
                  >
                    ยืนยันการชำระเงิน
                  </button>
                </div>
              </>
            )}
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
              <div className="payment-image-link"><img src={visaImage} alt="visa" /></div>
              <div className="payment-image-link"><img src={mastercardImage} alt="mastercard" /></div>
              <div className="payment-image-link"><img src={paypalImage} alt="paypal" /></div>
            </div>
          </div>

          <div className="payment-footer-section payment-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="payment-social-icons">
              <div className="payment-social-row">
                <div className="payment-image-link"><img src={fbImage} alt="facebook" /></div>
                <div className="payment-image-link"><img src={igImage} alt="instagram" /></div>
                <div className="payment-image-link"><img src={lineImage} alt="line" /></div>
              </div>
              <div className="payment-social-row">
                <div className="payment-image-link"><img src={ytImage} alt="youtube" /></div>
                <div className="payment-image-link"><img src={ttImage} alt="tiktok" /></div>
                <div className="payment-image-link"><img src={xImage} alt="x" /></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Payment;
