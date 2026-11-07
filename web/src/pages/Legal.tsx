import type { ReactNode } from 'react'
import { PageHero, useTitle } from '../components/Basics'
import { StageLink } from '../components/Transition'
import { contact } from '../data'
import { scrollToElement } from '../lib/motion'

// Draft legal wording. Have it reviewed by a lawyer before launch.
const UPDATED = '7 November 2026'

type Section = { id: string; title: string; body: ReactNode }

const Mail = () => <a href={`mailto:${contact.email}`}>{contact.email}</a>

const ContactBlock = () => (
  <address className="legal-contact">
    <strong>LeadLine Production</strong>
    <span>{contact.place}</span>
    <span>Email: <Mail /></span>
    <span>
      Phone:{' '}
      {contact.phones.map((phone, i) => (
        <span key={phone}>
          {i > 0 && ', '}
          <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
        </span>
      ))}
    </span>
  </address>
)

const privacy: Section[] = [
  {
    id: 'collect',
    title: 'What we collect',
    body: (
      <>
        <h3>Information you give us</h3>
        <p>When you contact us by WhatsApp, phone or email, we receive what you choose to share. This usually includes your name, phone number, email address and details of your event, such as the type of event, date, venue, number of guests, budget and preferences.</p>
        <p>If you apply for a job with us, we receive your contact details, CV and any other information you include.</p>
        <h3>The "What's your ask?" tool</h3>
        <p>The choices you make in this tool stay in your browser. They are not sent to us or stored by us. If you tap "Send my ask on WhatsApp", WhatsApp opens with a pre-filled message, and we only receive it if you choose to send it.</p>
        <h3>Information collected automatically</h3>
        <p>This website does not use analytics, advertising or tracking cookies. Our hosting provider, GitHub Pages, may record technical information such as your IP address, browser type and the pages you request, to keep the website secure and running.</p>
        <p>We save one small note in your browser's storage to remember that you have seen the opening animation, so it does not play on every visit. It does not identify you, and you can clear it at any time from your browser settings.</p>
        <h3>Embedded map</h3>
        <p>Our Contact page shows a Google Map. When it loads, Google may collect information about your visit under the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.</p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How we use it',
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>reply to your enquiry and prepare proposals and quotations</li>
          <li>plan, coordinate and deliver your event</li>
          <li>consider your job application</li>
          <li>keep records we are required to keep by law, for example for tax and accounting</li>
          <li>keep our website and systems secure</li>
        </ul>
        <p>We will only send you news or offers if you have agreed to it, and you can ask us to stop at any time. We do not sell your personal data.</p>
      </>
    ),
  },
  {
    id: 'basis',
    title: 'Why we are allowed to use it',
    body: (
      <p>We process your personal data under India's Digital Personal Data Protection Act, 2023. We rely on the consent you give when you contact us and share your details, or on other legitimate uses the law allows, such as meeting legal obligations. You can withdraw your consent at any time by contacting us. This does not affect anything we did before you withdrew it, but we may then be unable to continue planning your event.</p>
    ),
  },
  {
    id: 'share',
    title: 'Who we share it with',
    body: (
      <>
        <p>We share your information only when needed, and only with:</p>
        <ul>
          <li>venues, vendors, artists and suppliers who help deliver your event</li>
          <li>service providers who help us run our business, such as WhatsApp, our email provider and our website host</li>
          <li>government or law enforcement authorities, when the law requires it</li>
        </ul>
        <p>Some of these providers may store data outside India. Where they do, we use providers who protect it appropriately.</p>
      </>
    ),
  },
  {
    id: 'photos',
    title: 'Event photos and videos',
    body: (
      <p>We may photograph or film events we produce and use the images in our portfolio, on this website and on social media, as agreed with our clients. If you appear in one of our images and would like it removed, email us at <Mail /> with a link or description of the image and we will take it down from our website and social media.</p>
    ),
  },
  {
    id: 'keep',
    title: 'How long we keep it',
    body: (
      <ul>
        <li><strong>Enquiries</strong> that do not lead to a booking are kept for up to 12 months, so we can follow up.</li>
        <li><strong>Client records</strong> are kept for as long as needed to deliver your event and to meet tax and legal requirements.</li>
        <li><strong>Job applications</strong> that are not successful are deleted within 12 months, unless you ask us to keep them for future roles.</li>
      </ul>
    ),
  },
  {
    id: 'security',
    title: 'Keeping it safe',
    body: <p>We take reasonable steps to protect your personal data from loss, misuse and unauthorised access. No method of sending or storing data over the internet is completely secure, so we cannot guarantee absolute security.</p>,
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under the Digital Personal Data Protection Act, 2023, you have the right to:</p>
        <ul>
          <li>ask for a summary of the personal data we hold about you and how we use it</li>
          <li>ask us to correct, complete or update it</li>
          <li>ask us to erase it, unless we need to keep it by law</li>
          <li>withdraw your consent</li>
          <li>nominate someone to exercise these rights for you if you are unable to</li>
          <li>have your concerns heard and resolved</li>
        </ul>
        <p>To use any of these rights, or to raise a concern, email us at <Mail />. If you are not satisfied with our response, you can complain to the Data Protection Board of India.</p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: <p>Our website and services are meant for adults. We do not knowingly collect personal data from anyone under 18 without the consent of a parent or guardian.</p>,
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: <p>We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated at the top.</p>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>For any question about this policy or your personal data, contact:</p>
        <ContactBlock />
      </>
    ),
  },
]

const terms: Section[] = [
  {
    id: 'about',
    title: 'About these terms',
    body: <p>These terms apply to your use of leadlineproduction.com. By using the website, you agree to them. If you do not agree, please do not use the website.</p>,
  },
  {
    id: 'information',
    title: 'Website content',
    body: <p>This website describes our services and past work. Descriptions, photos, illustrations and the stage previews in the "What's your ask?" tool are for illustration only. They are not an offer or a guarantee of a particular result. Availability, pricing and what is included in your event are confirmed only in a written quotation from us.</p>,
  },
  {
    id: 'bookings',
    title: 'Enquiries and bookings',
    body: (
      <>
        <p>Sending us a message through WhatsApp, phone or email is an enquiry, not a booking. Please give us accurate information so we can respond properly.</p>
        <p>Every event we produce is covered by a separate written agreement or quotation. If that agreement differs from these terms, the agreement applies.</p>
      </>
    ),
  },
  {
    id: 'ip',
    title: 'Our content',
    body: <p>The text, logo, design, photos, videos and animations on this website belong to LeadLine Production or are used with permission. You may view and share links to our pages, but you may not copy, reproduce or use our content for commercial purposes without our written permission.</p>,
  },
  {
    id: 'use',
    title: 'Using the website',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the website for anything unlawful or misleading</li>
          <li>try to gain unauthorised access to the website or the systems behind it</li>
          <li>introduce viruses or other harmful code</li>
          <li>copy or scrape content from the website in bulk</li>
          <li>pretend to be LeadLine Production or our staff</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Other websites and services',
    body: <p>The website links to and uses services run by others, including WhatsApp and Google Maps. Their own terms and privacy policies apply when you use them. We are not responsible for their content or how they handle your information.</p>,
  },
  {
    id: 'accuracy',
    title: 'Accuracy',
    body: <p>We work to keep the website accurate and available, but we provide it "as is". We do not promise that it will always be complete, current or free of errors or interruptions.</p>,
  },
  {
    id: 'liability',
    title: 'Limit of liability',
    body: <p>To the extent the law allows, LeadLine Production is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits any liability that cannot be limited under the law of India. Our responsibilities for an event are set out in the agreement for that event.</p>,
  },
  {
    id: 'privacy',
    title: 'Your privacy',
    body: (
      <p>
        How we handle your personal data is explained in our <StageLink to="/privacy">Privacy Policy</StageLink>.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: <p>We may update these terms from time to time. The latest version will always be on this page, with the date it was last updated at the top.</p>,
  },
  {
    id: 'law',
    title: 'Governing law',
    body: <p>These terms are governed by the laws of India. Any dispute about them will be subject to the jurisdiction of the courts at Durgapur, West Bengal.</p>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>For any question about these terms, contact:</p>
        <ContactBlock />
      </>
    ),
  },
]

function LegalPage({ title, intro, sections, other }: { title: string; intro: string; sections: Section[]; other: { to: string; label: string } }) {
  useTitle(title)
  return (
    <div>
      <PageHero eyebrow="The fine print" title={title} intro={intro} />
      <section className="section">
        <div className="wrap legal-grid">
          <nav className="legal-toc" aria-label="On this page">
            <p className="mono">On this page</p>
            <ol>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToElement(`#${section.id}`)
                    }}
                  >
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span> {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="legal-body">
            <p className="mono legal-updated">Last updated: {UPDATED}</p>
            {sections.map((section, i) => (
              <section id={section.id} key={section.id} className="legal-section">
                <h2>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {section.body}
              </section>
            ))}
            <p className="legal-other">
              See also our <StageLink to={other.to}>{other.label}</StageLink>.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What personal data LeadLine Production collects through this website and your enquiries, and how we use and protect it."
      sections={privacy}
      other={{ to: '/terms', label: 'Terms of Service' }}
    />
  )
}

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      intro="The rules for using the LeadLine Production website."
      sections={terms}
      other={{ to: '/privacy', label: 'Privacy Policy' }}
    />
  )
}
