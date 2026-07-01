import { useEffect, useRef, useState } from 'react'
import './App.css'
import kioskHero from './assets/kiosk-hero.png'
import serveDetail from './assets/serve-detail.png'

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

export default function App() {
  useScrollReveal()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

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
            {/* image container — drop a venue / kiosk photo in here */}
            <div className="prob-media reveal" data-image-slot>
              {/* Insert image here */}
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
            body="The kiosk watches its own stock and temperature, reorders before a flavor runs dry, runs a hygiene cycle between rushes, and reports faults to one dashboard before they become downtime."
            chips={['Predictive restock', 'Self-sanitizing', 'Fault self-report']}
          />
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
                <a className="social" href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                  </svg>
                </a>
                <a className="social" href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
                  </svg>
                </a>
                <a className="social" href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
                  </svg>
                </a>
                <a className="social" href="#" aria-label="X">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="cta-right">
              <h2>Get a kiosk in your venue.</h2>
              <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                <input className="cta-input" type="email" placeholder="Your work email" aria-label="Your work email" required />
                <button className="btn cta-submit" type="submit">Request a demo</button>
              </form>
              <p className="cta-fine">
                By requesting a demo you agree to our <a href="#">Terms of use</a>.
              </p>
            </div>
          </div>
        </div>

        {/* footer link columns */}
        <div className="foot-links stagger">
          <FootCol title="Product" links={['How it works', 'Economics', 'The machine', 'Dashboard']} />
          <FootCol title="Company" links={['About', 'Contact']} />
          <FootCol title="Deploy" links={['Venues', 'Pricing', 'Brochure']} />
          <FootCol title="Legal" links={['Terms', 'Privacy', 'NSF cert', 'Status']} />
        </div>

        <div className="foot-bottom">
          <span className="dim">© 2026 RoboDine Solutions</span>
          <span className="dim">sales@robodinesolutions.com</span>
        </div>
      </footer>
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

function FootCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="foot-col reveal">
      <h4 className="mono">{title}</h4>
      <ul>{links.map((l) => <li key={l}><a href="#top">{l}</a></li>)}</ul>
    </div>
  )
}
