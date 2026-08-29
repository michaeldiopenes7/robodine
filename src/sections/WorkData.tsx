import Band from '../components/Band'
import type { Product } from '../products'

/* 10. Work data — three figures, each with a divider rule under the value. */
export default function WorkData({ product }: { product: Product }) {
  return (
    <Band tight>
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
    </Band>
  )
}
