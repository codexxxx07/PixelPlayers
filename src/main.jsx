import { ClerkProvider } from '@clerk/react';
import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import './index.css'
import App from './App'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Features = lazy(() => import('./pages/Features'))
const Games = lazy(() => import('./pages/Games'))
const ComingSoon = lazy(() => import('./pages/ComingSoon'))
const Memory = lazy(() => import('./pages/Memory'))
const Routine = lazy(() => import('./pages/Routine'))
const Reminders = lazy(() => import('./pages/Reminders'))
const Assistant = lazy(() => import('./pages/Assistant'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Progress = lazy(() => import('./pages/Progress'))
const Support = lazy(() => import('./pages/Support'))
const Settings = lazy(() => import('./pages/Settings'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))

const GAME_SLUGS = [
  'picture-recall',
  'sequence-recall',
  'pattern-match',
  'find-the-object',
  'memory-cards',
  'word-association',
  'daily-life-recall',
  'place-recognition',
  'memory-story',
  'name-face-match',
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <AppProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="features" element={<Features />} />
                <Route path="games" element={<Games />} />
                {GAME_SLUGS.map((slug) => (
                  <Route key={slug} path={`games/${slug}`} element={<ComingSoon />} />
                ))}
                <Route path="memory" element={<Memory />} />
                <Route path="routine" element={<Routine />} />
                <Route path="reminders" element={<Reminders />} />
                <Route path="assistant" element={<Assistant />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="progress" element={<Progress />} />
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </Suspense>
        </AppProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)