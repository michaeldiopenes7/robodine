import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import Slot from '../components/Slot'
import type { Product } from '../products'

/* 9. Multi-robot collaboration — title over a single wide image. */
export default function Collaboration({ product }: { product: Product }) {
  return (
    <Band>
      <SectionHead title={product.collaboration.title} body={product.collaboration.body} />
      <div className="rp-imgs">
        <Slot ratio="16 / 8" label="Fleet animation — multiple units routing on one floor" />
      </div>
    </Band>
  )
}
