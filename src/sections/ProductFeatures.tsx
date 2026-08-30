import Band from '../components/Band'
import type { Feature, Product } from '../products'
import productFeatures from '../assets/product-features.png'

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
          <img
            src={productFeatures}
            alt={`${product.name} service robot, full body front view`}
            width={670}
            height={790}
          />
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
