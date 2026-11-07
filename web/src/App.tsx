import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { WhatsAppFloat } from './components/Basics'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Opening } from './components/Opening'
import { TransitionProvider } from './components/Transition'
import { startSmoothScroll, prefersReducedMotion } from './lib/motion'
import { Home } from './pages/Home'
import { About, Careers, Contact, Legal, NotFound, ServiceDetail, Services, Work } from './pages/Pages'

const INTRO_KEY = 'leadline-intro-seen'

function shouldPlayIntro() {
  if (window.location.pathname !== '/' || prefersReducedMotion()) return false
  if (new URLSearchParams(window.location.search).has('intro')) return true
  try {
    return !localStorage.getItem(INTRO_KEY)
  } catch {
    return true
  }
}

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro)

  useEffect(() => startSmoothScroll(), [])

  const endIntro = () => {
    try {
      localStorage.setItem(INTRO_KEY, '1')
    } catch {
      // Without storage the intro just plays again next visit.
    }
    setIntro(false)
  }

  return (
    <TransitionProvider>
      {intro && <Opening onDone={endIntro} />}
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home ready={!intro} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal title="Privacy policy" />} />
          <Route path="/terms" element={<Legal title="Terms of service" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </TransitionProvider>
  )
}
