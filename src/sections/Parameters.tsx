import Band from '../components/Band'
import type { Product } from '../products'

/* 11. Parameters — grey band, two-column label/value rows. */
export default function Parameters({ product }: { product: Product }) {
  return (
    <Band tone="grey" id="rp-specs">
      <h2 className="rp-sec-title">Parameters</h2>
      <div className="rp-params">
        {product.specs.map(([label, value]) => (
          <div key={label} className="rp-param">
            <div className="rp-param-label">{label}</div>
            <div className="rp-param-val">{value}</div>
          </div>
        ))}
      </div>
    </Band>
  )
}
