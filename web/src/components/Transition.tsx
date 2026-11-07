import { createContext, useCallback, useContext, useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToTop } from '../lib/motion'

const TransitionContext = createContext<(to: string) => void>(() => {})

/** Page changes run as a quick blackout: lights down, new page, lights up. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const curtain = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  const go = useCallback(
    (to: string) => {
      if (to === window.location.pathname) {
        scrollToTop()
        return
      }
      if (prefersReducedMotion() || !curtain.current) {
        navigate(to)
        return
      }
      gsap.killTweensOf(curtain.current)
      gsap.to(curtain.current, {
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => navigate(to),
      })
    },
    [navigate],
  )

  useEffect(() => {
    scrollToTop()
    ScrollTrigger.refresh()
    if (first.current) {
      first.current = false
      return
    }
    if (curtain.current) {
      gsap.to(curtain.current, { autoAlpha: 0, duration: 0.5, delay: 0.08, ease: 'power2.out', overwrite: true })
    }
  }, [pathname])

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div className="curtain" ref={curtain} aria-hidden="true" />
    </TransitionContext.Provider>
  )
}

export function StageLink({ to, children, onClick, ...rest }: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const go = useContext(TransitionContext)
  return (
    <Link
      to={to}
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
        event.preventDefault()
        go(to)
      }}
    >
      {children}
    </Link>
  )
}
