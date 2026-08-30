import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import type { Product } from '../products'

/*
 * 9. Multi-robot collaboration — title over a looping fleet animation.
 *
 * Supplied as a 9.1MB GIF and re-encoded to a 120KB MP4, which the browser
 * streams from public/media rather than Vite bundling it. It plays as a
 * silent loop, so it behaves exactly as the GIF would have, at a fraction
 * of the weight.
 */
export default function Collaboration({ product }: { product: Product }) {
  return (
    <Band>
      <SectionHead title={product.collaboration.title} body={product.collaboration.body} />
      <video
        className="rp-collab-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/collaboration-poster.jpg"
        aria-label={`Multiple ${product.name} units routing on one floor`}
        width={1280}
        height={720}
      >
        <source src="/media/collaboration.mp4" type="video/mp4" />
      </video>
    </Band>
  )
}
