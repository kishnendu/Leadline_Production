import { useState, type CSSProperties } from 'react'
import { services } from '../data'
import { LightRig, PhotoSlot } from './Basics'
import { StageLink } from './Transition'

/** Services as a lighting console: each fader brings up that service's scene. */
export function LightingDesk({ headingLevel = 'h2', showIntro = true }: { headingLevel?: 'h1' | 'h2'; showIntro?: boolean }) {
  const [active, setActive] = useState(1)
  const service = services[active]
  const style = { '--gel-a': service.gels[0], '--gel-b': service.gels[1] } as CSSProperties
  const Heading = headingLevel

  return (
    <section className="desk gelled" style={style} id="services">
      <LightRig count={6} />
      <div className="wrap desk-inner">
        {showIntro && (
          <div className="desk-intro" data-reveal>
            <p className="eyebrow mono">Take the desk</p>
            <Heading className="display section-title">Six shows. One crew.</Heading>
          </div>
        )}
        <div className="desk-scene" key={service.slug}>
          <div className="desk-copy">
            <p className="mono desk-ch">Channel 0{active + 1}</p>
            <h3 className="display desk-title">{service.name}</h3>
            <p>{service.summary}</p>
            <StageLink to={`/services/${service.slug}`} className="btn btn-ghost">Explore {service.channel.toLowerCase()}</StageLink>
          </div>
          <PhotoSlot src={service.image} alt={service.name} label={service.slotLabel} ratio="16 / 9" className="desk-photo" />
        </div>
        <div className="console" role="group" aria-label="Choose a service">
          {services.map((item, i) => (
            <button
              type="button"
              key={item.slug}
              className={`channel ${i === active ? 'is-on' : ''}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{ '--ch': item.gels[0] } as CSSProperties}
            >
              <span className="channel-led" />
              <span className="channel-track"><span className="channel-knob" /></span>
              <span className="channel-name mono">{item.channel}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
