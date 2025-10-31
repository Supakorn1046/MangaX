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
import AdminEdit from './Admin/AdminEdit.jsx'
import Login from './Components/MangaXLogin.jsx'
import Detail from './Components/MangaProfileDetails.jsx'
import Register from './Components/MangaXRegister.jsx'
import AuthPage from './components/AuthPage.jsx'
import Top10 from './Web/SeeAlltop10.jsx'
import Action from './Web/Action.jsx'
import Sport from './Web/Sport.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* 🔑 แก้ไข: เพิ่ม /:id เพื่อให้ ProductDetail สามารถดึง ID สินค้าไปใช้ได้ */}
        <Route path="/productdetail/:id" element={<ProductDetail />} /> 
        <Route path="/new" element={<New />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/SeeAlltop10" element={<Top10 />} />
        <Route path="/Action" element={<Action />} />
        <Route path="/Sport" element={<Sport />} />
        <Route path="/HomepageProfile" element={<HomepageProfile />} />
        <Route path="/admin_list" element={<AdminList />} />
        <Route path="/admin_edit/:id" element={<AdminEdit />} />
        <Route path="/admin_add" element={<AdminAdd />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
