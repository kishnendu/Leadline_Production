import { useRef, useState, type CSSProperties } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AskMachine } from '../components/AskMachine'
import { Eyebrow, FinalCta, PageHero, PhotoSlot, WhatsAppIcon, useTitle } from '../components/Basics'
import { LightingDesk } from '../components/LightingDesk'
import { ServiceGallery } from '../components/Showcase'
import { StageLink } from '../components/Transition'
import { contact, cues, recentWorks, services, whatsappUrl, workItems } from '../data'
import { RecentHighlight } from './WorkCase'
import { useReveal } from '../lib/motion'

export function About() {
  const root = useRef<HTMLDivElement>(null)
  useTitle('About')
  useReveal(root)
  return (
    <div ref={root}>
      <PageHero eyebrow="Backstage" title="The crew behind the curtain." intro="LeadLine Production was founded on a singular mission: to transform your vision into unforgettable experiences." />
      <section className="section">
        <div className="wrap two-col">
          <PhotoSlot src="/media/about.jpg" alt="Event team reviewing plans at a business summit" label="LeadLine team photo" ratio="4 / 3" />
          <div className="prose" data-reveal>
            <h2 className="display sub-title">Your ask is our task, and we take that seriously.</h2>
            <p>Our team comprises seasoned event planners, creative designers, logistics specialists, and hospitality professionals with a proven track record of orchestrating world-class events across India.</p>
            <p>What sets us apart is our commitment to seamless execution and meticulous attention to detail. From intimate weddings to large-scale political conferences, we ensure every event exceeds expectations while staying true to your vision.</p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="wrap two-col two-col--flip">
          <div className="prose" data-reveal>
            <Eyebrow>Directed by</Eyebrow>
            <h2 className="display sub-title">Subhodip Ganguly</h2>
            <p className="mono">Founder &amp; CEO</p>
          </div>
          <PhotoSlot label="Portrait of Subhodip Ganguly" ratio="4 / 3" />
        </div>
      </section>
      <section className="section awards">
        <div className="wrap awards-grid">
          <figure className="award-photo" data-reveal>
            <img
              src="/media/award.jpg"
              alt="Subhodip Ganguly and the LeadLine Production team receiving an award on stage from the Nari Shakti Foundation"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mono">Subhodip Ganguly and the LeadLine team receiving the award</figcaption>
          </figure>
          <div className="prose award-copy" data-reveal>
            <Eyebrow>Honours</Eyebrow>
            <h2 className="display sub-title">Honoured by the Nari Shakti Foundation.</h2>
            <p>LeadLine Production was recognised by the prestigious Nari Shakti Foundation as Event Partner, for successfully delivering their event from start to finish.</p>
            <p>Our Founder &amp; CEO, Subhodip Ganguly, received the award on stage alongside the team who made it happen.</p>
            <AwardBadge />
          </div>
        </div>
      </section>
      <FinalCta title="Meet the crew." text="Tell us about your event and talk to the team who will run it." />
    </div>
  )
}

/** Gold laurel medallion for the Nari Shakti Foundation award. */
function AwardBadge() {
  // Leaves climb each side of the ring from the bottom towards the top
  const leaves = Array.from({ length: 11 }, (_, i) => {
    const deg = 100 + i * 12.5
    const rad = (deg * Math.PI) / 180
    return { x: 100 + Math.cos(rad) * 84, y: 100 + Math.sin(rad) * 84, rot: deg + 90 - 32, size: 1 - i * 0.035 }
  })
  return (
    <div className="award-badge" role="img" aria-label="Award: Event Partner, Nari Shakti Foundation">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6dc8c" />
            <stop offset="0.45" stopColor="#c99a3a" />
            <stop offset="0.7" stopColor="#f1d27a" />
            <stop offset="1" stopColor="#9c7224" />
          </linearGradient>
        </defs>
        {[1, -1].map((side) => (
          <g key={side} transform={side === -1 ? 'translate(200 0) scale(-1 1)' : undefined}>
            <path d="M96 186 A84 84 0 0 1 30 47" fill="none" stroke="url(#gold)" strokeWidth="1.6" />
            {leaves.map((leaf, i) => (
              <ellipse
                key={i}
                cx={leaf.x}
                cy={leaf.y}
                rx={12 * leaf.size}
                ry={4.4 * leaf.size}
                fill="url(#gold)"
                transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y}) translate(${-7 * leaf.size} 0)`}
              />
            ))}
          </g>
        ))}
        <circle cx="100" cy="100" r="66" fill="rgba(212,166,74,0.06)" stroke="url(#gold)" strokeWidth="1.4" />
        <circle cx="100" cy="100" r="61" fill="none" stroke="url(#gold)" strokeWidth="0.6" opacity="0.6" />
      </svg>
      <div className="award-badge-text">
        <span className="mono">Event Partner</span>
        <strong className="display">
          Nari
          <br />
          Shakti
        </strong>
        <span className="mono">Foundation</span>
      </div>
    </div>
  )
}

export function Services() {
  const root = useRef<HTMLDivElement>(null)
  useTitle('Services')
  useReveal(root)
  return (
    <div ref={root}>
      <PageHero eyebrow="The programme" title="Six shows. One crew." intro="Comprehensive event management solutions tailored to your unique vision." />
      <LightingDesk showIntro={false} />
      <section className="section">
        <div className="wrap service-index">
          {services.map((service, i) => (
            <StageLink to={`/services/${service.slug}`} className="index-row" key={service.slug} data-reveal style={{ '--gel-a': service.gels[0] } as CSSProperties}>
              <span className="mono">0{i + 1}</span>
              <span className="display">{service.name}</span>
              <span aria-hidden="true">→</span>
            </StageLink>
          ))}
        </div>
      </section>
      <FinalCta />
    </div>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const root = useRef<HTMLDivElement>(null)
  const index = services.findIndex((item) => item.slug === slug)
  const service = services[index]
  useTitle(service?.name ?? 'Services')
  useReveal(root)
  if (!service) return <Navigate to="/services" replace />
  const next = services[(index + 1) % services.length]
  const style = { '--gel-a': service.gels[0], '--gel-b': service.gels[1] } as CSSProperties

  return (
    <div ref={root} style={style} key={service.slug}>
      <PageHero eyebrow={`Channel 0${index + 1}`} title={service.name} gels={service.gels} />
      <section className="section">
        <div className="wrap two-col">
          <div className="prose" data-reveal>
            <p className="lede">{service.summary}</p>
            <a className="btn btn-primary" href={whatsappUrl(`Hi LeadLine Production! I'm interested in ${service.name}.`)} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Ask about this
            </a>
          </div>
          <div data-reveal>
            <h2 className="mono list-title">What we handle</h2>
            <ul className="tick-list">
              {service.items.map((item) => <li className="display" key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="service-gallery">
        <div className="wrap">
          <ServiceGallery photos={[...(service.image ? [{ src: service.image, alt: service.name }] : []), ...(service.gallery ?? [])]} />
        </div>
      </section>
      <section className="section section--tint">
        <div className="wrap">
          <div data-reveal>
            <Eyebrow>Run of show</Eyebrow>
            <h2 className="display sub-title">How it comes together.</h2>
          </div>
          <ol className="mini-cues">
            {cues.map((cue, i) => (
              <li key={cue.title} data-reveal>
                <span className="mono">Cue 0{i + 1}</span>
                <h3 className="display">{cue.title}</h3>
                <p>{cue.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <StageLink to={`/services/${next.slug}`} className="next-show" style={{ '--gel-a': next.gels[0] } as CSSProperties}>
        <span className="mono">Next on the programme</span>
        <span className="display">{next.name} →</span>
      </StageLink>
    </div>
  )
}

export function Work() {
  const root = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('All')
  useTitle('Our Work')
  useReveal(root)
  const categories = ['All', ...services.map((service) => service.channel)]
  const shown = workItems.filter((item) => filter === 'All' || item.category === filter)
  return (
    <div ref={root}>
      <PageHero eyebrow="Now showing" title="Our work." intro="A look at the stages we've built and the rooms we've filled." />
      <RecentHighlight work={recentWorks[0]} compact />
      <section className="section">
        <div className="wrap">
          <div className="chips work-filter">
            {categories.map((category) => (
              <button key={category} type="button" className={`chip ${filter === category ? 'is-on' : ''}`} aria-pressed={filter === category} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="work-grid">
            {shown.map((item) => (
              <div className="work-item" key={item.label}>
                <PhotoSlot src={item.src} alt={item.alt} label={item.label} ratio="4 / 3" />
                <p className="mono">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta title="Your show next?" />
    </div>
  )
}

export function Careers() {
  const root = useRef<HTMLDivElement>(null)
  useTitle('Careers')
  useReveal(root)
  const roles = ['Event planning', 'Hospitality management', 'Creative design', 'Logistics coordination', 'Production management']
  return (
    <div ref={root}>
      <PageHero eyebrow="Crew call" title="Join the crew." intro="LeadLine Production is always seeking exceptional talent." />
      <section className="section">
        <div className="wrap two-col">
          <div className="prose" data-reveal>
            <p>We offer competitive compensation, ongoing professional development, and the opportunity to work on world-class events with prestigious clients across diverse industries.</p>
            <p>Join our passionate team where "Your Ask Is Our Task" applies to your career growth as much as it does to our clients.</p>
            <a className="btn btn-primary" href={`mailto:${contact.email}?subject=${encodeURIComponent('Crew call application')}`}>Apply by email</a>
          </div>
          <PhotoSlot src="/media/careers.jpg" alt="Crew members with headsets coordinating an event" label="Crew at work" ratio="3 / 2" />
        </div>
      </section>
      <section className="section section--tint">
        <div className="wrap">
          <h2 className="mono list-title" data-reveal>We're looking for backgrounds in</h2>
          <ul className="tick-list tick-list--big">
            {roles.map((role) => <li className="display" key={role} data-reveal>{role}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}

export function Contact() {
  const root = useRef<HTMLDivElement>(null)
  useTitle('Contact')
  useReveal(root)
  return (
    <div ref={root}>
      <AskMachine headingLevel="h1" />
      <section className="section section--tint">
        <div className="wrap two-col">
          <div className="contact-list" data-reveal>
            <p className="eyebrow mono">Box office</p>
            {contact.phones.map((phone) => (
              <a className="display contact-big" key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            ))}
            <a className="contact-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
            <p>{contact.place}</p>
          </div>
          <div className="map" data-reveal>
            <iframe
              title="Map of Durgapur, West Bengal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117057.12371952129!2d87.21777190439815!3d23.5312393552933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7710b47a89171%3A0x429e1bdb57e009dd!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1780223591884!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export function NotFound() {
  useTitle('Page not found')
  return (
    <div>
      <PageHero eyebrow="Wrong stage door" title="This show isn't on." intro="The page you're looking for doesn't exist." />
      <section className="section">
        <div className="wrap"><StageLink to="/" className="btn btn-primary">Back to the main stage</StageLink></div>
      </section>
    </div>
  )
}
