import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import AuthWrapper from './context/AuthWrapper'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthWrapper>
  </React.StrictMode>,
)
