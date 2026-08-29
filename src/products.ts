/*
 * RoboDine robot product catalogue.
 *
 * The catalogue behind the product pages. A page renders through the shared
 * RobotPage layout (which mirrors the reference section order), so adding a
 * product later means adding an entry here — no new component.
 *
 * Parameters and work-data figures are matched to the reference page.
 * Confirm every one against your own hardware and fleet telemetry before
 * publishing — do not ship a claim you cannot evidence.
 */

export type Feature = { title: string; body: string }
export type Voice = { id: string; label: string; length: string; note: string }
export type Spec = [label: string, value: string]
export type Stat = [value: string, unit: string, caption: string]

export type Product = {
  slug: string          // route: /robot/<slug>  ('' → /robot)
  navLabel: string      // label in the nav dropdown
  name: string          // product name, used in headings
  title: string         // hero H1
  tagline: string       // <title> / meta description
  intro: string
  dualScreen: { title: string; body: string }
  voice: { title: string; body: string; voices: Voice[] } | null
  recognition: { title: string; body: string }
  cruising: { title: string; body: string }
  featuresLeft: Feature[]
  featuresRight: Feature[]
  avoidance: { title: string; body: string }
  collaboration: { title: string; body: string }
  stats: Stat[]
  specs: Spec[]
}

const VOICES: Voice[] = [
  { id: 'child',     label: 'Child',     length: '10"', note: 'Bright and playful — family venues and events.' },
  { id: 'adult',     label: 'Adult',     length: '10"', note: 'Warm and unhurried — casual dining and cafés.' },
  { id: 'concierge', label: 'Concierge', length: '10"', note: 'Short and precise — hotels, clinics, offices.' },
]

/* Specs shared in shape across the range; values differ per product once measured. */
/* Reference-page parameters, matched 1:1. These are measured hardware
   figures — confirm each against your own units before publishing. */
const BASE_SPECS: Spec[] = [
  ['Product size', '520 * 510 * 930 mm'],
  ['Capacity of cabin', '40 L'],
  ['Product weight', '55 kg'],
  ['Load', '50 kg'],
  ['Ramp angle', '< 10°'],
  ['Obstacle height', '< 10 mm'],
  ['Operation screen', '10.1-inch touch screen'],
  ['Display screen', '24-inch high-definition screen'],
  ['Battery Specifications', '24 V 30 Ah'],
  ['Speed', 'Autonomous speed change within the range of 0 ~ 1.2 m/s'],
  ['Battery life', '6 ~ 8 hours'],
  ['Operating temperature', '0°C ~ 40°C'],
]

/* Reference-page work-data figures, matched 1:1. Replace with your own
   fleet telemetry before publishing — these describe another deployment. */
const BASE_STATS: Stat[] = [
  ['1826',  '',    'The monthly amount of tasks performed by one service robot'],
  ['9130',  'min', 'The monthly time for delivery tasks performed by one service robot'],
  ['152.1', 'h',   'The monthly manual service hours saved by one service robot'],
]

const AVOIDANCE = {
  title: 'High-accuracy obstacle avoidance',
  body:
    '360° stereo perception through multi-sensor fusion: TBD sets of ultrasonic radar front and rear, ' +
    'a ToF camera on the front of the chassis, and lidar at the join between the chassis and the body.',
}

const COLLABORATION = {
  title: 'Multi-robot collaboration',
  body:
    'For large venues and multi-floor sites, collaboration between multiple robots further improves ' +
    'the efficiency of delivery and guidance. One map, one job queue, no two units meeting head-on.',
}

export const PRODUCTS: Product[] = [
  {
    slug: '',
    navLabel: 'Service robot',
    name: 'Host',
    title: 'Service Robot',
    tagline: 'front-of-house service robot',
    intro:
      'Host pairs serious engineering with a shape guests warm to on sight — clean, compact and ' +
      'approachable rather than industrial. It earns the name “commercial service robot” in both ' +
      'settings at once: it delivers and collects items, leads guests to a table or a room, and ' +
      'works a banquet floor, while photo capture, automatic hospitality and voice interaction give ' +
      'people a reason to engage with it rather than step around it.',
    dualScreen: {
      title: 'Simple dual-screen design',
      body:
        'A dual-screen design pairs a 10.1-inch top touch screen with a 24-inch rear high-definition ' +
        'display. Set event pictures, video and other files against cruising tasks to get promotion ' +
        'out of every trip the robot makes.',
    },
    voice: {
      title: 'One-click switch of TBD+ voice options',
      body:
        'Host offers a range of voices — from bright and playful to calm and formal — so each venue ' +
        'can set the tone it considers proper, and change it per shift.',
      voices: VOICES,
    },
    recognition: {
      title: 'Say hello to visitors by human recognition',
      body:
        'Set reception points at the front desk or anywhere indoors and Host identifies an approaching ' +
        'guest automatically, then opens with a greeting instead of waiting to be tapped.',
    },
    cruising: {
      title: 'Cruising for advertising',
      body:
        'Customise the cruising route for off-peak delivery hours and put the rear display to work as ' +
        'an advertising surface — dessert menu, happy hour, tomorrow’s special — instead of parking ' +
        'the robot in a corner.',
    },
    featuresLeft: [
      { title: 'Room service', body: 'By scanning a QR code, the robot can be asked to deliver items to — or collect items from — any location on the property.' },
      { title: 'Self-assisted lift travel', body: 'The lift control system talks to the building directly, so one robot covers every floor without a person to press the button.' },
      { title: 'Autonomous obstacle avoidance', body: 'Multiple sensors update the optimal path in real time, reading both static and moving obstacles along the planned route.' },
    ],
    featuresRight: [
      { title: 'Entertainment and interaction', body: 'Voice interaction, LED strip control and photo capture make it a service robot guests actually want to approach.' },
      { title: 'Ring microphone array', body: 'A multi-channel ring array with built-in speaker lets the robot hold a conversation and answer questions about its surroundings.' },
      { title: 'Reinforced chassis', body: 'Tested over carpet and thresholds, the chassis climbs inclines up to 10° and obstacles up to 10 mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

]
