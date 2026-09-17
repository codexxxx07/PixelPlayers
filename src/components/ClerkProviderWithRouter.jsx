import { ClerkProvider } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

function ClerkProviderWithRouter({ children }) {
  const navigate = useNavigate()

  const routeTo = (to) => {
    const url = new URL(to, window.location.origin)
    if (url.origin !== window.location.origin) {
      window.location.href = url.href
      return
    }
    navigate(url.pathname + url.search + url.hash)
  }

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      afterSignOutUrl="/"
      routerPush={routeTo}
      routerReplace={(to) => {
        const url = new URL(to, window.location.origin)
        if (url.origin !== window.location.origin) {
          window.location.href = url.href
          return
        }
        navigate(url.pathname + url.search + url.hash, { replace: true })
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkProviderWithRouter