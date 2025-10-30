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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/new" element={<New />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} /> {/* เพิ่ม route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)