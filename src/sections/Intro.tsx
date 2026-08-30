import Band from '../components/Band'
import type { Product } from '../products'

/*
 * 2. Intro paragraph + product video.
 *
 * The clip runs as a muted, looping showreel with no controls, so it plays
 * itself the way the reference page does. `muted` is what makes autoplay
 * permitted at all — browsers block autoplay with sound — and playsInline
 * stops iOS from taking it fullscreen.
 *
 * It lives in public/media rather than src/assets so Vite serves it as a
 * static file the browser can stream instead of bundling it.
 */
export default function Intro({ product }: { product: Product }) {
  return (
    <Band>
      <p className="rp-intro">{product.intro}</p>
      <video
        className="rp-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/product-video-poster.jpg"
        aria-label="Rockit service robot in operation"
        width={1280}
        height={720}
      >
        <source src="/media/product-video.mp4" type="video/mp4" />
      </video>
    </Band>
  )
}
