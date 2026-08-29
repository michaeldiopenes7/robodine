import { useState } from 'react'
import { PRODUCTS, type Product } from '../products'

/* Site nav — RoboDine Solutions brand, with a dropdown for the robot range. */
export default function Nav({ product, salesEmail }: { product: Product; salesEmail: string }) {
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
                const current = p.slug === product.slug
                return (
                  <a
                    key={p.slug || 'lead'}
                    role="menuitem"
                    href={p.slug ? `/${p.slug}` : '/'}
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
          <a className="btn btn-dark nav-cta" href={`mailto:${salesEmail}`}>
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
