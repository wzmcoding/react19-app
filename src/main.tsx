import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'
import NotFound from './NotFound.tsx'
import Login from './Login/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

