import { useEffect, useState } from 'react'
import './App.css'
import './RobotPage.css'
import RobotPage from './RobotPage'
import { PRODUCTS } from './products'

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

  // The service robot is the site, so every remaining path resolves to it.
  // Older /robot links are rewritten to `/` so anything already shared
  // keeps working and does not sit on a duplicate URL.
  if (path === '/robot' || path.startsWith('/robot/')) {
    window.history.replaceState({}, '', '/')
  }

  return <RobotPage product={PRODUCTS[0]} />
}

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
