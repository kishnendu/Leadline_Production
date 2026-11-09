import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Clip } from '../data'
import { lockScroll, prefersReducedMotion } from '../lib/motion'

// Only one clip may play with sound at a time.
let soundOwner: HTMLVideoElement | null = null
function claimSound(video: HTMLVideoElement) {
  if (soundOwner && soundOwner !== video) soundOwner.muted = true
  soundOwner = video
}

const fmt = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00')

const Icon = {
  play: <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>,
  pause: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>,
  soundOn: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></svg>,
  soundOff: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" /><path d="M17 9l5 6M22 9l-5 6" /></svg>,
}

/**
 * Portrait video with custom controls.
 * "feature": plays muted while on screen, with a clear tap-for-sound button.
 * "card": shows its poster, previews on hover, and plays with sound on tap.
 */
export function VideoPlayer({ clip, variant = 'feature' }: { clip: Clip; variant?: 'feature' | 'card' }) {
  const box = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const sync = () => {
      setPlaying(!video.paused)
      setMuted(video.muted)
    }
    const onTime = () => setTime(video.currentTime)
    const onMeta = () => setDuration(video.duration)
    video.addEventListener('play', sync)
    video.addEventListener('pause', sync)
    video.addEventListener('volumechange', sync)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onMeta)

    let observer: IntersectionObserver | undefined
    if (variant === 'feature' && !prefersReducedMotion()) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {})
          else if (!entry.isIntersecting) video.pause()
        },
        { threshold: 0.45 },
      )
      observer.observe(box.current!)
    } else {
      const stopWhenHidden = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) video.pause()
      })
      stopWhenHidden.observe(box.current!)
      observer = stopWhenHidden
    }
    return () => {
      observer?.disconnect()
      video.removeEventListener('play', sync)
      video.removeEventListener('pause', sync)
      video.removeEventListener('volumechange', sync)
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onMeta)
      if (soundOwner === video) soundOwner = null
    }
  }, [variant])

  const play = (withSound: boolean) => {
    const video = ref.current!
    if (withSound) {
      claimSound(video)
      video.muted = false
    }
    userPaused.current = false
    video.play().catch(() => {})
  }
  const togglePlay = () => {
    const video = ref.current!
    if (video.paused) play(variant === 'card' || !video.muted)
    else {
      userPaused.current = true
      video.pause()
    }
  }
  const toggleSound = () => {
    const video = ref.current!
    if (video.muted) {
      claimSound(video)
      video.muted = false
      if (video.paused) play(true)
    } else video.muted = true
  }

  const hoverPreview = variant === 'card'
  return (
    <div
      ref={box}
      className={`vplayer vplayer--${variant} ${clip.rotate ? 'is-rotated' : ''} ${playing ? 'is-playing' : ''}`}
      onPointerEnter={(e) => {
        if (hoverPreview && e.pointerType === 'mouse' && ref.current?.paused) ref.current.play().catch(() => {})
      }}
      onPointerLeave={(e) => {
        if (hoverPreview && e.pointerType === 'mouse' && ref.current?.muted) ref.current.pause()
      }}
    >
      <div className="vplayer-frame">
        <video
          ref={ref}
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload={variant === 'feature' ? 'metadata' : 'none'}
          onClick={togglePlay}
          aria-label={clip.caption}
        />
      </div>
      {!playing && (
        <button type="button" className="vplayer-big" onClick={() => play(true)} aria-label={`Play ${clip.title} with sound`}>
          {Icon.play}
        </button>
      )}
      {variant === 'feature' && playing && muted && (
        <button type="button" className="vplayer-sound-pill" onClick={toggleSound}>
          {Icon.soundOn} Tap for sound
        </button>
      )}
      <div className="vplayer-bar">
        <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>{playing ? Icon.pause : Icon.play}</button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          aria-label="Seek"
          onChange={(e) => {
            if (ref.current) ref.current.currentTime = Number(e.target.value)
          }}
          style={{ '--p': `${duration ? (time / duration) * 100 : 0}%` } as CSSProperties}
        />
        <span className="mono vplayer-time">{fmt(time)}</span>
        <button type="button" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>{muted ? Icon.soundOff : Icon.soundOn}</button>
      </div>
    </div>
  )
}

type Photo = { src: string; alt: string; tall?: boolean }

/** Full-screen photo viewer with arrows, keyboard and swipe-free tap navigation. */
function useLightbox(photos: Photo[]) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const open = (i: number) => {
    setIndex(i)
    dialog.current?.showModal()
    lockScroll(true)
  }
  const step = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length)
  const viewer = (
    <dialog
      ref={dialog}
      className="lightbox"
      onClose={() => lockScroll(false)}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
    >
      <img src={photos[index].src} alt={photos[index].alt} />
      <p className="mono">{index + 1} / {photos.length}</p>
      <button type="button" className="lightbox-btn lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">←</button>
      <button type="button" className="lightbox-btn lightbox-next" onClick={() => step(1)} aria-label="Next photo">→</button>
      <button type="button" className="lightbox-btn lightbox-close" onClick={() => dialog.current?.close()} aria-label="Close">✕</button>
    </dialog>
  )
  return { open, viewer }
}

/** Photo grid that opens a full-screen viewer. */
export function Gallery({ photos }: { photos: Photo[] }) {
  const { open, viewer } = useLightbox(photos)
  return (
    <>
      <div className="case-gallery">
        {photos.map((photo, i) => (
          <button type="button" key={photo.src} className={`case-photo ${photo.tall ? 'is-tall' : ''}`} onClick={() => open(i)} data-reveal>
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      {viewer}
    </>
  )
}

/**
 * Every photo for a service: a large lead photo with two beside it,
 * then the rest in an even grid. Any photo opens the full-screen viewer.
 */
export function ServiceGallery({ photos }: { photos: Photo[] }) {
  const { open, viewer } = useLightbox(photos)
  const tile = (photo: Photo, i: number, className = '') => (
    <button type="button" key={photo.src} className={`svc-photo ${className}`} onClick={() => open(i)} data-reveal aria-label={`Open photo: ${photo.alt}`}>
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
    </button>
  )
  const lead = photos.slice(0, 3)
  const rest = photos.slice(3)
  return (
    <>
      <div className={`svc-lead svc-lead--${lead.length}`}>
        {lead.map((photo, i) => tile(photo, i, i === 0 ? 'svc-photo--main' : ''))}
      </div>
      {rest.length > 0 && (
        <div className="svc-rest" data-count={rest.length} style={{ '--cols': Math.min(rest.length, 4) } as CSSProperties}>
          {rest.map((photo, i) => tile(photo, i + 3))}
        </div>
      )}
      <p className="mono svc-count">{photos.length} {photos.length === 1 ? 'photo' : 'photos'} · tap to enlarge</p>
      {viewer}
    </>
  )
}

/** Crew credits shown as hanging backstage passes. Tap a pass to see the full photo. */
export function PassWall({ credits }: { credits: { src: string; event: string; detail: string; tone: string }[] }) {
  const { open, viewer } = useLightbox(credits.map((c) => ({ src: c.src, alt: `${c.event}, ${c.detail}` })))
  return (
    <>
      <div className="passes">
        {credits.map((credit, i) => (
          <button
            type="button"
            key={credit.src}
            className="pass-card"
            onClick={() => open(i)}
            style={{ '--tone': credit.tone, '--tilt': `${(i % 2 ? 1 : -1) * (1.2 + (i % 3) * 0.6)}deg` } as CSSProperties}
            aria-label={`Open photo: ${credit.event}, ${credit.detail}`}
            data-reveal
          >
            <span className="pass-cord" aria-hidden="true" />
            <span className="pass-body">
              <span className="pass-slot" aria-hidden="true" />
              <span className="pass-photo"><img src={credit.src} alt="" decoding="async" /></span>
              <span className="pass-label">
                <strong className="display">{credit.event}</strong>
                <span className="mono">{credit.detail}</span>
              </span>
              <span className="pass-band mono" aria-hidden="true">All access</span>
            </span>
          </button>
        ))}
      </div>
      {viewer}
    </>
  )
}
