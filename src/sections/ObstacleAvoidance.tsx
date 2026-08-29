import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import Slot from '../components/Slot'
import type { Product } from '../products'

/* 8. High-accuracy obstacle avoidance — title over a three-image mosaic. */
export default function ObstacleAvoidance({ product }: { product: Product }) {
  return (
    <Band>
      <SectionHead title={product.avoidance.title} body={product.avoidance.body} />
      <div className="rp-imgs rp-imgs-mosaic">
        <Slot className="rp-mosaic-a" ratio="16 / 9" label="Detail — front sensor array" />
        <Slot className="rp-mosaic-b" ratio="16 / 9" label="Detail — chassis lidar" />
        <Slot className="rp-mosaic-c" ratio="3 / 4" label="Three-quarter view — full body" />
      </div>
    </Band>
  )
}
