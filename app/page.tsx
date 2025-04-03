import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { DemoSection } from "@/components/demo-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <ContactSection />
    </div>
  )
}

