import Band from '../components/Band'
import type { Product } from '../products'

/*
 * 2. Intro paragraph + product video.
 *
 * The video lives in public/media rather than src/assets so Vite serves it
 * as a static file the browser can stream, instead of bundling it. It is
 * not autoplayed — a 106s clip should start when someone asks for it — and
 * preload="metadata" fetches only the header until then, so the page does
 * not pull megabytes on load. The poster fills the frame in the meantime.
 */
export default function Intro({ product }: { product: Product }) {
  return (
    <Band>
      <p className="rp-intro">{product.intro}</p>
      <video
        className="rp-video"
        controls
        playsInline
        preload="metadata"
        poster="/media/product-video-poster.jpg"
        width={1280}
        height={720}
      >
        <source src="/media/product-video.mp4" type="video/mp4" />
        Your browser cannot play this video.
      </video>
    </Band>
  )
}
