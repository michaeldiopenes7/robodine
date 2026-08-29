import Slot from '../components/Slot'
import type { Product } from '../products'

/* 1. Hero — full-bleed backdrop, robot left, title + CTA right. */
export default function Hero({ product, salesEmail }: { product: Product; salesEmail: string }) {
  return (
    <section className="rp-phead" id="top">
      <Slot className="rp-phead-bg" label="Hero background — venue interior" />
      <div className="rp-phead-inner">
        <div className="rp-phead-robot">
          <Slot ratio="3 / 4" label={`Hero render — ${product.name}, three-quarter view`} />
        </div>
        <div className="rp-phead-intro">
          <h1>{product.title}</h1>
          <a className="rp-phead-btn" href={`mailto:${salesEmail}`}>Contact Us</a>
        </div>
      </div>
    </section>
  )
}
