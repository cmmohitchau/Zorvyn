import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@tailwindplus/elements"
import './index.css'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <TooltipProvider>
    
    <App />
  </TooltipProvider>,
)
