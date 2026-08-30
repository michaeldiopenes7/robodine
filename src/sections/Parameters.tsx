import Band from '../components/Band'
import type { Product } from '../products'

/*
 * 11. Parameters — the spec table.
 *
 * Laid out as cards on a three-column grid rather than stacked rows: the
 * previous version put every label above its value with generous padding,
 * which made twelve specs run far taller than the content warranted.
 */
export default function Parameters({ product }: { product: Product }) {
  return (
    <Band tone="grey" id="rp-specs">
      <h2 className="rp-sec-title">Parameters</h2>
      <dl className="rp-params">
        {product.specs.map(([label, value]) => (
          <div key={label} className="rp-param">
            <dt className="rp-param-label">{label}</dt>
            <dd className="rp-param-val">{value}</dd>
          </div>
        ))}
      </dl>
    </Band>
  )
}
