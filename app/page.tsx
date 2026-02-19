import { ClientLayout } from "@/components/client-layout"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { TechStack } from "@/components/tech-stack"

export default function HomePage() {
  return (
    <ClientLayout>
      <HeroSection />
      <HowItWorks />
      <TechStack />
    </ClientLayout>
  )
}
