import type { Product } from '../products'
import robot from '../assets/hero-robot.png'
import backdrop from '../assets/hero-backdrop.png'

/*
 * 1. Hero — marble colonnade backdrop, robot left, title and CTA right.
 *
 * The backdrop is decorative, so it carries an empty alt and the robot
 * carries the descriptive one. Both are real <img> rather than CSS
 * backgrounds so the browser treats them as discoverable, priority loads.
 */
export default function Hero({ product }: { product: Product }) {
  return (
    <section className="rp-phead" id="top">
      <img
        className="rp-phead-bg"
        src={backdrop}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1279}
      />

      <div className="rp-phead-inner">
        <div className="rp-phead-robot">
          <img
            src={robot}
            alt={`${product.name} service robot, front view`}
            width={720}
            height={928}
          />
        </div>

        <div className="rp-phead-intro">
          <h1>{product.title}</h1>
          <a className="rp-phead-btn" href="#contact">Contact Us</a>
        </div>
      </div>
    </section>
  )
}
