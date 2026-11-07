import { contact, services } from '../data'
import { StageLink } from './Transition'

/** The footer reads like closing credits, ending on the wordmark. */
export function Footer() {
  const replay = () => {
    try {
      localStorage.removeItem('leadline-intro-seen')
    } catch {
      // Storage can be blocked; the reload below still works.
    }
    window.location.assign('/?intro=1')
  }

  return (
    <footer className="credits">
      <div className="wrap">
        <p className="eyebrow mono center" data-reveal>Closing credits</p>
        <dl className="credit-list">
          <div data-reveal>
            <dt>Founder &amp; CEO</dt>
            <dd>Subhodip Ganguly</dd>
          </div>
          <div data-reveal>
            <dt>Starring</dt>
            <dd className="credit-links">
              {services.map((service) => (
                <StageLink key={service.slug} to={`/services/${service.slug}`}>{service.channel}</StageLink>
              ))}
            </dd>
          </div>
          <div data-reveal>
            <dt>Box office</dt>
            <dd className="credit-links">
              {contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              ))}
              <a href={`mailto:${contact.email}`}>
                {contact.email.split('@')[0]}@<wbr />
                {contact.email.split('@')[1]}
              </a>
            </dd>
          </div>
          <div data-reveal>
            <dt>Based in</dt>
            <dd>{contact.place}</dd>
          </div>
          <div data-reveal>
            <dt>Also showing</dt>
            <dd className="credit-links">
              <StageLink to="/about">About</StageLink>
              <StageLink to="/work">Our Work</StageLink>
              <StageLink to="/careers">Careers</StageLink>
              <StageLink to="/contact">Contact</StageLink>
            </dd>
          </div>
        </dl>
      </div>
      <p className="credits-word display" aria-hidden="true">Leadline</p>
      <div className="wrap credits-base">
        <p>&copy; 2026 LeadLine Production. Your Ask Is Our Task.</p>
        <div>
          <StageLink to="/privacy">Privacy</StageLink>
          <StageLink to="/terms">Terms</StageLink>
          <button onClick={replay}>Replay opening</button>
        </div>
      </div>
    </footer>
  )
}
