import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import type { Product } from '../products'
import obstacleAvoidance from '../assets/obstacle-avoidance.png'

/* 8. High-accuracy obstacle avoidance — title over one wide image. */
export default function ObstacleAvoidance({ product }: { product: Product }) {
  return (
    <Band>
      <SectionHead title={product.avoidance.title} body={product.avoidance.body} />
      <img
        className="rp-avoid-img"
        src={obstacleAvoidance}
        alt={`${product.name}'s front sensor array, chassis lidar and full body`}
      />
    </Band>
  )
}
