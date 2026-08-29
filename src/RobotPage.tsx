import { useEffect, useState } from 'react'
import './RobotPage.css'
import { PRODUCTS, type Product } from './products'

/*
 * RoboDine robot product page — shared layout for the whole robot range.
 *
 * Section order and layout mirror the Robint Rockit reference page 1:1:
 *   1  full-bleed hero (robot left, title + CTA right)
 *   2  intro paragraph + product video
 *   3  dual-screen design (dark band, two images)
 *   4  voice options (light band, robot over waveform + 3 audio cards)
 *   5  human recognition (full-bleed image, copy left)
 *   6  cruising advertising (full-bleed image, copy right)
 *   7  product features (3 titles | robot | 3 titles)
 *   8  high-accuracy obstacle avoidance (title + 3-image mosaic)
 *   9  multi-robot collaboration (title + single wide image)
 *  10  work-data stats (3 figures with divider rules)
 *  11  parameters (grey band, 2-column label/value rows)
 *
 * Content comes from products.ts — one entry per product, no per-product
 * component. Products without a voice feature (`voice: null`) skip section 4.
 *
 * Media is intentionally left as empty <Slot> placeholders — drop the real
 * assets in and swap each Slot for an <img>/<video>.
 *
 * Every spec value is TBD: replace with measured figures before publishing,
 * and do not ship a marketing claim you cannot evidence.
 */

const SALES_EMAIL = 'sales@robodinesolutions.com'

export default function RobotPage({ product }: { product: Product }) {
  const [voice, setVoice] = useState(product.voice?.voices[0].id ?? '')

  useEffect(() => {
    // The lead product is the homepage, so it keeps the site title from
    // index.html. Only the other products name themselves in the tab.
    document.title = product.slug
      ? `${product.title} — RoboDine Solutions`
      : 'RoboDine — Commercial service robots'
  }, [product])

  return (
    <div className="page rp">
      <RobotNav product={product} />

      {/* ── 1. hero ───────────────────────────────────────────── */}
      <section className="rp-phead" id="top">
        <Slot className="rp-phead-bg" label="Hero background — venue interior" />
        <div className="rp-phead-inner">
          <div className="rp-phead-robot">
            <Slot ratio="3 / 4" label={`Hero render — ${product.name}, three-quarter view`} />
          </div>
          <div className="rp-phead-intro">
            <h1>{product.title}</h1>
            <a className="rp-phead-btn" href={`mailto:${SALES_EMAIL}`}>Contact Us</a>
          </div>
        </div>
      </section>

      <main>
        {/* ── 2. intro + video ────────────────────────────────── */}
        <section className="rp-band">
          <div className="rp-inner">
            <p className="rp-intro">{product.intro}</p>
            <Slot ratio="16 / 9" label="Product video — a full service run, pass to table to clear-down" />
          </div>
        </section>

        {/* ── 3. dual-screen design ───────────────────────────── */}
        <section className="rp-band rp-band-dark">
          <div className="rp-inner">
            <div className="rp-tdi">
              <h2>{product.dualScreen.title}</h2>
              <p>{product.dualScreen.body}</p>
            </div>
            <div className="rp-imgs rp-imgs-2">
              <Slot ratio="4 / 3" label="Front view — rear display running a promotion" />
              <Slot ratio="4 / 3" label="Detail — top touch screen menu" />
            </div>
          </div>
        </section>

        {/* ── 4. voice options ────────────────────────────────── */}
        {product.voice && (
          <section className="rp-band">
            <div className="rp-inner">
              <div className="rp-tdi">
                <h2>{product.voice.title}</h2>
                <p>{product.voice.body}</p>
              </div>

              <div className="rp-audio-stage">
                <Slot className="rp-audio-wave" label="Waveform backdrop" />
                <div className="rp-audio-robot">
                  <Slot ratio="3 / 4" label={`Front render — ${product.name}`} />
                </div>
              </div>

              <div className="rp-audio-cards" role="radiogroup" aria-label="Voice profile">
                {product.voice.voices.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={voice === v.id}
                    className={'rp-audio-card' + (voice === v.id ? ' is-on' : '')}
                    onClick={() => setVoice(v.id)}
                  >
                    <span className="rp-audio-bar" aria-hidden="true">
                      {voice === v.id ? (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                          <rect x="6" y="5" width="4" height="14" rx="1.2" />
                          <rect x="14" y="5" width="4" height="14" rx="1.2" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                          <path d="M8 5.6v12.8a1 1 0 0 0 1.5.87l10.4-6.4a1 1 0 0 0 0-1.74L9.5 4.73A1 1 0 0 0 8 5.6z" />
                        </svg>
                      )}
                    </span>
                    <span className="rp-audio-name">{v.label}</span>
                    <span className="rp-audio-time">{v.length}</span>
                    <span className="rp-audio-note">{v.note}</span>
                  </button>
                ))}
              </div>
              <p className="rp-fine">
                Voice samples to be added — drop audio files in and wire them to these buttons.
              </p>
            </div>
          </section>
        )}

        {/* ── 5. human recognition ────────────────────────────── */}
        <section className="rp-fit">
          <Slot className="rp-fit-bg" label="Full-bleed — robot greeting a guest at a reception point" />
          <div className="rp-fit-copy rp-fit-left">
            <h2>{product.recognition.title}</h2>
            <p>{product.recognition.body}</p>
          </div>
        </section>

        {/* ── 6. cruising advertising ─────────────────────────── */}
        <section className="rp-fit">
          <Slot className="rp-fit-bg" label="Full-bleed — robot cruising a floor showing a promotion" />
          <div className="rp-fit-copy rp-fit-right">
            <h2>{product.cruising.title}</h2>
            <p>{product.cruising.body}</p>
          </div>
        </section>

        {/* ── 7. product features ─────────────────────────────── */}
        <section className="rp-band">
          <div className="rp-inner">
            <h2 className="rp-sec-title">Product Features</h2>
            <div className="rp-func">
              <div className="rp-func-col">
                {product.featuresLeft.map((f) => <FuncItem key={f.title} {...f} />)}
              </div>
              <div className="rp-func-img">
                <Slot ratio="3 / 4" label={`Front render — ${product.name}, full body`} />
              </div>
              <div className="rp-func-col">
                {product.featuresRight.map((f) => <FuncItem key={f.title} {...f} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. high-accuracy obstacle avoidance ─────────────── */}
        <section className="rp-band">
          <div className="rp-inner">
            <div className="rp-tdi">
              <h2>{product.avoidance.title}</h2>
                <p>{product.avoidance.body}</p>
            </div>
            <div className="rp-imgs rp-imgs-mosaic">
              <Slot className="rp-mosaic-a" ratio="16 / 9" label="Detail — front sensor array" />
              <Slot className="rp-mosaic-b" ratio="16 / 9" label="Detail — chassis lidar" />
              <Slot className="rp-mosaic-c" ratio="3 / 4" label="Three-quarter view — full body" />
            </div>
          </div>
        </section>

        {/* ── 9. multi-robot collaboration ────────────────────── */}
        <section className="rp-band">
          <div className="rp-inner">
            <div className="rp-tdi">
              <h2>{product.collaboration.title}</h2>
                <p>{product.collaboration.body}</p>
            </div>
            <div className="rp-imgs">
              <Slot ratio="16 / 8" label="Fleet animation — multiple units routing on one floor" />
            </div>
          </div>
        </section>

        {/* ── 10. work data ───────────────────────────────────── */}
        <section className="rp-band rp-band-tight">
          <div className="rp-inner">
            <div className="rp-workdata">
              {product.stats.map(([val, unit, cap]) => (
                <div key={cap} className="rp-workdata-item">
                  <div className="rp-workdata-val">
                    {val}
                    {unit && <span className="rp-workdata-unit">{unit}</span>}
                  </div>
                  <span className="rp-workdata-rule" aria-hidden="true" />
                  <div className="rp-workdata-cap">{cap}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. parameters ──────────────────────────────────── */}
        <section id="rp-specs" className="rp-band rp-band-grey">
          <div className="rp-inner">
            <h2 className="rp-sec-title">Parameters</h2>
            <div className="rp-params">
              {product.specs.map(([k, v]) => (
                <div key={k} className="rp-param">
                  <div className="rp-param-label">{k}</div>
                  <div className={'rp-param-val' + (v.includes('TBD') ? ' is-tbd' : '')}>{v}</div>
                </div>
              ))}
            </div>
            <p className="rp-fine">
              Figures marked TBD are placeholders pending final engineering sign-off.
            </p>
          </div>
        </section>
      </main>

      <footer className="rp-foot">
        <div className="rp-foot-rule" aria-hidden="true" />
        <div className="rp-foot-inner">
          <div className="rp-foot-brand">RoboDine Solutions</div>
          <div className="rp-foot-cols">
            <div className="rp-foot-col">
              <h3>Products</h3>
              {PRODUCTS.map((p) => (
                <a key={p.slug || 'host'} href={p.slug ? `/${p.slug}` : '/'}>
                  {p.navLabel}
                </a>
              ))}
            </div>
            <div className="rp-foot-col">
              <h3>Contact</h3>
              <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>
            </div>
          </div>
          <div className="rp-foot-bottom">© 2026 RoboDine Solutions</div>
        </div>
      </footer>
    </div>
  )
}

function FuncItem({ title, body }: { title: string; body: string }) {
  return (
    <article className="rp-func-item">
      <h3>
        <span className="rp-func-dash" aria-hidden="true" />
        {title}
      </h3>
      <p>{body}</p>
    </article>
  )
}

/* Product-page nav — RoboDine's own nav, with a dropdown for the robot range. */
function RobotNav({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="/">
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
          <div
            className={'rp-menu' + (open ? ' is-open' : '')}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              className="rp-menu-btn"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
            >
              Robots
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div className="rp-menu-drop" role="menu">
              {PRODUCTS.map((p) => {
                const href = p.slug ? `/${p.slug}` : '/'
                const current = p.slug === product.slug
                return (
                  <a
                    key={p.slug || 'host'}
                    role="menuitem"
                    href={href}
                    className={current ? 'is-current' : undefined}
                    aria-current={current ? 'page' : undefined}
                  >
                    {p.navLabel}
                  </a>
                )
              })}
            </div>
          </div>

          <a href="#rp-specs">Specs</a>
        </nav>

        <div className="nav-right" style={{ marginLeft: 'auto' }}>
          <a className="btn btn-dark nav-cta" href={`mailto:${SALES_EMAIL}`}>
            Talk to sales
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

/* Image placeholder — swap for <img src={...} /> when the asset exists. */
function Slot({
  ratio,
  label,
  className,
}: {
  ratio?: string
  label: string
  className?: string
}) {
  return (
    <div
      className={'rp-slot' + (className ? ' ' + className : '')}
      style={ratio ? { aspectRatio: ratio } : undefined}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M4.5 18l4.7-5 3.3 3.4 2.6-2.4 4.4 4" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
