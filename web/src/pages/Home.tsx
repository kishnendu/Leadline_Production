import { useRef, useState } from 'react'
import { AskMachine } from '../components/AskMachine'
import { HeroStage } from '../components/HeroStage'
import { Eyebrow, FinalCta, LightRig, PhotoSlot, useTitle } from '../components/Basics'
import { LightingDesk } from '../components/LightingDesk'
import { StageLink } from '../components/Transition'
import { creditNames, cues, recentWorks, services, testimonials, workItems } from '../data'
import { RecentHighlight } from './WorkCase'
import { gsap, prefersReducedMotion, scrollToElement, useGSAP, useReveal } from '../lib/motion'

const headline = ['Your ask', 'is our', 'task.']

export function Home({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  useTitle('Your Ask Is Our Task')
  useReveal(root)
  const [stageLit, setStageLit] = useState(false)

  useGSAP(
    () => {
      if (!ready) return
      if (prefersReducedMotion()) {
        setStageLit(true)
        return
      }
      gsap
        .timeline()
        .from('.hero-char', { yPercent: 110, duration: 0.95, ease: 'power4.out', stagger: 0.028 })
        .fromTo('.hero-line--lit', { '--lit': 0 }, { '--lit': 1, duration: 0.7, ease: 'steps(6)' }, '-=0.25')
        .call(() => setStageLit(true), [], '<')
        .from('.hero-foot > *', { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.55')

      gsap.to('.hero-copy', {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true },
      })

      gsap.fromTo(
        '.cue-progress',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.cue-list', start: 'top 65%', end: 'bottom 65%', scrub: true } },
      )
      gsap.utils.toArray<HTMLElement>('.cue').forEach((cue) => {
        gsap.to(cue, {
          scrollTrigger: { trigger: cue, start: 'top 65%', toggleClass: 'is-lit' },
        })
      })
      if (window.innerWidth > 760) gsap.utils.toArray<HTMLElement>('.work-teaser .photo img').forEach((img, i) => {
        gsap.fromTo(
          img,
          { yPercent: -6 - (i % 3) * 2 },
          { yPercent: 6 + (i % 3) * 2, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    { scope: root, dependencies: [ready] },
  )

  const marquee = services.map((service) => service.channel)

  return (
    <div ref={root}>
      <section className="hero">
        <HeroStage lit={stageLit} />
        <div className="hero-shade" />
        <div className="wrap hero-copy">
          <p className="eyebrow mono hero-eyebrow">Live event production · Durgapur, India</p>
          <h1 className="display hero-title" aria-label="Your ask is our task.">
            {headline.map((line, l) => (
              <span className={`hero-line ${l === 2 ? 'hero-line--lit' : ''}`} key={line} aria-hidden="true">
                {line.split('').map((char, c) => (
                  <span className="hero-mask" key={c}>
                    <span className="hero-char">{char === ' ' ? ' ' : char}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero-foot">
            <p className="lede">Premier event management for corporate events, weddings, political conferences, and more.</p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => scrollToElement('#ask')}>What's your ask?</button>
              <StageLink to="/work" className="btn btn-ghost">See our work</StageLink>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].flatMap((set) =>
            marquee.map((item) => (
              <span key={`${set}-${item}`}>{item}<i>✦</i></span>
            )),
          )}
        </div>
      </div>

      <AskMachine />
      <LightingDesk />

      <section className="process">
        <div className="wrap process-grid">
          <div className="process-head" data-reveal>
            <Eyebrow>Run of show</Eyebrow>
            <h2 className="display section-title">From your ask to curtain call.</h2>
            <p className="stat"><strong className="display">50+</strong> <span>events delivered</span></p>
          </div>
          <ol className="cue-list">
            <span className="cue-line"><span className="cue-progress" /></span>
            {cues.map((cue, i) => (
              <li className="cue" key={cue.title}>
                <span className="cue-dot" />
                <span className="mono cue-num">Cue 0{i + 1}</span>
                <h3 className="display">{cue.title}</h3>
                <p>{cue.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RecentHighlight work={recentWorks[0]} compact />

      <section className="work-teaser">
        <div className="wrap">
          <div className="split-head" data-reveal>
            <div>
              <Eyebrow>Now showing</Eyebrow>
              <h2 className="display section-title">Our work.</h2>
            </div>
            <StageLink to="/work" className="btn btn-ghost">See every show</StageLink>
          </div>
          <div className="teaser-grid">
            {workItems.slice(0, 6).map((item, i) => {
              const service = services.find((s) => s.channel === item.category) ?? services[0]
              return (
                <StageLink to={`/services/${service.slug}`} className={`teaser-item teaser-item--${i}`} key={item.label} data-reveal>
                  <PhotoSlot src={item.src} alt={item.alt} label={item.label} ratio="auto" eager />
                  <span className="teaser-cap">
                    <span className="mono">0{i + 1}</span>
                    <span className="display">{service.channel}</span>
                    <span className="teaser-arrow" aria-hidden="true">→</span>
                  </span>
                </StageLink>
              )
            })}
          </div>
          <p className="mono teaser-hint" aria-hidden="true">Swipe to see more →</p>
        </div>
      </section>

      <section className="credits-strip">
        <div className="wrap credits-strip-inner" data-reveal>
          <p className="mono">Our crew has worked on</p>
          <ul>
            {creditNames.map((name) => <li className="display" key={name}>{name}</li>)}
          </ul>
          <StageLink to="/about#passes" className="credits-strip-link mono">See the passes →</StageLink>
        </div>
      </section>

      <section className="reviews">
        <LightRig count={3} />
        <div className="wrap">
          <div data-reveal>
            <Eyebrow>Client testimonials</Eyebrow>
            <h2 className="display section-title">The reviews are in.</h2>
          </div>
          <div className="review-grid">
            {testimonials.map((item) => (
              <figure className="review" key={item.who} data-reveal>
                <div className="stars" role="img" aria-label="Rated 5 out of 5">★★★★★</div>
                <blockquote>{item.quote}</blockquote>
                <figcaption className="mono">{item.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  )
}
