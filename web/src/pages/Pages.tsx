import { useRef, useState, type CSSProperties } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AskMachine } from '../components/AskMachine'
import { Eyebrow, FinalCta, PageHero, PhotoSlot, WhatsAppIcon, useTitle } from '../components/Basics'
import { LightingDesk } from '../components/LightingDesk'
import { StageLink } from '../components/Transition'
import { contact, cues, services, whatsappUrl, workItems } from '../data'
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
      <FinalCta title="Meet the crew." text="Tell us about your event and talk to the team who will run it." />
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
        <div className="wrap gallery-grid">
          <div className="gallery-main" data-reveal><PhotoSlot src={service.image} alt={service.name} label={service.slotLabel} ratio="auto" /></div>
          <div data-reveal><PhotoSlot label={`${service.channel}, detail shot`} ratio="auto" /></div>
          <div data-reveal><PhotoSlot label={`${service.channel}, guests or crew`} ratio="auto" /></div>
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
