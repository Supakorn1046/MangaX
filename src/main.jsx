import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Homepage from './Web/Homepage.jsx'
import ProductDetail from './Web/ProductDetailPage.jsx'
import New from './Web/New.jsx'
import Buy from './Web/Buy.jsx'
import Address from './Web/Address.jsx'
import Payment from './Web/Payment.jsx' // เพิ่ม import
import HomepageProfile from './Web/HomepageProfile.jsx'
// \/ --- แก้ไขตรงนี้ --- \/
import AdminList from './Admin/admin_list.jsx' 
import AdminAdd from './Admin/admin_add.jsx'
// /\ --- แก้ไขตรงนี้ --- /\

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/new" element={<New />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/HomepageProfile" element={<HomepageProfile />} />
        {/* \/ --- แก้ไขตรงนี้ --- \/ */}
        <Route path="/admin_list" element={<AdminList />} />
        <Route path="/admin_add" element={<AdminAdd />} />
        {/* /\ --- แก้ไขตรงนี้ --- /\ */}
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} /> {/* เพิ่ม route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)