// All site content lives here, so copy and photos can change without touching layouts.
// To swap a placeholder for a real photo, give the item an `image`/`src` path.

export const contact = {
  phones: ['+91 7557885442', '+91 7810962073'],
  email: 'leadlineproduction@gmail.com',
  whatsapp: '7810962073',
  place: 'Durgapur, West Bengal, India',
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`

export type Service = {
  slug: string
  name: string
  channel: string
  summary: string
  items: string[]
  gels: [string, string]
  image?: string
  slotLabel: string
}

export const services: Service[] = [
  {
    slug: 'corporate-events',
    name: 'Corporate Events & Conferences',
    channel: 'Corporate',
    summary:
      'Professional planning and execution for product launches, corporate seminars, team-building activities, and company galas that inspire and engage your stakeholders.',
    items: ['Product launches', 'Corporate seminars', 'Team-building activities', 'Company galas'],
    gels: ['#3b9dff', '#dcecff'],
    image: '/media/corporate.jpg',
    slotLabel: 'Corporate event, wide shot of stage and audience',
  },
  {
    slug: 'wedding-planning',
    name: 'Wedding Planning & Design',
    channel: 'Weddings',
    summary:
      'From intimate ceremonies to grand destination weddings, we create your perfect day with meticulous attention to every detail, turning your dreams into lasting memories.',
    items: ['Intimate ceremonies', 'Grand destination weddings', 'Wedding design', 'Every detail of the day'],
    gels: ['#ff9a2e', '#e8326f'],
    image: '/media/wedding.jpg',
    slotLabel: 'Wedding, mandap or couple on stage',
  },
  {
    slug: 'political-events',
    name: 'Political Events & Government Affairs',
    channel: 'Political',
    summary:
      'Expert coordination of political conferences, diplomatic receptions, policy forums, government meetings, and official events requiring the highest level of professionalism and protocol.',
    items: ['Political conferences', 'Diplomatic receptions', 'Policy forums', 'Government meetings', 'Official events'],
    gels: ['#ff7a3d', '#3b9dff'],
    image: '/media/political.jpg',
    slotLabel: 'Political conference, stage and seated audience',
  },
  {
    slug: 'concert-production',
    name: 'Concert & Festival Production',
    channel: 'Concerts',
    summary:
      'Full-scale production management for music festivals, live concerts, artist showcases, and cultural events, ensuring flawless execution from concept to curtain call.',
    items: ['Music festivals', 'Live concerts', 'Artist showcases', 'Cultural events'],
    gels: ['#e02bff', '#2f8fff'],
    image: '/media/concert.jpg',
    slotLabel: 'Concert, crowd and full stage lighting',
  },
  {
    slug: 'trade-shows',
    name: 'Trade Shows & Exhibitions',
    channel: 'Expos',
    summary:
      'Strategic booth design, expo coordination, and attendee engagement strategies for B2B events, product showcases, and industry conventions that drive results.',
    items: ['Booth design', 'Expo coordination', 'Attendee engagement', 'Product showcases', 'Industry conventions'],
    gels: ['#27d7b0', '#3b9dff'],
    image: '/media/exhibition.jpg',
    slotLabel: 'Exhibition booth with visitors',
  },
  {
    slug: 'social-galas',
    name: 'Social Galas & Celebrations',
    channel: 'Galas',
    summary:
      'Elegant planning for charity galas, milestone celebrations, fundraising dinners, and award ceremonies that leave lasting impressions on your guests.',
    items: ['Charity galas', 'Milestone celebrations', 'Fundraising dinners', 'Award ceremonies'],
    gels: ['#ffc24a', '#ff5e7e'],
    image: '/media/social.jpg',
    slotLabel: 'Gala or celebration, guests in the room',
  },
]

export type SceneKey = 'wedding' | 'corporate' | 'concert' | 'political' | 'trade' | 'gala'

export const askEvents: { key: SceneKey; label: string; phrase: string }[] = [
  { key: 'wedding', label: 'Wedding', phrase: 'wedding' },
  { key: 'corporate', label: 'Corporate', phrase: 'corporate event' },
  { key: 'concert', label: 'Concert', phrase: 'concert' },
  { key: 'political', label: 'Political', phrase: 'political conference' },
  { key: 'trade', label: 'Trade show', phrase: 'trade show' },
  { key: 'gala', label: 'Gala', phrase: 'gala' },
]

export const askGuests: { label: string; heads: number }[] = [
  { label: '50', heads: 14 },
  { label: '150', heads: 30 },
  { label: '300', heads: 48 },
  { label: '500', heads: 68 },
  { label: '1000+', heads: 96 },
]

export const askMoods: { key: string; label: string; article: string; gels: [string, string]; tempo: string }[] = [
  { key: 'royal', label: 'Royal', article: 'A royal', gels: ['#ff8a1f', '#d6246e'], tempo: '7s' },
  { key: 'elegant', label: 'Elegant', article: 'An elegant', gels: ['#ffd9a8', '#f29bb2'], tempo: '9s' },
  { key: 'electric', label: 'Electric', article: 'An electric', gels: ['#2f8fff', '#e02bff'], tempo: '2.6s' },
  { key: 'sleek', label: 'Sleek', article: 'A sleek', gels: ['#7fc4ff', '#ffffff'], tempo: '6s' },
]

// Draft wording, to be confirmed against how LeadLine really runs a project.
export const cues = [
  { title: 'The ask', text: 'You tell us the occasion, the guests and the feeling you want in the room.' },
  { title: 'The design', text: 'We turn that into a concept: staging, lighting, decor and the flow of the event.' },
  { title: 'The plan', text: 'Venues, vendors, logistics and permissions are lined up into one schedule.' },
  { title: 'The show', text: 'Our crew runs the day cue by cue, so you can stay in the moment.' },
  { title: 'Curtain call', text: 'We wrap the venue, close out vendors and hand you the memories.' },
]

export const testimonials = [
  {
    quote:
      "LeadLine Production executed our annual corporate conference flawlessly. From logistics to entertainment, every detail was perfect. Truly 'Your Ask Is Our Task'!",
    who: 'KAA Ventures',
  },
  {
    quote:
      "Our wedding was everything we dreamed of and more! LeadLine Production handled every detail with grace and creativity. We couldn't have asked for a better team.",
    who: 'Sourab & Payel',
  },
  {
    quote:
      'LeadLine Production managed our political summit with exceptional professionalism and diplomatic sensitivity. They understand protocol and deliver excellence.',
    who: 'Government Affairs Executive',
  },
]

export const workItems: { category: string; label: string; src?: string; alt?: string }[] = [
  { category: 'Weddings', label: 'Wedding photo', src: '/media/wedding.jpg', alt: 'Bride and groom under a floral mandap' },
  { category: 'Concerts', label: 'Concert photo', src: '/media/concert.jpg', alt: 'Crowd facing a large lit concert stage' },
  { category: 'Political', label: 'Political photo', src: '/media/political.jpg', alt: 'Political conference stage with large screens above a seated audience' },
  { category: 'Corporate', label: 'Corporate photo', src: '/media/corporate.jpg', alt: 'Speaker on a conference stage above seated guests' },
  { category: 'Galas', label: 'Gala photo', src: '/media/social.jpg', alt: 'Models on a runway under bright stage lights' },
  { category: 'Expos', label: 'Exhibition photo', src: '/media/exhibition.jpg', alt: 'Visitors at an exhibition booth' },
  { category: 'Weddings', label: 'Wedding, decor close-up' },
  { category: 'Corporate', label: 'Corporate, audience reaction' },
  { category: 'Concerts', label: 'Concert, artist on stage' },
  { category: 'Galas', label: 'Gala, dinner tables' },
  { category: 'Expos', label: 'Exhibition, product showcase' },
  { category: 'Political', label: 'Political, stage and podium' },
]
