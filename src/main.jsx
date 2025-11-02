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
import AuthPage from './Components/AuthPage.jsx'
import Top10 from './Web/SeeAlltop10.jsx'
import Action from './Web/Action.jsx'
import Sport from './Web/Sport.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        
        <Route path="/homepage" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />

        <Route path="/productdetail/:id" element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/new" element={
          <ProtectedRoute>
            <New />
          </ProtectedRoute>
        } />

        <Route path="/buy" element={
          <ProtectedRoute>
            <Buy />
          </ProtectedRoute>
        } />

        <Route path="/SeeAlltop10" element={
          <ProtectedRoute>
            <Top10 />
          </ProtectedRoute>
        } />

        <Route path="/Action" element={
          <ProtectedRoute>
            <Action />
          </ProtectedRoute>
        } />

        <Route path="/Sport" element={
          <ProtectedRoute>
            <Sport />
          </ProtectedRoute>
        } />

        <Route path="/HomepageProfile" element={
          <ProtectedRoute>
            <HomepageProfile />
          </ProtectedRoute>
        } />

        <Route path="/admin_list" element={
          <ProtectedRoute>
            <AdminList />
          </ProtectedRoute>
        } />

        <Route path="/admin_edit/:id" element={
          <ProtectedRoute>
            <AdminEdit />
          </ProtectedRoute>
        } />

        <Route path="/admin_add" element={
          <ProtectedRoute>
            <AdminAdd />
          </ProtectedRoute>
        } />

        <Route path="/address" element={
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        } />

        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);