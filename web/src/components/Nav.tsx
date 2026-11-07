import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { lockScroll } from '../lib/motion'
import { Logo } from './Basics'
import { StageLink } from './Transition'

const links = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Our Work' },
  { to: '/careers', label: 'Careers' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isCurrent = (to: string) => pathname === to || pathname.startsWith(`${to}/`)

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="wrap nav-bar">
        <StageLink to="/" aria-label="LeadLine Production home" onClick={() => setOpen(false)}>
          <Logo />
        </StageLink>
        <button className="nav-toggle" aria-expanded={open} aria-controls="site-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
        <nav id="site-menu" className="nav-menu" aria-label="Main">
          {links.map((link) => (
            <StageLink key={link.to} to={link.to} className={isCurrent(link.to) ? 'is-current' : ''} onClick={() => setOpen(false)}>
              {link.label}
            </StageLink>
          ))}
          <StageLink to="/contact" className="btn btn-primary btn-small" onClick={() => setOpen(false)}>
            Contact
          </StageLink>
        </nav>
      </div>
    </header>
  )
}
