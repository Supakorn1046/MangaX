import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
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
import { CgProfile } from "react-icons/cg";


function Address() {
  const [addressOption, setAddressOption] = useState("user");
  const [fetchedUserAddress, setFetchedUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้จาก Local Storage 
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const userId = userInfo ? userInfo._id : null;
  const userProfileName = userInfo ? userInfo.name : ""; 


  const [addressForm, setAddressForm] = useState({
    firstName: "", 
    lastName: "",  
    address: "",
    phone: ""
  });


  // ดึงข้อมูลที่อยู่ผู้ใช้จาก Backend
  useEffect(() => {
    const fetchAddress = async () => {
      if (!userId) { 
        setError("ไม่พบข้อมูลผู้ใช้ (UserId) - กรุณาเข้าสู่ระบบ");
        setLoading(false);
        setAddressOption("new");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/address/user/${userId}`);
        if (!response.ok) throw new Error('ไม่สามารถดึงข้อมูลที่อยู่ได้');

        const addresses = await response.json();
        const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];

        if (defaultAddress) {
          setFetchedUserAddress(defaultAddress);
          setAddressOption("user");
        } else {
          setAddressOption("new");
        }
      } catch (err) {
        setError(err.message);
        setAddressOption("new");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [userId]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = async () => {
    if (addressOption === "user") {
      if (fetchedUserAddress) navigate("/payment");
      else alert("กรุณาเลือกหรือกรอกที่อยู่จัดส่ง");
    } else if (addressOption === "new") {
      if (!addressForm.firstName || !addressForm.lastName || !addressForm.address || !addressForm.phone) {
        alert("กรุณากรอกข้อมูลที่อยู่จัดส่งใหม่ให้ครบถ้วน");
        return;
      }

      try {
        const newAddressData = {
          ...addressForm,
          userId: userId,
          isDefault: !fetchedUserAddress
        };

        const response = await fetch('http://localhost:5000/api/address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAddressData),
        });

        if (!response.ok) throw new Error('ไม่สามารถบันทึกที่อยู่ใหม่ได้');

        await response.json();
        navigate("/payment");

      } catch (err) {
        alert("เกิดข้อผิดพลาดในการบันทึกที่อยู่ใหม่: " + err.message);
      }
    }
  };

  return (
    <div className="address-page">
      {/* Header */}
      <header className="address-header">
        <img src={logo} alt="BookStore Logo" className="address-logo" />
        <nav>
          <a href="/homepage">หน้าแรก</a>
          <a href="/SeeAlltop10">10 อันดับ</a>
        </nav>
        <div className="address-search-container">
          <MdOutlineShoppingCart className="address-header-icon" />
          <CgProfile
            className="address-header-icon" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/HomepageProfile')} 
          />
          <input type="text" placeholder="ค้นหาหนังสือ" className="address-search-bar" />
          <FaSearch className="address-search-icon" />
        </div>
      </header>

      {/* Main Content */}
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

        {/* ฟอร์มที่อยู่ */}
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
                disabled={!fetchedUserAddress || loading}
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

          {/* แสดง loading / error */}
          {loading && <div>กำลังโหลดข้อมูลที่อยู่...</div>}
          {error && <div style={{color: 'red'}}>เกิดข้อผิดพลาด: {error}</div>}

          {!loading && !error && (
            <>
              {addressOption === "user" && fetchedUserAddress ? (
                <div className="user-address-display">
                  <div className="address-info">
                    <p><strong>ชื่อ-นามสกุล:</strong> {fetchedUserAddress.firstName && fetchedUserAddress.lastName ? `${fetchedUserAddress.firstName} ${fetchedUserAddress.lastName}` : userProfileName}</p>
                    <p><strong>ที่อยู่:</strong> {fetchedUserAddress.address}</p>
                    <p><strong>เบอร์โทรศัพท์:</strong> {fetchedUserAddress.phone}</p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* ฟอร์มกรอกที่อยู่ใหม่ */}
                  <form className="address-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">ชื่อ</label>
                        <input type="text" id="firstName" name="firstName" value={addressForm.firstName} onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">นามสกุล</label>
                        <input type="text" id="lastName" name="lastName" value={addressForm.lastName} onChange={handleInputChange} required />
                      </div>
                  </div>
                    <div className="form-group">
                      <label htmlFor="address">ที่อยู่</label>
                      <textarea id="address" name="address" value={addressForm.address} onChange={handleInputChange} rows="3" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">เบอร์โทรศัพท์</label>
                      <input type="tel" id="phone" name="phone" value={addressForm.phone} onChange={handleInputChange} required />
                    </div>
                  </form>
                </div>
              )}
            </>
          )}

          {/* ปุ่มดำเนินการ */}
          <div className="address-actions">
            <Link to="/buy" className="address-back-btn">ย้อนกลับ</Link>
            <button className="address-next-btn" onClick={handleNextStep} disabled={loading}>
              ดำเนินการต่อ
            </button>
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
              <div className="address-image-link"><img src={visaImage} alt="visa" /></div>
              <div className="address-image-link"><img src={mastercardImage} alt="mastercard" /></div>
              <div className="address-image-link"><img src={paypalImage} alt="paypal" /></div>
            </div>
          </div>

          <div className="address-footer-section address-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="address-social-icons">
              <div className="address-social-row">
                <div className="address-image-link"><img src={fbImage} alt="facebook" /></div>
                <div className="address-image-link"><img src={igImage} alt="instagram" /></div>
                <div className="address-image-link"><img src={lineImage} alt="line" /></div>
              </div>
              <div className="address-social-row">
                <div className="address-image-link"><img src={ytImage} alt="youtube" /></div>
                <div className="address-image-link"><img src={ttImage} alt="tiktok" /></div>
                <div className="address-image-link"><img src={xImage} alt="x" /></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Address;