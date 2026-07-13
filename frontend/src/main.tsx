import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './Context/AuthContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

<BrowserRouter>
<AuthContextProvider>

    <App />

</AuthContextProvider>

</BrowserRouter>

  </StrictMode>,
)
