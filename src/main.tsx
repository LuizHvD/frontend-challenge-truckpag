import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header  from './Components/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="mmin-h-screen p-4 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
    <Header />
    </main>
  </StrictMode>,
)
