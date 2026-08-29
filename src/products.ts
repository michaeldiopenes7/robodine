/*
 * RoboDine robot product catalogue.
 *
 * One entry per product page. Every page renders through the shared
 * RobotPage layout (which mirrors the Robint reference section order),
 * so adding a product means adding an entry here — no new component.
 *
 * All spec values and figures are TBD placeholders: replace with measured
 * numbers before publishing, and do not ship a claim you cannot evidence.
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
const BASE_SPECS: Spec[] = [
  ['Product size', 'TBD × TBD × TBD mm'],
  ['Capacity of cabin', 'TBD L'],
  ['Product weight', 'TBD kg'],
  ['Load', 'TBD kg'],
  ['Ramp angle', '< TBD°'],
  ['Obstacle height', '< TBD mm'],
  ['Operation screen', 'TBD-inch touch screen'],
  ['Display screen', 'TBD-inch high-definition screen'],
  ['Battery specifications', 'TBD V TBD Ah'],
  ['Speed', 'Autonomous speed change within the range of 0 ~ TBD m/s'],
  ['Battery life', 'TBD ~ TBD hours'],
  ['Operating temperature', 'TBD°C ~ TBD°C'],
]

const BASE_STATS: Stat[] = [
  ['TBD', '',    'The monthly amount of tasks performed by one robot'],
  ['TBD', 'min', 'The monthly time spent on tasks by one robot'],
  ['TBD', 'h',   'The monthly manual service hours saved by one robot'],
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
  /* ── 1. Host — front of house (the page already built) ─────────── */
  {
    slug: '',
    navLabel: 'Host service robot',
    name: 'Host',
    title: 'Service Robot',
    tagline: 'front-of-house service robot',
    intro:
      'Host combines technology, simplicity and a design guests warm to on sight. It earns the name ' +
      '“commercial service robot” in both commercial and service settings — running plates and parcels, ' +
      'leading guests to a table or a room, and working a banquet floor — with interactive functions ' +
      'including photo capture, automatic hospitality and voice interaction.',
    dualScreen: {
      title: 'Simple dual-screen design',
      body:
        'A dual-screen design pairs a TBD-inch top touch screen with a TBD-inch rear high-definition ' +
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
      { title: 'Reinforced chassis', body: 'Tested over carpet and thresholds, the chassis climbs inclines up to TBD° and obstacles up to TBD mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

  /* ── 2. Food delivery ──────────────────────────────────────────── */
  {
    slug: 'food',
    navLabel: 'Food delivery robot',
    name: 'Runner',
    title: 'Food Delivery Robot',
    tagline: 'multi-tray food running for dining rooms',
    intro:
      'Runner carries plates and drinks from the pass to the table across a full dining room. Stacked ' +
      'trays let one trip serve several tables, and a stabilised chassis keeps a full glass upright ' +
      'through turns, thresholds and a busy service corridor.',
    dualScreen: {
      title: 'Tray display and guest display',
      body:
        'A TBD-inch panel faces your staff at the pass with the table number and load for each tray. ' +
        'A second display faces the guest on arrival, confirming what belongs to which seat.',
    },
    voice: {
      title: 'One-click switch of TBD+ voice options',
      body:
        'Runner announces arrivals in the tone the room calls for — quiet and short in a fine-dining ' +
        'room, bright and warm in a family restaurant.',
      voices: VOICES,
    },
    recognition: {
      title: 'Finds the table, not just the coordinates',
      body:
        'Table markers let Runner confirm it has reached the right seat before it invites the guest ' +
        'to unload, so a moved chair or a re-laid floor plan does not send the order to table nine.',
    },
    cruising: {
      title: 'Cruising for advertising',
      body:
        'Between service runs, Runner works the floor with your promotions on the rear display — ' +
        'dessert menu, specials, tomorrow’s event — instead of returning to a charging bay.',
    },
    featuresLeft: [
      { title: 'Multi-tray delivery', body: 'TBD tray levels let a single run serve several tables, cutting trips between the pass and the floor.' },
      { title: 'Stabilised transport', body: 'Suspension and acceleration limits hold full glasses and plated dishes level through turns and thresholds.' },
      { title: 'Clear-down runs', body: 'The same trays return dirty plates to the wash, so the trip back from a table is never empty.' },
    ],
    featuresRight: [
      { title: 'Pass-side call button', body: 'Kitchen staff load a tray, tap the table and send — no tablet, no app, no training session.' },
      { title: 'Narrow-aisle navigation', body: 'A slim footprint and tight turning circle suit dining rooms laid out for people rather than robots.' },
      { title: 'Reinforced chassis', body: 'Tested over carpet and thresholds, the chassis climbs inclines up to TBD° and obstacles up to TBD mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

  /* ── 3. Reception ──────────────────────────────────────────────── */
  {
    slug: 'reception',
    navLabel: 'Reception service robot',
    name: 'Greeter',
    title: 'Reception Service Robot',
    tagline: 'greeting, wayfinding and check-in support',
    intro:
      'Greeter meets people at the door. It recognises an approaching visitor, opens with a greeting, ' +
      'answers the question they came in with, and walks them to the room, desk or department they ' +
      'need — so your front desk handles the work that actually needs a person.',
    dualScreen: {
      title: 'A screen to read, a screen to touch',
      body:
        'A TBD-inch face panel carries the greeting and wayfinding prompts at eye level, while a ' +
        'TBD-inch touch panel takes directory searches, check-in details and language selection.',
    },
    voice: {
      title: 'One-click switch of TBD+ voice options',
      body:
        'Set the voice to match the lobby — measured and formal for a corporate reception, warmer and ' +
        'slower for a clinic or a residential building.',
      voices: VOICES,
    },
    recognition: {
      title: 'Say hello to visitors by human recognition',
      body:
        'Set reception points at the front desk or anywhere indoors and Greeter identifies an ' +
        'approaching visitor automatically, then opens with a greeting instead of waiting to be tapped.',
    },
    cruising: {
      title: 'Cruising for advertising',
      body:
        'Outside arrival peaks, Greeter patrols a set route showing building notices, event schedules ' +
        'and promotions on the rear display.',
    },
    featuresLeft: [
      { title: 'Guest wayfinding', body: 'Leads a visitor to the room, desk or department by name, at a walking pace they can follow.' },
      { title: 'Directory search', body: 'On-screen search covers people, departments and rooms, in any language you load.' },
      { title: 'Check-in support', body: 'Collects visitor details and notifies the host, so arrivals do not queue at an unstaffed desk.' },
    ],
    featuresRight: [
      { title: 'Entertainment and interaction', body: 'Voice interaction, LED strip control and photo capture make it a robot visitors approach rather than avoid.' },
      { title: 'Ring microphone array', body: 'A multi-channel ring array with built-in speaker holds a conversation over normal lobby noise.' },
      { title: 'Self-assisted lift travel', body: 'The lift control system talks to the building directly, so a walk-through can cross floors.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

  /* ── 4. Hospital delivery ──────────────────────────────────────── */
  {
    slug: 'hospital',
    navLabel: 'Hospital delivery robot',
    name: 'Medic',
    title: 'Hospital Delivery Robot',
    tagline: 'secure internal transport for clinical sites',
    intro:
      'Medic moves specimens, medication, linen and case notes between departments so clinical staff ' +
      'stay with patients. Compartments lock and log every trip, and the chassis is finished for the ' +
      'cleaning regime a clinical corridor demands.',
    dualScreen: {
      title: 'Status at a glance, detail on touch',
      body:
        'A TBD-inch panel shows the current job and destination to anyone in the corridor. A TBD-inch ' +
        'touch screen handles authentication, compartment release and the trip log.',
    },
    voice: null,
    recognition: {
      title: 'Releases to the right hands',
      body:
        'Compartments open on staff badge or PIN, and every release is written to the trip log with a ' +
        'time and an identity — so a controlled item is accounted for end to end.',
    },
    cruising: {
      title: 'Scheduled rounds',
      body:
        'Set recurring routes for routine collections — pharmacy, pathology, linen — and Medic runs ' +
        'them on the clock without a request being raised each time.',
    },
    featuresLeft: [
      { title: 'Lockable compartments', body: 'TBD separate lockable bays keep specimens, medication and notes segregated on the same trip.' },
      { title: 'Chain-of-custody log', body: 'Every load, release and handover is time-stamped against an identity for audit.' },
      { title: 'Self-assisted lift travel', body: 'The lift control system talks to the building directly, so one unit covers every floor.' },
    ],
    featuresRight: [
      { title: 'Cleanable surfaces', body: 'Sealed seams and wipe-down panels suit the cleaning products used on a clinical corridor.' },
      { title: 'Priority routing', body: 'Urgent jobs pre-empt routine rounds, and the queue reorders itself without a dispatcher.' },
      { title: 'Reinforced chassis', body: 'Tested over thresholds and lift gaps, the chassis climbs inclines up to TBD° and obstacles up to TBD mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

  /* ── 5. Floor cleaning ─────────────────────────────────────────── */
  {
    slug: 'cleaning',
    navLabel: 'Floor cleaning robot',
    name: 'Sweep',
    title: 'Commercial Floor Cleaning Robot',
    tagline: 'scrubbing and sweeping for commercial floors',
    intro:
      'Sweep scrubs, sweeps and dries commercial floors on a schedule you set. It maps the site once, ' +
      'then works the same route nightly — covering the open floor so your cleaning team spends its ' +
      'hours on detail work a machine cannot do.',
    dualScreen: {
      title: 'Job status and route control',
      body:
        'A TBD-inch touch screen carries route selection, water and brush settings, and the progress ' +
        'of the current job. A second display shows a cleaning-in-progress notice to the public.',
    },
    voice: null,
    recognition: {
      title: 'Works around people, not through them',
      body:
        'Sweep detects people ahead and slows, re-routes or holds, so a night shift can run while ' +
        'staff and the occasional guest are still moving through the space.',
    },
    cruising: {
      title: 'Scheduled cleaning runs',
      body:
        'Set routes and times per zone and Sweep starts itself, works the schedule and returns to ' +
        'dock — reporting coverage and water use for each run.',
    },
    featuresLeft: [
      { title: 'Scrub, sweep and dry', body: 'A combined head washes, brushes and dries in one pass, leaving a floor ready to walk on.' },
      { title: 'Zone scheduling', body: 'Different areas, different times and settings — set once and left to run.' },
      { title: 'Coverage reporting', body: 'Each run reports area covered, water used and any section skipped, with a reason.' },
    ],
    featuresRight: [
      { title: 'Self-docking and refill', body: 'Returns to dock to charge and empty, then resumes the route where it stopped.' },
      { title: 'Edge and corner work', body: 'Side brushes carry the clean into edges and around fixed obstacles.' },
      { title: 'Reinforced chassis', body: 'Tested over thresholds and floor transitions, the chassis climbs inclines up to TBD° and obstacles up to TBD mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },

  /* ── 6. Walking assistant ──────────────────────────────────────── */
  {
    slug: 'assistant',
    navLabel: 'Walking assistant robot',
    name: 'Steady',
    title: 'Intelligent Walking Assistant Robot',
    tagline: 'mobility support for care and rehabilitation',
    intro:
      'Steady supports people who need a hand to walk. It holds a matched pace, takes weight through ' +
      'a stable frame, and calls for help if the person it is walking with stops or falls — extending ' +
      'the independence of a resident without tying up a carer for every corridor.',
    dualScreen: {
      title: 'Simple to the user, detailed to the carer',
      body:
        'A large-type TBD-inch screen shows the user only what they need — direction, distance, a call ' +
        'button. Carers see session detail and alert history on the TBD-inch panel.',
    },
    voice: {
      title: 'One-click switch of TBD+ voice options',
      body:
        'Set a calm, clear voice at a volume and pace suited to the user, with prompts kept short and ' +
        'consistent between sessions.',
      voices: VOICES,
    },
    recognition: {
      title: 'Keeps pace with the person',
      body:
        'Steady reads gait and distance continuously, matching the user’s pace rather than pulling ' +
        'them along, and stopping the moment they do.',
    },
    cruising: {
      title: 'Guided routes',
      body:
        'Save common routes — room to dining hall, ward to therapy — so a walk can be started with a ' +
        'single tap and followed without a carer navigating.',
    },
    featuresLeft: [
      { title: 'Weight-bearing frame', body: 'A stable frame takes up to TBD kg of support load through handles set at an adjustable height.' },
      { title: 'Pace matching', body: 'Continuous gait sensing holds the robot at the user’s speed, on the level and on a slope.' },
      { title: 'Fall detection', body: 'A sudden loss of contact or posture raises an alert to the nurse call system immediately.' },
    ],
    featuresRight: [
      { title: 'Session records', body: 'Distance, duration and support load are logged per session for review by clinical staff.' },
      { title: 'Assisted standing', body: 'Powered handles support the sit-to-stand transition at the start and end of a walk.' },
      { title: 'Reinforced chassis', body: 'Tested over thresholds and ramps, the chassis handles inclines up to TBD° and obstacles up to TBD mm.' },
    ],
    avoidance: AVOIDANCE,
    collaboration: COLLABORATION,
    stats: BASE_STATS,
    specs: BASE_SPECS,
  },
]

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
