import { useState } from 'react'
import type { Product } from '../products'

/*
 * Site nav — RoboDine Solutions brand, product links, sales CTA.
 *
 * Below 880px the links and inline CTA give way to a hamburger, and the
 * same links reappear in a dropdown that fuses to the bottom of the nav
 * pill. Those states are styled in App.css alongside the rest of the nav.
 */
export default function Nav({ product, salesEmail }: { product: Product; salesEmail: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <header className="nav">
      <div className={'nav-inner' + (menuOpen ? ' is-open' : '')}>
        <a className="brand" href="/" onClick={close}>
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
          <a href="/" aria-current={product.slug ? undefined : 'page'}>
            {product.navLabel}
          </a>
          <a href="#rp-specs">Specs</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-right">
          <a className="btn btn-dark nav-cta" href={`mailto:${salesEmail}`}>
            Talk to sales
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <nav
          id="mobile-menu"
          className={'nav-drop' + (menuOpen ? ' is-open' : '')}
          aria-hidden={!menuOpen}
        >
          <a href="/" onClick={close} tabIndex={menuOpen ? 0 : -1}>{product.navLabel}</a>
          <a href="#rp-specs" onClick={close} tabIndex={menuOpen ? 0 : -1}>Specs</a>
          <a href="#contact" onClick={close} tabIndex={menuOpen ? 0 : -1}>Contact</a>
          <a
            className="btn btn-dark nav-drop-cta"
            href={`mailto:${salesEmail}`}
            onClick={close}
            tabIndex={menuOpen ? 0 : -1}
          >
            Talk to sales
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  )
}
