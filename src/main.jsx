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
import Payment from './Web/Payment.jsx'
import HomepageProfile from './Web/HomepageProfile.jsx'
import AdminList from './Admin/admin_list.jsx' 
import AdminAdd from './Admin/admin_add.jsx'
import AdminEdit from './Admin/AdminEdit.jsx' // ✅ เพิ่ม import
import Login from './Components/MangaXLogin.jsx'
import Detail from './Components/MangaProfileDetails.jsx'
import Register from './Components/MangaXRegister.jsx'
import AuthPage from './components/AuthPage.jsx'
import Top10 from './Web/SeeAlltop10.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/new" element={<New />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/SeeAlltop10" element={<Top10 />} />
        <Route path="/HomepageProfile" element={<HomepageProfile />} />
        <Route path="/admin_list" element={<AdminList />} />
        <Route path="/admin_edit/:id" element={<AdminEdit />} /> {/* ✅ เพิ่ม Route นี้ */}
        <Route path="/admin_add" element={<AdminAdd />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)