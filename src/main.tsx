import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@tailwindplus/elements"
import './index.css'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Provider } from 'react-redux'
import { store } from './components/redux/store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <TooltipProvider>
    
    <App />
  </TooltipProvider>
  </Provider>,
)
