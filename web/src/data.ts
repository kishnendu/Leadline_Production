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
  gallery?: { src: string; alt: string }[]
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
    gallery: [
      { src: '/media/work/corporate-banquet.jpg', alt: 'Banquet hall set with blue and orange table settings' },
      { src: '/media/work/corporate-conference.jpg', alt: 'Conference stage with panel speakers and a seated audience' },
      { src: '/media/work/awards-night.jpg', alt: 'Corporate awards night with lit tables and a stage screen' },
    ],
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
    gallery: [
      { src: '/media/work/wedding-floral-walkway.jpg', alt: 'Floral wedding walkway under pink flower canopies' },
      { src: '/media/work/wedding-lantern-walkway.jpg', alt: 'Candlelit wedding walkway with hanging lanterns' },
      { src: '/media/work/wedding-stage.jpg', alt: 'Wedding stage with a red and gold floral backdrop' },
      { src: '/media/work/wedding-night-mandap.jpg', alt: 'White floral mandap lit up at night' },
      { src: '/media/work/wedding-mehendi-lounge.jpg', alt: 'Colourful mehendi lounge with a pink floral backdrop' },
      { src: '/media/work/wedding-photography.jpg', alt: 'Photographer at work in a red and white decorated wedding venue' },
    ],
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
    gallery: [
      { src: '/media/work/concert-lights.jpg', alt: 'Crowd with hands raised under purple concert lights' },
      { src: '/media/work/concert-crowd.jpg', alt: 'Packed outdoor crowd facing a lit concert stage' },
      { src: '/media/work/concert-night-stage.jpg', alt: 'Outdoor concert stage lit up at night' },
      { src: '/media/work/college-fest.jpg', alt: 'Large crowd at an outdoor college fest' },
      { src: '/media/work/comedy-show.jpg', alt: 'Comedian performing on a lit stage for a seated audience' },
    ],
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
    gallery: [
      { src: '/media/work/gala-dance.jpg', alt: 'Dancers performing on a gala stage under purple lights' },
      { src: '/media/work/awards-night.jpg', alt: 'Awards night dinner with lit tables and a stage screen' },
      { src: '/media/birthday/magician.jpg', alt: 'Magician performing at a jungle-themed birthday' },
      { src: '/media/birthday/backdrop.jpg', alt: 'Jungle-themed birthday backdrop with balloon arches' },
    ],
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
  // The first six cover one service each and appear on the home page
  { category: 'Weddings', label: 'Wedding mandap', src: '/media/wedding.jpg', alt: 'Bride and groom under a floral mandap' },
  { category: 'Concerts', label: 'Concert stage', src: '/media/concert.jpg', alt: 'Crowd facing a large lit concert stage' },
  { category: 'Political', label: 'Political conference', src: '/media/political.jpg', alt: 'Political conference stage with large screens above a seated audience' },
  { category: 'Corporate', label: 'Corporate summit', src: '/media/corporate.jpg', alt: 'Speaker on a conference stage above seated guests' },
  { category: 'Galas', label: 'Fashion gala', src: '/media/social.jpg', alt: 'Models on a runway under bright stage lights' },
  { category: 'Expos', label: 'Exhibition booth', src: '/media/exhibition.jpg', alt: 'Visitors at an exhibition booth' },
  { category: 'Weddings', label: 'Floral walkway', src: '/media/work/wedding-floral-walkway.jpg', alt: 'Floral wedding walkway under pink flower canopies' },
  { category: 'Concerts', label: 'Night concert', src: '/media/work/concert-night-stage.jpg', alt: 'Outdoor concert stage lit up at night' },
  { category: 'Corporate', label: 'Banquet setup', src: '/media/work/corporate-banquet.jpg', alt: 'Banquet hall set with blue and orange table settings' },
  { category: 'Galas', label: 'Stage performance', src: '/media/work/gala-dance.jpg', alt: 'Dancers performing on a gala stage under purple lights' },
  { category: 'Weddings', label: 'Lantern walkway', src: '/media/work/wedding-lantern-walkway.jpg', alt: 'Candlelit wedding walkway with hanging lanterns' },
  { category: 'Concerts', label: 'Concert crowd', src: '/media/work/concert-lights.jpg', alt: 'Crowd with hands raised under purple concert lights' },
  { category: 'Corporate', label: 'Conference', src: '/media/work/corporate-conference.jpg', alt: 'Conference stage with panel speakers and a seated audience' },
  { category: 'Galas', label: 'Awards night', src: '/media/work/awards-night.jpg', alt: 'Awards night dinner with lit tables and a stage screen' },
  { category: 'Weddings', label: 'Wedding stage', src: '/media/work/wedding-stage.jpg', alt: 'Wedding stage with a red and gold floral backdrop' },
  { category: 'Concerts', label: 'Outdoor crowd', src: '/media/work/concert-crowd.jpg', alt: 'Packed outdoor crowd facing a lit concert stage' },
  { category: 'Weddings', label: 'Night mandap', src: '/media/work/wedding-night-mandap.jpg', alt: 'White floral mandap lit up at night' },
  { category: 'Concerts', label: 'College fest', src: '/media/work/college-fest.jpg', alt: 'Large crowd at an outdoor college fest' },
  { category: 'Weddings', label: 'Mehendi lounge', src: '/media/work/wedding-mehendi-lounge.jpg', alt: 'Colourful mehendi lounge with a pink floral backdrop' },
  { category: 'Concerts', label: 'Comedy show', src: '/media/work/comedy-show.jpg', alt: 'Comedian performing on a lit stage for a seated audience' },
  { category: 'Weddings', label: 'Wedding shoot', src: '/media/work/wedding-photography.jpg', alt: 'Photographer at work in a red and white decorated wedding venue' },
  { category: 'Galas', label: 'Birthday magic show', src: '/media/birthday/magician.jpg', alt: 'Magician performing at a jungle-themed birthday' },
  { category: 'Galas', label: 'Birthday cake', src: '/media/birthday/cake.jpg', alt: 'Flower-decorated birthday cake' },
]

// Recent work case studies. Add new events to the top of this list.
export type Clip = { src: string; poster: string; title: string; caption: string; rotate?: 90 }
export type RecentWork = {
  slug: string
  title: string
  kicker: string
  tags: string[]
  summary: string
  cover: string
  coverAlt: string
  highlight: Clip & { heading: string; text: string }
  delivered: string[]
  moments: Clip[]
  photos: { src: string; alt: string; tall?: boolean }[]
  crew: { src: string; alt: string }
  whatsappText: string
}

const B = '/media/birthday'

export const recentWorks: RecentWork[] = [
  {
    slug: 'jungle-safari-birthday',
    title: 'Jungle Safari 5th Birthday',
    kicker: 'Recent work · Birthday celebration',
    tags: ['Birthday', 'Jungle theme', 'Live magic show'],
    summary:
      'A jungle-themed 5th birthday, produced end to end: themed decor and balloon arches, a custom backdrop, a lit entrance, a host on stage and a live magic show that had every child on their feet.',
    cover: `${B}/backdrop.jpg`,
    coverAlt: 'Jungle-themed birthday backdrop with balloon arches and a LeadLine Production banner',
    highlight: {
      src: `${B}/magic-show.mp4`,
      poster: `${B}/magic-show-poster.jpg`,
      title: 'The magic show',
      caption: 'Live magic show on stage',
      heading: 'The highlight: a live magic show.',
      text: 'The magician brought the kids up on stage and turned the party into a show. Turn the sound on and see the reactions for yourself.',
    },
    delivered: [
      'Jungle-themed decor and balloon arches',
      'Custom photo backdrop',
      'Lit entrance and red carpet',
      'Stage, lighting and LED props',
      'Cake-cutting setup',
      'Host on stage',
      'Live magic show',
    ],
    moments: [
      { src: `${B}/arrival.mp4`, poster: `${B}/arrival-poster.jpg`, title: 'The arrival', caption: 'From the lit entrance, down the red carpet', rotate: 90 },
      { src: `${B}/decor-2.mp4`, poster: `${B}/decor-2-poster.jpg`, title: 'The stage', caption: 'Jungle stage and balloon arches' },
      { src: `${B}/host.mp4`, poster: `${B}/host-poster.jpg`, title: 'The host', caption: 'Opening the show on stage' },
      { src: `${B}/cake.mp4`, poster: `${B}/cake-poster.jpg`, title: 'The cake', caption: 'Cake cutting with the family' },
      { src: `${B}/decor-1.mp4`, poster: `${B}/decor-1-poster.jpg`, title: 'The details', caption: 'Themed props around the hall' },
    ],
    photos: [
      { src: `${B}/magician.jpg`, alt: 'Magician in a top hat performing beside a lit number 5', tall: true },
      { src: `${B}/cake.jpg`, alt: 'Birthday cake decorated with flowers and jungle animals' },
      { src: `${B}/setup.jpg`, alt: 'Crew member checking the stage setup before guests arrive', tall: true },
      { src: `${B}/backdrop.jpg`, alt: 'Custom jungle backdrop with balloon arches' },
    ],
    crew: { src: `${B}/crew.jpg`, alt: 'The LeadLine Production crew standing in front of the birthday backdrop' },
    whatsappText: "Hi LeadLine Production! I saw the Jungle Safari birthday on your website. I'd like to plan a birthday party.",
  },
]
