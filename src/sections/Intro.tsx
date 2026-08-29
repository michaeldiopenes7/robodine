import Band from '../components/Band'
import Slot from '../components/Slot'
import type { Product } from '../products'

/* 2. Intro paragraph + product video. */
export default function Intro({ product }: { product: Product }) {
  return (
    <Band>
      <p className="rp-intro">{product.intro}</p>
      <Slot ratio="16 / 9" label="Product video — a full service run, pass to table to clear-down" />
    </Band>
  )
}
