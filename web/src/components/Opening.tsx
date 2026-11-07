import { useRef } from 'react'
import { gsap, lockScroll, useGSAP } from '../lib/motion'

/** First-visit intro: the visitor's pointer is the spotlight, then the house lights come up. */
export function Opening({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const el = root.current!
      lockScroll(true)
      const spot = { x: -0.15, y: 0.42, r: 15 }
      const paint = () => {
        el.style.setProperty('--mx', `${spot.x * 100}%`)
        el.style.setProperty('--my', `${spot.y * 100}%`)
        el.style.setProperty('--sr', `${spot.r}vmax`)
      }
      paint()

      const finish = () => {
        lockScroll(false)
        onDone()
      }

      const lightsUp = () =>
        gsap
          .timeline({ onComplete: finish })
          .to(spot, { r: 170, duration: 0.9, ease: 'power2.in', onUpdate: paint })
          .to(el, { autoAlpha: 0, duration: 0.45, ease: 'power1.out' }, '-=0.25')

      const master = gsap.timeline({ onUpdate: paint })
      master
        .from('.opening-hint', { autoAlpha: 0, duration: 0.5, delay: 0.25 })
        .to(spot, { x: 0.3, y: 0.55, duration: 0.7, ease: 'power2.out' }, 0.1)
        .to(spot, { x: 0.72, y: 0.42, duration: 0.8, ease: 'sine.inOut' })
        .to(spot, { x: 0.5, y: 0.5, duration: 0.45, ease: 'sine.inOut' })
        .add(lightsUp)
      timeline.current = master

      const onPointer = (event: PointerEvent) => {
        // The pointer takes over the light's position, while the timeline still ends the intro.
        gsap.killTweensOf(spot, 'x,y')
        gsap.to(spot, {
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
          onUpdate: paint,
        })
      }
      el.addEventListener('pointermove', onPointer)
      return () => {
        el.removeEventListener('pointermove', onPointer)
        lockScroll(false)
      }
    },
    { scope: root },
  )

  const skip = () => {
    timeline.current?.progress(1)
  }

  return (
    <div className="opening" ref={root} role="dialog" aria-label="Opening animation">
      <div className="opening-glow" />
      <div className="opening-word opening-word--dim" aria-hidden="true">
        <span>Leadline</span>
        <small>Production</small>
      </div>
      <div className="opening-word opening-word--lit" aria-hidden="true">
        <span>Leadline</span>
        <small>Production</small>
      </div>
      <p className="opening-hint mono">You hold the spotlight</p>
      <button className="opening-skip mono" onClick={skip}>
        Skip intro
      </button>
    </div>
  )
}
