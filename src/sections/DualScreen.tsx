import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import type { Product } from '../products'
import dualScreen from '../assets/dual-screen.png'

/* 3. Dual-screen design — dark band, one wide image. */
export default function DualScreen({ product }: { product: Product }) {
  return (
    <Band tone="dark">
      <SectionHead title={product.dualScreen.title} body={product.dualScreen.body} />
      <img
        className="rp-dual-img"
        src={dualScreen}
        alt="Rockit's rear display running a promotion, beside a detail of the top touch screen menu"
        width={1196}
        height={586}
      />
    </Band>
  )
}
