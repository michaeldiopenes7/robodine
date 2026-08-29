import Slot from '../components/Slot'
import type { Product } from '../products'

/*
 * 1. Hero — marble colonnade backdrop, robot left, title and CTA right.
 *
 * DROP THE ASSETS IN:
 *   src/assets/hero-robot.png     robot cutout, transparent background
 *   src/assets/hero-backdrop.jpg  marble colonnade
 *
 * Then uncomment the two imports and swap each <Slot> for the <img>
 * beside it. The styles for both are already in place.
 */

// import robot from '../assets/hero-robot.png'
// import backdrop from '../assets/hero-backdrop.jpg'

export default function Hero({ product }: { product: Product }) {
  return (
    <section className="rp-phead" id="top">
      {/* <img className="rp-phead-bg" src={backdrop} alt="" aria-hidden="true" /> */}
      <Slot className="rp-phead-bg" label="Hero background — marble colonnade" />

      <div className="rp-phead-inner">
        <div className="rp-phead-robot">
          {/*
          <img
            src={robot}
            alt={`${product.name} service robot, front view`}
            width={720}
            height={936}
          />
          */}
          <Slot ratio="3 / 4" label={`Hero render — ${product.name}, front view`} />
        </div>

        <div className="rp-phead-intro">
          <h1>{product.title}</h1>
          <a className="rp-phead-btn" href="#contact">Contact Us</a>
        </div>
      </div>
    </section>
  )
}
