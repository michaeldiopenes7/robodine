import Band from '../components/Band'
import Slot from '../components/Slot'
import type { Feature, Product } from '../products'

/* 7. Product features — three items, centred robot, three items. */
export default function ProductFeatures({ product }: { product: Product }) {
  return (
    <Band>
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
    </Band>
  )
}

function FuncItem({ title, body }: Feature) {
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
