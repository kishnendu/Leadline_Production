import { useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Eyebrow, FinalCta, LightRig, WhatsAppIcon, useTitle } from '../components/Basics'
import { Gallery, VideoPlayer } from '../components/Showcase'
import { StageLink } from '../components/Transition'
import { recentWorks, whatsappUrl, type RecentWork } from '../data'
import { useReveal } from '../lib/motion'

/** The magic-show style highlight, reused on the home page and the Our Work page. */
export function RecentHighlight({ work, compact = false }: { work: RecentWork; compact?: boolean }) {
  return (
    <section className={`recent ${compact ? 'recent--compact' : ''}`}>
      <LightRig count={5} style={{ '--gel-a': '#ffc24a', '--gel-b': '#2f8fff' } as React.CSSProperties} />
      <div className="wrap recent-grid">
        <div className="recent-copy" data-reveal>
          <p className="eyebrow mono recent-flag"><span className="recent-dot" />Just wrapped</p>
          <h2 className="display section-title recent-title">{work.title}</h2>
          <p className="lede">{compact ? work.summary : work.highlight.text}</p>
          <ul className="recent-tags">
            {work.tags.map((tag) => <li className="mono" key={tag}>{tag}</li>)}
          </ul>
          <div className="btn-row">
            <StageLink to={`/work/${work.slug}`} className="btn btn-primary">See the full story</StageLink>
            <a className="btn btn-ghost" href={whatsappUrl(work.whatsappText)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Plan one like it</a>
          </div>
        </div>
        <div className="recent-stage" data-reveal>
          <VideoPlayer clip={work.highlight} />
          <p className="mono recent-caption">Highlight · {work.highlight.title}</p>
        </div>
      </div>
    </section>
  )
}

export function WorkCase() {
  const { slug } = useParams()
  const root = useRef<HTMLDivElement>(null)
  const work = recentWorks.find((item) => item.slug === slug)
  useTitle(work?.title ?? 'Our Work')
  useReveal(root)
  if (!work) return <Navigate to="/work" replace />

  return (
    <div ref={root} key={work.slug}>
      <header className="case-hero">
        <img className="case-hero-img" src={work.cover} alt="" />
        <div className="case-hero-shade" />
        <div className="wrap case-hero-inner">
          <StageLink to="/work" className="mono case-back">← All work</StageLink>
          <Eyebrow>{work.kicker}</Eyebrow>
          <h1 className="display page-title">{work.title}</h1>
          <p className="lede">{work.summary}</p>
          <ul className="recent-tags">
            {work.tags.map((tag) => <li className="mono" key={tag}>{tag}</li>)}
          </ul>
        </div>
      </header>

      <section className="recent recent--case">
        <LightRig count={5} style={{ '--gel-a': '#ffc24a', '--gel-b': '#2f8fff' } as React.CSSProperties} />
        <div className="wrap recent-grid">
          <div className="recent-copy" data-reveal>
            <Eyebrow>Highlight</Eyebrow>
            <h2 className="display sub-title">{work.highlight.heading}</h2>
            <p className="lede">{work.highlight.text}</p>
          </div>
          <div className="recent-stage" data-reveal>
            <VideoPlayer clip={work.highlight} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col case-delivered">
          <div data-reveal>
            <Eyebrow>Run of show</Eyebrow>
            <h2 className="display sub-title">What we delivered.</h2>
            <ol className="delivered-list">
              {work.delivered.map((item, i) => (
                <li key={item}><span className="mono">Cue {String(i + 1).padStart(2, '0')}</span>{item}</li>
              ))}
            </ol>
          </div>
          <figure className="award-photo case-crew" data-reveal>
            <img src={work.crew.src} alt={work.crew.alt} loading="lazy" />
            <figcaption className="mono">The crew behind the show</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--tint">
        <div className="wrap">
          <div className="split-head" data-reveal>
            <div>
              <Eyebrow>Moments</Eyebrow>
              <h2 className="display sub-title">From arrival to curtain call.</h2>
            </div>
            <p className="mono moments-hint">Tap any clip to play with sound</p>
          </div>
          <div className="moments">
            {work.moments.map((clip) => (
              <figure className="moment" key={clip.src} data-reveal>
                <VideoPlayer clip={clip} variant="card" />
                <figcaption>
                  <strong className="display">{clip.title}</strong>
                  <span>{clip.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div data-reveal>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="display sub-title">On the day.</h2>
          </div>
          <Gallery photos={work.photos} />
        </div>
      </section>

      <FinalCta title="Your celebration next?" text="Birthdays, milestones and family celebrations. Tell us your ask." />
    </div>
  )
}
