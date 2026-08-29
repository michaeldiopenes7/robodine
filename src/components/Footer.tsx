import type { Product } from '../products'

/* Site footer — gradient rule, product and contact columns. */
export default function Footer({ product, salesEmail }: { product: Product; salesEmail: string }) {
  return (
    <footer className="rp-foot">
      <div className="rp-foot-rule" aria-hidden="true" />
      <div className="rp-foot-inner">
        <div className="rp-foot-brand">RoboDine Solutions</div>
        <div className="rp-foot-cols">
          <div className="rp-foot-col">
            <h3>Products</h3>
            <a href="/">{product.navLabel}</a>
          </div>
          <div className="rp-foot-col">
            <h3>Contact</h3>
            <a href={`mailto:${salesEmail}`}>{salesEmail}</a>
          </div>
        </div>
        <div className="rp-foot-bottom">© 2026 RoboDine Solutions</div>
      </div>
    </footer>
  )
}
