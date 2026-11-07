import { useState, type CSSProperties } from 'react'
import { askEvents, askGuests, askMoods, whatsappUrl } from '../data'
import { LightRig, WhatsAppIcon } from './Basics'
import { StageScene } from './StageScene'

function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: { value: T; label: string }[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <fieldset className="choice">
      <legend className="mono">{legend}</legend>
      <div className="chips">
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={`chip ${option.value === value ? 'is-on' : ''}`}
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** The centrepiece: pick an event, a guest count and a mood, and the stage builds itself. */
export function AskMachine({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const [eventKey, setEventKey] = useState(askEvents[0].key as string)
  const [guestLabel, setGuestLabel] = useState(askGuests[2].label)
  const [moodKey, setMoodKey] = useState(askMoods[0].key)

  const event = askEvents.find((item) => item.key === eventKey)!
  const guests = askGuests.find((item) => item.label === guestLabel)!
  const mood = askMoods.find((item) => item.key === moodKey)!

  const sentence = `${mood.article} ${event.phrase} for ${guests.label} guests.`
  const message = `Hi LeadLine Production! Here's my ask: ${sentence} Can we talk about it?`
  const style = { '--gel-a': mood.gels[0], '--gel-b': mood.gels[1], '--tempo': mood.tempo } as CSSProperties
  const Heading = headingLevel

  return (
    <section className="ask gelled" id="ask" style={style}>
      <div className="wrap">
        <div className="ask-head" data-reveal>
          <p className="eyebrow mono">Your turn to direct</p>
          <Heading className="display section-title">What's your ask?</Heading>
          <p className="lede">Pick your event, your crowd and your mood. Watch the stage change as you go.</p>
        </div>
        <div className="ask-grid">
          <div className="stage-frame" data-reveal>
            <div className="stage">
              <div className="stage-wash" />
              <LightRig count={6} />
              <StageScene scene={event.key} heads={guests.heads} />
              <div className="stage-flash" key={`${eventKey}-${guestLabel}-${moodKey}`} />
            </div>
          </div>
          <div className="ask-controls" data-reveal>
            <Choice legend="Cue 1: The event" value={eventKey} onChange={setEventKey} options={askEvents.map((item) => ({ value: item.key as string, label: item.label }))} />
            <Choice legend="Cue 2: The guests" value={guestLabel} onChange={setGuestLabel} options={askGuests.map((item) => ({ value: item.label, label: item.label }))} />
            <Choice legend="Cue 3: The mood" value={moodKey} onChange={setMoodKey} options={askMoods.map((item) => ({ value: item.key, label: item.label }))} />
            <div className="pass">
              <div className="pass-top mono">
                <span>All access</span>
                <span>LeadLine Production</span>
              </div>
              <p className="pass-ask" aria-live="polite">{sentence}</p>
              <p className="pass-tag">Your ask is our task.</p>
              <a className="btn btn-primary btn-wide" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Send my ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
