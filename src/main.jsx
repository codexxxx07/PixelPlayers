import { ClerkProvider } from '@clerk/react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import './index.css'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Games from './pages/Games'
import ComingSoon from './pages/ComingSoon'
import Memory from './pages/Memory'
import Routine from './pages/Routine'
import Reminders from './pages/Reminders'
import Assistant from './pages/Assistant'
import Dashboard from './pages/Dashboard'
import Progress from './pages/Progress'
import Support from './pages/Support'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'

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
        </AppProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)