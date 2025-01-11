// import { StrictMode } from 'react' // 暫時先將 StrictMode 移除，有需要可以打開加入
import './assets/scss/all.scss'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(<App />)
