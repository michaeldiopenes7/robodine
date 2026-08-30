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
  heroLead: string      // one line under the hero H1
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
  { id: 'child', label: 'Child', length: '6"', note: 'Bright and playful — family venues and events.' },
  { id: 'men',   label: 'Men',   length: '4"', note: 'Warm and assured — hotels, offices and clinics.' },
  { id: 'miss',  label: 'Miss',  length: '5"', note: 'Light and welcoming — dining rooms and receptions.' },
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
  ['1826',  '',    'The monthly amount of tasks performed by a hotel service robot'],
  ['9130',  'min', 'The monthly time for delivery tasks performed by a hotel service robot'],
  ['152.1', 'h',   'The monthly manual service hours saved by a hotel service robot'],
]

const AVOIDANCE = {
  title: 'High-accuracy obstacle avoidance',
  body:
    '360° stereo perception are secured through multi-sensor fusion technology, 5 sets of ultrasonic ' +
    'radars built in the front and rear of the robot, the ToF Camera on the front of the chassis, and ' +
    'the lidar on the connection between the chassis and the main body part.',
}

const COLLABORATION = {
  title: 'Multi-robot collaboration',
  body:
    'For large hotels/office buildings, the collaboration between multiple robots can further improve ' +
    'the efficiency of delivery and guidance.',
}

export const PRODUCTS: Product[] = [
  {
    slug: '',
    navLabel: 'Service robot',
    name: 'Rockit',
    title: 'Hotel Service Robot',
    tagline: 'hotel service robot',
    heroLead:
      'Delivery, guidance and reception for hotels, offices and venues. ' +
      'It works the floor on its own, all day.',
    intro:
      'Rockit combines elements of technology, simplicity and fashion and is eye-catching for its ' +
      'cool and cute appearance. It redefines the concept “commercial service robot” by having its ' +
      'values truly realized in both commercial and service scenarios. It provides you with various ' +
      'services such as item delivery and pick up, intelligent way leading and banquet reception, ' +
      'and has interactive functions including photo taking, automatic hospitality service and ' +
      'voice interaction.',
    dualScreen: {
      title: 'Simple dual-screen design',
      body:
        'A new dual-screen design is provided, consisting of a 10.1-inch top touch screen and a ' +
        '24-inch rear high-definition display. You can set event pictures, videos and other files ' +
        'for cruising tasks to achieve better promotion effects.',
    },
    voice: {
      title: 'One-click switch of 20+ voice options',
      body:
        'Rockit offers more than 20 voice options ranging from the cute voice of kids, attractive ' +
        'voice of men, and innocent voice of little girls to allow hotels to set the type they ' +
        'consider as proper.',
      voices: VOICES,
    },
    recognition: {
      title: 'Say hello to visitors by human recognition technology',
      body:
        'You can set up reception points at the front desk or anywhere indoors to automatically ' +
        'identify human bodies and to attract customers.',
    },
    cruising: {
      title: 'Cruising for advertising',
      body:
        'The cruising route can be customized for the off-peak hours of delivery, with the rear ' +
        'large screen used as an advertising tool to achieve promotion effects.',
    },
    featuresLeft: [
      { title: 'Room service', body: 'By scanning a QR code, the robot can be asked to deliver items to or pick up items from any location in hotels.' },
      { title: 'Self-assisted elevator taking', body: 'The elevator control system developed by RoboDine supports cross-floor operations anytime and anywhere.' },
      { title: 'Autonomous obstacle avoidance', body: 'Multiple sensors allow the update of optimal path in real time by sensing the static or dynamic obstacles in planned paths.' },
    ],
    featuresRight: [
      { title: 'Entertainment and interaction', body: 'Interactive functions such as voice interaction, LED strip light control and photographing are available to make the product a commercial service robot in the real sense.' },
      { title: 'Ring-shaped microphone array', body: '6-channel ring-shaped microphone array with built-in high-frequency speaker, allows the robot to have conversation with users and provide them with professional information about their surrounding environment.' },
      { title: 'Reinforced chassis', body: 'After 500+ tests, the robot is now able to climb over carpets inclined up to an angle of 10° and obstacles as high as 25mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

]
