import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import type { HeroScene } from '../lib/heroScene'

/** Mounts the 3D wireframe stage. Its lights switch on once `lit` turns true. */
export function HeroStage({ lit }: { lit: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const scene = useRef<HeroScene | null>(null)
  const wantLit = useRef(lit)
  wantLit.current = lit

  useEffect(() => {
    let cancelled = false
    import('../lib/heroScene').then(({ createHeroScene }) => {
      if (cancelled || !ref.current) return
      scene.current = createHeroScene(ref.current, { reduced: prefersReducedMotion() })
      if (scene.current) ref.current.classList.add('is-ready')
      if (wantLit.current) scene.current?.light()
    })
    return () => {
      cancelled = true
      scene.current?.dispose()
      scene.current = null
    }
  }, [])

  useEffect(() => {
    if (lit) scene.current?.light()
  }, [lit])

  return <div className="hero-3d" ref={ref} />
}
