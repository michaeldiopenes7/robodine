import { useEffect } from 'react'
import './RobotPage.css'
import type { Product } from './products'
import { CONTACT_EMAIL } from './contact'

import Nav from './components/Nav'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import Intro from './sections/Intro'
import DualScreen from './sections/DualScreen'
import VoiceOptions from './sections/VoiceOptions'
import FullBleedFeature from './sections/FullBleedFeature'
import ProductFeatures from './sections/ProductFeatures'
import ObstacleAvoidance from './sections/ObstacleAvoidance'
import Collaboration from './sections/Collaboration'
import WorkData from './sections/WorkData'
import Parameters from './sections/Parameters'
import Contact from './sections/Contact'

/*
 * Product page — one shared layout for the whole robot range.
 *
 * Section order mirrors the reference page: hero, intro + video,
 * dual-screen, voice, human recognition, cruising, features, obstacle
 * avoidance, multi-robot collaboration, work data, parameters, contact.
 *
 * Each section is its own component under sections/ and reads from the
 * Product record in products.ts, so this file stays a plain running order.
 * Media is left as labelled placeholders until the real assets land.
 */

export default function RobotPage({ product }: { product: Product }) {
  useEffect(() => {
    // The lead product is the homepage, so it keeps the site title from
    // index.html. Only the other products name themselves in the tab.
    document.title = product.slug
      ? `${product.title} — RoboDine Solutions`
      : 'RoboDine — Commercial service robots'
  }, [product])

  return (
    <div className="page rp">
      <Nav product={product} salesEmail={CONTACT_EMAIL} />

      <Hero product={product} />

      <main>
        <Intro product={product} />
        <DualScreen product={product} />
        <VoiceOptions product={product} />

        <FullBleedFeature
          title={product.recognition.title}
          body={product.recognition.body}
          align="left"
          imageLabel="Full-bleed — robot greeting a guest at a reception point"
        />
        <FullBleedFeature
          title={product.cruising.title}
          body={product.cruising.body}
          align="right"
          imageLabel="Full-bleed — robot cruising a floor showing a promotion"
        />

        <ProductFeatures product={product} />
        <ObstacleAvoidance product={product} />
        <Collaboration product={product} />
        <WorkData product={product} />
        <Parameters product={product} />
        <Contact />
      </main>

      <Footer product={product} salesEmail={CONTACT_EMAIL} />
    </div>
  )
}
