import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { Demo } from '@/components/sections/Demo'
import { Pricing } from '@/components/sections/Pricing'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Demo />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
