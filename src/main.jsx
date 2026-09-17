import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ThemeProvider } from './context/ThemeContext'
import ClerkProviderWithRouter from './components/ClerkProviderWithRouter'
import { BootShell } from './components/Skeleton'
import './i18n'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import('./App'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ClerkProviderWithRouter>
          <AppProvider>
            <Suspense fallback={<BootShell />}>
              <App />
            </Suspense>
          </AppProvider>
        </ClerkProviderWithRouter>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)