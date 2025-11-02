import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg"; 
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
import bookPlaceholder from '../assets/book1.png';

const API_BASE_URL = 'http://localhost:5000/api/books';
const API_CART_URL = 'http://localhost:5000/api/cart';

// Reusable components for icons
const PaymentIcon = ({ src, alt }) => (
  <div className="pdetail-image-link">
    <img src={src} alt={alt} />
  </div>
);

const SocialIcon = ({ src, alt }) => (
  <div className="pdetail-image-link">
    <img src={src} alt={alt} />
  </div>
);

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`ไม่พบสินค้า: รหัส ${id}`);
          }
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Navigation handlers
  const handleBack = () => navigate(-1);
  const handleCartClick = () => navigate('/buy');
  const handleProfileClick = () => navigate('/HomepageProfile');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const stock = product ? product.stock : 1;
    if (value >= 1 && value <= stock) {
      setQuantity(value);
    } else if (value > stock) {
      setQuantity(stock);
    }
  };

  // Add to cart function
  const handleAddToCart = async () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      alert('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า');
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userInfo);
    const userId = user._id;

    if (product.stock <= 0) {
      alert("สินค้าหมด");
      return;
    }
    
    if (quantity > product.stock) {
      alert(`สินค้ามีไม่เพียงพอ (เหลือ ${product.stock} ชิ้น)`);
      return;
    }

    const cartData = {
      userId: userId,
      bookId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    };

    try {
      const response = await fetch(`${API_CART_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
      });

      if (response.ok) {
        alert(`เพิ่ม "${product.title}" (จำนวน ${quantity} ชิ้น) ลงตะกร้าสำเร็จ!`);
      } else {
        const errData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errData.message || 'ไม่สามารถเพิ่มสินค้าได้'}`);
      }
    } catch (err) {
      alert('การเชื่อมต่อล้มเหลว ไม่สามารถเพิ่มสินค้าได้');
      console.error('Add to cart error:', err);
    }
  };

  if (loading) {
    return (
      <div className="pdetail-page pdetail-loading">
        กำลังโหลดรายละเอียดสินค้า...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pdetail-page pdetail-error">
        <p>ข้อผิดพลาด: {error || 'ไม่พบสินค้า'}</p>
        <button className="pdetail-back-btn" onClick={handleBack}>
          ย้อนกลับ
        </button>
      </div>
    );
  }

  const { title, author, description, price, stock, image, category } = product;
  const finalPrice = price ? price.toFixed(2) : 'N/A';
  const imageSource = image || bookPlaceholder;

  return (
    <div className="pdetail-page">
      {/* Header */}
      <header className="pdetail-header">
        <img src={logo} alt="BookStore Logo" className="pdetail-logo" />
        <nav className="pdetail-nav">
          <a href="/homepage">หน้าแรก</a>
          <a href="/SeeAlltop10">10 อันดับ</a>
        </nav>
        <div className="pdetail-search-container">
          <MdOutlineShoppingCart 
            className="pdetail-header-icon" 
            onClick={handleCartClick}
          />
          <CgProfile 
            className="pdetail-header-icon" 
            onClick={handleProfileClick}
          />
          <input
            type="text"
            placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
            className="pdetail-search-bar"
          />
          <FaSearch className="pdetail-search-icon" />
        </div>
      </header>

      {/* Main content */}
      <main className="pdetail-container">
        <div className="pdetail-card">
          <h2 className="pdetail-title">รายละเอียดสินค้า</h2>

          <div className="pdetail-content">
            {/* Left side */}
            <div className="pdetail-left">
              <img src={imageSource} alt={title} className="pdetail-image" />
              <button className="pdetail-back-btn" onClick={handleBack}>
                ย้อนกลับ
              </button>
            </div>

            {/* Right side */}
            <div className="pdetail-right">
              <h1 className="pdetail-product-title">{title}</h1>
              <p className="pdetail-product-meta">
                ผู้แต่ง: <strong>{author || '-'}</strong> | หมวดหมู่: <strong>{category || '-'}</strong>
              </p>
              <p className="pdetail-product-desc">{description}</p>

              <div className="pdetail-stock-info">
                <p>
                  สินค้าในคลัง:{" "}
                  <strong className={stock > 0 ? "pdetail-in-stock" : "pdetail-out-of-stock"}>
                    {stock > 0 ? `${stock} เล่ม` : "สินค้าหมด"}
                  </strong>
                </p>
              </div>

              <div className="pdetail-price-row">
                <span className="pdetail-price">฿{finalPrice}</span>
                <div className="pdetail-quantity">
                  <label htmlFor="quantity">จำนวน</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={stock > 0 ? stock : 1}
                    disabled={stock <= 0}
                    className="pdetail-quantity-input"
                  />
                </div>
              </div>

              <button
                className="pdetail-add-btn"
                disabled={stock <= 0}
                onClick={handleAddToCart}
              >
                {stock > 0 ? "เพิ่มลงตะกร้า" : "สินค้าหมด"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pdetail-footer">
        <div className="pdetail-footer-content">
          <div className="pdetail-footer-section">
            <p><strong>ทางลัด</strong></p>
            <p>หนังสือขายดี 10 อันดับ</p>
            <p>ต่อสู้</p>
            <p>โรแมนซ์</p>
            <p>กีฬา</p>
          </div>
          
          <div className="pdetail-footer-section">
            <p><strong>ช่องทางชำระเงิน</strong></p>
            <div className="pdetail-payment-methods">
              <PaymentIcon src={visaImage} alt="visa" />
              <PaymentIcon src={mastercardImage} alt="mastercard" />
              <PaymentIcon src={paypalImage} alt="paypal" />
            </div>
          </div>

          <div className="pdetail-footer-section pdetail-third-column">
            <p><strong>ติดตามข่าวสารได้ที่</strong></p>
            <div className="pdetail-social-icons">
              <div className="pdetail-social-row">
                <SocialIcon src={fbImage} alt="facebook" />
                <SocialIcon src={igImage} alt="instagram" />
                <SocialIcon src={lineImage} alt="line" />
              </div>
              <div className="pdetail-social-row">
                <SocialIcon src={ytImage} alt="youtube" />
                <SocialIcon src={ttImage} alt="tiktok" />
                <SocialIcon src={xImage} alt="x" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductDetailPage;