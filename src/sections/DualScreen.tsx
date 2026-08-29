import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import Slot from '../components/Slot'
import type { Product } from '../products'

/* 3. Dual-screen design — dark band, two images side by side. */
export default function DualScreen({ product }: { product: Product }) {
  return (
    <Band tone="dark">
      <SectionHead title={product.dualScreen.title} body={product.dualScreen.body} />
      <div className="rp-imgs rp-imgs-2">
        <Slot ratio="4 / 3" label="Front view — rear display running a promotion" />
        <Slot ratio="4 / 3" label="Detail — top touch screen menu" />
      </div>
    </Band>
  )
}
