import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './Web/Homepage.jsx'
import ProductDetailPage from './Web/ProductDetailPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductDetailPage />
  </StrictMode>,
)
