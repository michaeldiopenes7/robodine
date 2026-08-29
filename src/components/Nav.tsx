import type { Product } from '../products'

/* Site nav — RoboDine Solutions brand, product links, sales CTA. */
export default function Nav({ product, salesEmail }: { product: Product; salesEmail: string }) {
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
          <a href="/" aria-current={product.slug ? undefined : 'page'}>
            {product.navLabel}
          </a>
          <a href="#rp-specs">Specs</a>
          <a href="#contact">Contact</a>
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
