import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { whatsappUrl } from '../data'
import { StageLink } from './Transition'

/** Temporary text wordmark. Replace the contents with the new logo image when it arrives. */
export function Logo() {
  return (
    <span className="logo">
      <span className="logo-main">Leadline</span>
      <span className="logo-sub">Production</span>
    </span>
  )
}

export function useTitle(title: string) {
  useEffect(() => {
    // Brand first, so it still shows when the browser tab is narrow
    document.title = `LeadLine Production | ${title}`
  }, [title])
}

export function PhotoSlot({
  src,
  alt = '',
  label,
  ratio = '3 / 2',
  className = '',
  eager = false,
}: {
  src?: string
  alt?: string
  label: string
  ratio?: string
  className?: string
  eager?: boolean
}) {
  if (src) {
    return (
      <figure className={`photo ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </figure>
    )
  }
  return (
    <figure
      className={`photo photo--empty ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder for a photo: ${label}`}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="mono">Photo needed</span>
      <span className="photo-label">{label}</span>
    </figure>
  )
}

/** Animated stage beams. Pauses itself when off screen to save battery on phones. */
export function LightRig({ count = 5, style }: { count?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-paused', !entry.isIntersecting)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const beams = Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1)
    return {
      '--x': `${8 + t * 84}%`,
      '--r': `${(0.5 - t) * 34}deg`,
      '--a': `${7 + (i % 3) * 3}deg`,
      '--m': `${1 + (i % 3) * 0.28}`,
      '--d': `${i * -0.9}s`,
      '--c': i % 2 ? 'var(--gel-b)' : 'var(--gel-a)',
    } as CSSProperties
  })

  return (
    <div className="rig" ref={ref} aria-hidden="true" style={style}>
      {beams.map((beam, i) => (
        <span className="beam" style={beam} key={i} />
      ))}
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mono">{children}</p>
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.600-1.200.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.2.300-.9.900-.9 2.200s1 2.600 1.100 2.800c.1.200 1.900 3 4.700 4.100 1.800.7 2.500.8 3.300.6.500-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.2-1.200-.100-.1-.300-.2-.5-.300z" />
    </svg>
  )
}

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappUrl("Hi LeadLine Production! I'm interested in your event management services.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  )
}

export function FinalCta({ title = 'The stage is yours.', text = "Tell us your ask. We'll take it from there." }: { title?: string; text?: string }) {
  return (
    <section className="final-cta">
      <LightRig count={7} />
      <div className="wrap final-cta-inner" data-reveal>
        <h2 className="display final-title">{title}</h2>
        <p>{text}</p>
        <div className="btn-row center">
          <StageLink to="/contact" className="btn btn-primary">Plan your event</StageLink>
          <a className="btn btn-ghost" href={whatsappUrl("Hi LeadLine Production! I'd like to plan an event.")} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export function PageHero({ eyebrow, title, intro, gels }: { eyebrow: string; title: string; intro?: string; gels?: [string, string] }) {
  const style = gels ? ({ '--gel-a': gels[0], '--gel-b': gels[1] } as CSSProperties) : undefined
  return (
    <header className="page-hero" style={style}>
      <LightRig count={5} />
      <div className="wrap page-hero-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display page-title">{title}</h1>
        {intro && <p className="lede">{intro}</p>}
      </div>
    </header>
  )
}
