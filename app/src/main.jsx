import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.jsx'

AOS.init({ duration: 700, once: true, easing: 'ease-out-quad', offset: 80 })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
