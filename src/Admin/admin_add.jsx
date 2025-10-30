import React, { useState } from 'react';
import './admin_add.css';
import logo from '../assets/logo.png';
import { CartIcon, LogoutIcon, AddIcon, SearchIcon } from './admin_icon.jsx'; 

function AdminAdd() {
  // (ส่วน useState ... เหมือนเดิม)
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState('');

  // (ส่วน handleSubmit ... เหมือนเดิม)
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const productData = {
      name: productName,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      image: imageName,
      description: description
    };
    console.log('ข้อมูลที่จะบันทึก:', productData);
  };

  return (
    <div className="admin-add-page">
      {/* ===== ส่วน Sidebar (แถบด้านซ้าย) ===== */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Manga Logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              {/* === แก้ไขตรงนี้ === */}
              <a href="#">
                <CartIcon /> จัดการสินค้า
              </a>
            </li>
            <li>
              {/* === แก้ไขตรงนี้ === */}
              <a href="#">
                <LogoutIcon /> ออกจากระบบ
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ===== ส่วน Content (ฟอร์มด้านขวา) ===== */}
      <main className="main-content">
        <header className="content-header">
          <h1><AddIcon /> เพิ่มข้อมูลสินค้า</h1>
          <button className="btn btn-back">กลับหน้าแรก</button>
        </header>
        
        {/* (ส่วน <form> ... เหมือนเดิมทุกอย่าง) */}
        <form className="product-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="productName">ชื่อเรื่อง</label>
            <input 
              type="text" 
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
                placeholder="ใส่ชื่อหนังสือ..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">จำนวน</label>
              <input 
                type="number" 
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">ราคา/บาท</label>
              <input 
                type="number" 
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageName">รูปสินค้า</label>
            <input 
              type="text" 
              id="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="เช่น my-image.png (หรือใส่ URL)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">รายละเอียด</label>
            <textarea 
              id="description" 
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
               placeholder="ใส่รายละเอียดสินค้า..."
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-submit">
              บันทึกข้อมูล
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default AdminAdd;