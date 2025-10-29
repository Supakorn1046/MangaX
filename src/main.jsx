import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './Web/Homepage.jsx'
import Seealltop10 from './Web/SeeAlltop10.jsx'
import New from './Web/New.jsx'
import Action from './Web/Action.jsx'
import Sport from './Web/Sport.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Homepage  />
  </StrictMode>,
)
