import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './Web/Homepage.jsx'
import ProductPage from './Web/admin_list.jsx';
import AdminAdd from'./Web/admin_add.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAdd />
    <ProductPage/>
  </StrictMode>,
)
