import { useEffect, useRef, useState } from 'react'
import './App.css'
import kioskHero from './assets/kiosk-hero.png'
import serveDetail from './assets/serve-detail.png'
import stallKiosk from './assets/stall-kiosk.png'

/* Reveal elements marked with `.reveal` as they scroll into view. */
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const SALES_EMAIL = 'sales@robodinesolutions.com'

/* ───────── minimal client-side routing (no dependency) ───────── */
function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    window.addEventListener('robodine:navigate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('robodine:navigate', onPop)
    }
  }, [])
  return path
}

function navigate(to: string) {
  if (window.location.pathname === to) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new Event('robodine:navigate'))
  window.scrollTo(0, 0)
}

/* Intercept in-app link clicks so they route without a full page reload. */
function RouteLink({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}

export default function App() {
  const path = usePath()
  if (path === '/terms') return <LegalPage page="terms" />
  if (path === '/privacy') return <LegalPage page="privacy" />
  return <Landing />
}

function Landing() {
  useScrollReveal()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // lead form — native multi-field form; on submit we compose a pre-filled
  // mailto so the enquiry reaches sales without a backend (frontend-only for now).
  const [lead, setLead] = useState({
    name: '',
    email: '',
    venue: '',
    type: 'Shopping mall',
    footfall: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')

  const setField = (key: keyof typeof lead) => (value: string) => {
    setLead((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
    if (formStatus === 'sent') setFormStatus('idle')
  }

  const onLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!lead.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!lead.venue.trim()) next.venue = 'Please tell us the venue or location.'

    if (Object.keys(next).length) {
      setErrors(next)
      return
    }

    setErrors({})
    setFormStatus('sent')

    const subject = encodeURIComponent(`Demo request — ${lead.venue.trim()}`)
    const body = encodeURIComponent(
      [
        'Hi RoboDine team,',
        '',
        "I'd like to request a demo kiosk. Details:",
        '',
        `Name: ${lead.name.trim()}`,
        `Email: ${lead.email.trim()}`,
        `Venue / location: ${lead.venue.trim()}`,
        `Venue type: ${lead.type}`,
        lead.footfall.trim() ? `Approx. daily footfall: ${lead.footfall.trim()}` : '',
        '',
        lead.message.trim() ? `Message:\n${lead.message.trim()}` : '',
        '',
        '(Sent from robodinesolutions.com)',
      ]
        .filter((line) => line !== null)
        .join('\n'),
    )
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`
  }

  // close the mobile menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="page">
      {/* announcement top bar */}
      <div className="banner">
        Now deploying across malls &amp; transit hubs in Singapore, KL, and Manila.
        <a href="#deploy"> See open sites →</a>
      </div>

      {/* nav — tailkits-style floating pill, sticky page-wide */}
      <header className="nav">
        <div ref={navRef} className={'nav-inner' + (menuOpen ? ' is-open' : '')}>
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="3" width="16" height="18" rx="3" />
                <circle cx="12" cy="9" r="2.4" />
                <path d="M8 15h8" />
              </svg>
            </span>
            RoboDine Solutions
          </a>

          <span className="nav-divider" aria-hidden="true" />

          <nav className="nav-links">
            <a href="#problem">How it works</a>
            <a href="#numbers">Economics</a>
            <a href="#service">The machine</a>
            <a href="#deploy">Deploy</a>
          </nav>

          <div className="nav-right">
            <a className="btn btn-dark nav-cta" href="#deploy">
              Get a Kiosk
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* mobile hamburger — toggles the dropdown below */}
            <button
              type="button"
              className="nav-burger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>

          {/* mobile dropdown — section links, then the CTA as the last item */}
          <nav id="mobile-menu" className="nav-drop" aria-hidden={!menuOpen}>
            <a href="#problem" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>How it works</a>
            <a href="#numbers" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>Economics</a>
            <a href="#service" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>The machine</a>
            <a href="#deploy" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>Deploy</a>
            <a className="btn btn-dark nav-drop-cta" href="#deploy" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              Get a Kiosk
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* gradient hero region */}
      <div className="topwrap">
        <main id="top">
          {/* ───────── HERO ───────── */}
          <section className="hero">
            <div className="hero-copy reveal">
              <div className="hero-badges">
                <span className="hero-badge">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  NSF Certified
                </span>
                <span className="hero-badge">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="4" y="3" width="16" height="18" rx="3" />
                    <circle cx="12" cy="9" r="2.2" />
                    <path d="M8 15h8" />
                  </svg>
                  Fully Autonomous
                </span>
              </div>
              <h1>
                Tired of Staffed
                <br /> Stalls? Try a Kiosk
                <br /> That Runs Itself
              </h1>
              <p className="hero-sub">
                A robotic ice-cream kiosk that scoops, sells, and restocks on its own —
                14 hours a day with no one behind the counter.
              </p>
              <div className="hero-actions">
                <a className="btn btn-ghost-light" href="#problem">See it in action</a>
                <a className="btn btn-dark nav-cta" href="#deploy">
                  Deploy a Kiosk
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* kiosk render */}
            <div className="hero-stage reveal reveal-delay-1">
              <div className="hero-media-slot">
                <img src={kioskHero} alt="RoboDine autonomous ice-cream kiosk" />
              </div>
            </div>
          </section>
        </main>
      </div>

      <main>
        {/* ───────── STATS (cyan band) ───────── */}
        <section id="numbers" className="numbers">
          <div className="stat-band stagger">
            <Stat big="8 sec" cap="Avg. serve time" />
            <Stat big="99.8%" cap="Uptime SLA" />
            <Stat big="50+" cap="Flavor options" />
            <Stat big="24/7" cap="Autonomous ops" />
          </div>
        </section>

        {/* ───────── PROBLEM (image + stat rows) ───────── */}
        <section id="problem" className="problem">
          <div className="prob-head reveal">
            <h2>A dessert stall costs a salary<br />and closes at 9.</h2>
            <p className="prob-lede">
              A manned ice-cream counter needs staff, a fixed shift, and still misses
              the late crowd. RoboDine runs the same spot with no one behind it — so
              the numbers that used to cap one location simply go away.
            </p>
          </div>

          <div className="prob-grid">
            {/* venue / kiosk photo */}
            <div className="prob-media reveal">
              <img src={stallKiosk} alt="A RoboDine autonomous ice-cream kiosk standing unattended on a sidewalk" />
            </div>

            {/* stat rows: cyan stat card + dark description */}
            <div className="prob-rows stagger">
              <ProbRow
                big="2–3"
                cap="Staff per shift"
                desc="A counter needs people on rotation. RoboDine serves on its own — no salary behind it."
              />
              <ProbRow
                big="9pm"
                cap="Manned closing time"
                desc="Staff go home before the late crowd. The kiosk runs 14 hours, no shift to fill."
              />
              <ProbRow
                big="22 sec"
                cap="Every single serve"
                desc="No queue, no off-day. The same cone to order, and it restocks itself before a flavor runs dry."
              />
            </div>
          </div>
        </section>

        {/* ───────── SERVICE PANELS [01]/[02] ───────── */}
        <section id="service" className="service">
          <div className="svc-head reveal">
            <h2>Built to run unattended.</h2>
          </div>

          <ServicePanel
            n="01"
            title="It serves"
            tint="cyan"
            image={serveDetail}
            body="A six-axis arm pulls from twelve chilled wells and scoops to order — single, double, cup or cone. Customers tap, pay, and watch it build behind the glass."
            chips={['12 flavor wells', 'Card · wallet · QR', 'Multi-language']}
          />
          <ServicePanel
            n="02"
            title="It runs itself"
            tint="mint"
            flip
            image={kioskHero}
            body="The kiosk watches its own stock and temperature, reorders before a flavor runs dry, runs a hygiene cycle between rushes, and reports faults to one dashboard before they become downtime."
            chips={['Predictive restock', 'Self-sanitizing', 'Fault self-report']}
          />
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="faq">
          <div className="faq-head reveal">
            <h2>What venue operators ask us.</h2>
          </div>
          <div className="faq-grid stagger">
            <FaqItem
              q="Who owns and maintains the kiosk?"
              a="RoboDine owns and services the hardware. You provide the floor space and power; we handle installation, restocking logistics, and remote monitoring. Faults are flagged to our dashboard before they become downtime."
            />
            <FaqItem
              q="What does a site need to host one?"
              a="A footprint of roughly 2m², a standard power outlet, and a network connection (the kiosk can fall back to cellular). We run a site survey before install to confirm fit."
            />
            <FaqItem
              q="How does pricing work?"
              a="We work on a revenue-share or fixed-lease model depending on venue footfall. There's no upfront hardware cost on the revenue-share plan. Request a demo and we'll scope numbers to your location."
            />
            <FaqItem
              q="How long until a kiosk is live?"
              a="From signed agreement to a serving kiosk is typically a few weeks — site survey, install, and a supervised soft-launch before it runs unattended."
            />
            <FaqItem
              q="Is it food-safe and hygienic?"
              a="The serving path is enclosed behind glass and runs an automated sanitizing cycle between rushes. We build to local food-safety requirements for each market we operate in."
            />
            <FaqItem
              q="What happens if it breaks down?"
              a="The kiosk self-reports faults in real time. Most issues are resolved remotely; anything hardware-related is handled by our field team under the service agreement."
            />
          </div>
        </section>

      </main>

      {/* ───────── FOOTER (cyan CTA + link columns) ───────── */}
      <footer className="footer" id="deploy">
        {/* CTA cyan band — top of the footer */}
        <div className="cta-band reveal">
          <div className="cta-band-inner">
            <div className="cta-left">
              <a className="cta-brand" href="#top">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="3" width="16" height="18" rx="3" />
                    <circle cx="12" cy="9" r="2.4" />
                    <path d="M8 15h8" />
                  </svg>
                </span>
                RoboDine Solutions
              </a>
              <p className="cta-blurb">
                Put dessert where the footfall is. Tell us the venue and we'll have a
                demo kiosk on-site in weeks — not quarters.
              </p>
              <div className="cta-socials">
                <a className="social" href={`mailto:${SALES_EMAIL}`} aria-label="Email sales">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </a>
                <a className="social" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                  </svg>
                </a>
                <a className="social" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
                  </svg>
                </a>
                <a className="social" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
                  </svg>
                </a>
                <a className="social" href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="cta-right">
              <h2>Get a kiosk in your venue.</h2>
              <p className="cta-lede">
                Tell us about your site and we'll come back with a demo plan and numbers.
              </p>

              {formStatus === 'sent' ? (
                <div className="lead-done" role="status">
                  <span className="lead-done-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <h3>Thanks, {lead.name.trim().split(' ')[0] || 'there'} — almost done.</h3>
                    <p>
                      Your email app should have opened with the details pre-filled — just hit send.
                      If it didn't, email us directly at{' '}
                      <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>.
                    </p>
                  </div>
                </div>
              ) : (
                <form className="lead-form" onSubmit={onLeadSubmit} noValidate>
                  <div className="lead-row">
                    <Field
                      id="lead-name"
                      label="Your name"
                      value={lead.name}
                      onChange={setField('name')}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <Field
                      id="lead-email"
                      label="Work email"
                      type="email"
                      value={lead.email}
                      onChange={setField('email')}
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>

                  <div className="lead-row">
                    <Field
                      id="lead-venue"
                      label="Venue / location"
                      value={lead.venue}
                      onChange={setField('venue')}
                      error={errors.venue}
                      placeholder="e.g. Orchard Central, Singapore"
                    />
                    <Select
                      id="lead-type"
                      label="Venue type"
                      value={lead.type}
                      onChange={setField('type')}
                      options={[
                        'Shopping mall',
                        'Transit hub',
                        'Airport',
                        'Office / campus',
                        'Entertainment / leisure',
                        'Other',
                      ]}
                    />
                  </div>

                  <div className="lead-row">
                    <Field
                      id="lead-footfall"
                      label="Approx. daily footfall"
                      value={lead.footfall}
                      onChange={setField('footfall')}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="lead-field">
                    <label htmlFor="lead-message">Anything else?</label>
                    <textarea
                      id="lead-message"
                      className="lead-input lead-textarea"
                      rows={3}
                      value={lead.message}
                      onChange={(e) => setField('message')(e.target.value)}
                      placeholder="Optional — timeline, questions, etc."
                    />
                  </div>

                  <button className="btn cta-submit lead-submit" type="submit">
                    Request a demo
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>

                  <p className="cta-fine">
                    By requesting a demo you agree to our <RouteLink to="/terms">Terms of use</RouteLink> and{' '}
                    <RouteLink to="/privacy">Privacy Policy</RouteLink>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* footer link columns */}
        <div className="foot-links stagger">
          <FootCol
            title="Product"
            links={[
              { label: 'How it works', href: '#problem' },
              { label: 'Economics', href: '#numbers' },
              { label: 'The machine', href: '#service' },
              { label: 'FAQ', href: '#faq' },
            ]}
          />
          <FootCol
            title="Company"
            links={[
              { label: 'About', href: '#problem' },
              { label: 'Contact', href: `mailto:${SALES_EMAIL}` },
            ]}
          />
          <FootCol
            title="Deploy"
            links={[
              { label: 'Get a kiosk', href: '#deploy' },
              { label: 'FAQ', href: '#faq' },
            ]}
          />
          <FootCol
            title="Legal"
            links={[
              { label: 'Terms', href: '/terms' },
              { label: 'Privacy', href: '/privacy' },
            ]}
          />
        </div>

        <div className="foot-bottom">
          <span className="dim">© 2026 RoboDine Solutions</span>
          <span className="dim"><a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a></span>
        </div>
      </footer>
    </div>
  )
}

/* ───────── legal pages (/terms, /privacy) ───────── */
function LegalPage({ page }: { page: 'terms' | 'privacy' }) {
  useEffect(() => {
    document.title =
      page === 'terms'
        ? 'Terms of Use — RoboDine Solutions'
        : 'Privacy Policy — RoboDine Solutions'
  }, [page])

  return (
    <div className="page legal-page">
      <header className="nav">
        <div className="nav-inner">
          <RouteLink to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="3" width="16" height="18" rx="3" />
                <circle cx="12" cy="9" r="2.4" />
                <path d="M8 15h8" />
              </svg>
            </span>
            RoboDine Solutions
          </RouteLink>
          <div className="nav-right" style={{ marginLeft: 'auto' }}>
            <RouteLink to="/" className="btn btn-dark nav-cta">
              Back to site
            </RouteLink>
          </div>
        </div>
      </header>

      <main className="legal-doc">
        {page === 'terms' ? (
          <article>
            <span className="eyebrow">Legal</span>
            <h1>Terms of Use</h1>
            <p className="dim legal-meta">Last updated 14 July 2026</p>
            <p>
              These terms govern your use of the RoboDine Solutions website. By requesting a demo
              or otherwise contacting us, you agree that the information you submit may be used to
              respond to your enquiry and follow up about our products.
            </p>
            <p>
              The figures and product descriptions on this site are provided for general
              information and may change as we deploy across markets. Any specific commercial terms
              — pricing, service levels, and deployment timelines — are set out in a separate signed
              agreement, which takes precedence over anything stated here.
            </p>
            <p>
              We may update these terms from time to time. Continued use of the site after changes
              are posted constitutes acceptance of the revised terms.
            </p>
            <p>
              Questions about these terms? Email{' '}
              <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>.
            </p>
            <p className="dim legal-note">
              This is a plain-language summary and not a substitute for legal advice — have it
              reviewed by counsel before relying on it commercially.
            </p>
            <p className="legal-cross">
              See also our <RouteLink to="/privacy">Privacy Policy</RouteLink>.
            </p>
          </article>
        ) : (
          <article>
            <span className="eyebrow">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="dim legal-meta">Last updated 14 July 2026</p>
            <p>
              When you submit your email through the demo request form, we collect that address to
              respond to your enquiry and to contact you about deploying a kiosk. We do not sell
              your personal data.
            </p>
            <p>
              We operate across Singapore, Malaysia, and the Philippines and handle personal data in
              line with applicable data-protection laws, including the Singapore PDPA. You may
              request access to, correction of, or deletion of the personal data we hold about you
              by emailing <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>.
            </p>
            <p>
              We retain enquiry data only for as long as needed to respond and to maintain a record
              of our correspondence, after which it is deleted.
            </p>
            <p className="dim legal-note">
              This is a plain-language summary and not a substitute for legal advice — have it
              reviewed by counsel before relying on it commercially.
            </p>
            <p className="legal-cross">
              See also our <RouteLink to="/terms">Terms of Use</RouteLink>.
            </p>
          </article>
        )}
      </main>

      <div className="foot-bottom legal-foot">
        <span className="dim">© 2026 RoboDine Solutions</span>
        <span className="dim"><a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a></span>
      </div>
    </div>
  )
}

/* ───────── small presentational helpers ───────── */

function Stat({ big, cap }: { big: string; cap: string }) {
  return (
    <div className="stat reveal">
      <div className="stat-big">{big}</div>
      <div className="stat-cap">{cap}</div>
    </div>
  )
}

function ProbRow({ big, cap, desc }: { big: string; cap: string; desc: string }) {
  return (
    <div className="prob-row reveal">
      <div className="prob-stat">
        <div className="prob-stat-big">{big}</div>
        <div className="prob-stat-cap">{cap}</div>
      </div>
      <div className="prob-desc">
        <p>{desc}</p>
      </div>
    </div>
  )
}

function ServicePanel({
  n, title, body, chips, tint, flip, image,
}: { n: string; title: string; body: string; chips: string[]; tint: 'cyan' | 'mint'; flip?: boolean; image?: string }) {
  return (
    <div className={'svc-panel reveal' + (flip ? ' flip' : '') + ' tint-' + tint}>
      <div className="svc-text">
        <span className="svc-n mono">[{n}]</span>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="svc-chips">
          {chips.map((c) => <span className="chip" key={c}>{c}</span>)}
        </div>
      </div>
      <div className={'svc-visual' + (image ? ' has-image' : '')} aria-hidden="true">
        {image ? (
          <img className="svc-img" src={image} alt="" />
        ) : (
          /* visual/mock removed for now — empty placeholder container */
          null
        )}
      </div>
    </div>
  )
}

/* custom dropdown — our own menu UI, not the device-native picker */
function Select({
  id, label, value, options, onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)))
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const choose = (opt: string) => {
    onChange(opt)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) { setOpen(true); return }
      setActive((i) => {
        const next = e.key === 'ArrowDown' ? i + 1 : i - 1
        return (next + options.length) % options.length
      })
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open) choose(options[active])
      else setOpen(true)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="lead-field" ref={wrapRef}>
      <label id={`${id}-label`}>{label}</label>
      <div className="select">
        <button
          type="button"
          id={id}
          className={'lead-input select-trigger' + (open ? ' is-open' : '')}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onKeyDown}
        >
          <span>{value}</span>
          <svg className="select-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul className="select-menu" role="listbox" aria-labelledby={`${id}-label`}>
            {options.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={opt === value}
                className={
                  'select-option' +
                  (opt === value ? ' is-selected' : '') +
                  (i === active ? ' is-active' : '')
                }
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(opt)}
              >
                {opt}
                {opt === value && (
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Field({
  id, label, value, onChange, error, type = 'text', placeholder, autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div className="lead-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="lead-input"
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="lead-err" id={`${id}-err`} role="alert">{error}</span>}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item reveal">
      <summary>
        <span>{q}</span>
        <svg className="faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <p>{a}</p>
    </details>
  )
}

function FootCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="foot-col reveal">
      <h4 className="mono">{title}</h4>
      <ul>{links.map((l) => (
        <li key={l.label}>
          {l.href.startsWith('/')
            ? <RouteLink to={l.href}>{l.label}</RouteLink>
            : <a href={l.href}>{l.label}</a>}
        </li>
      ))}</ul>
    </div>
  )
}
