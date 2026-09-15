import { ClerkProvider } from '@clerk/react'
import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { BootShell } from './components/Skeleton'
import './i18n'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import('./App'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <AppProvider>
          <Suspense fallback={<BootShell />}>
            <App />
          </Suspense>
        </AppProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)