import { HeroSection } from '@/components/marketing/HeroSection'
import { FeaturedProductsSection } from '@/components/marketing/FeaturedProductsSection'
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection'
import { SecuritySection } from '@/components/marketing/SecuritySection'
import { AboutSection } from '@/components/marketing/AboutSection'
import { FaqSection } from '@/components/marketing/FaqSection'
import { ContactSection } from '@/components/marketing/ContactSection'
import { CtaSection } from '@/components/marketing/CtaSection'

export interface HomePageProps {
  onNavigate?: (path: string) => void
  onProductClick?: (productId: string) => void
  onRegisterClick?: () => void
  onLoginClick?: () => void
}

export function HomePage({
  onNavigate,
  onProductClick,
  onRegisterClick,
}: HomePageProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBrowse = () => {
    if (onNavigate) {
      onNavigate('/browse')
    } else {
      scrollToSection('featured')
    }
  }

  const handleHowItWorks = () => {
    scrollToSection('how-it-works')
  }

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick()
    } else if (onNavigate) {
      onNavigate('/register')
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* 01: Hero Section */}
      <HeroSection
        onBrowseClick={handleBrowse}
        onHowItWorksClick={handleHowItWorks}
        onRegisterClick={handleRegister}
      />

      {/* 02: Featured Products */}
      <FeaturedProductsSection
        onBrowseClick={handleBrowse}
        onProductClick={onProductClick ?? ((id) => onNavigate?.(`/product/${id}`))}
      />

      {/* 03: 4-Step How It Works Pipeline */}
      <HowItWorksSection />

      {/* 04: Security & Trust Architecture */}
      <SecuritySection />

      {/* 05: About Inside Underground */}
      <AboutSection />

      {/* 06: Frequently Asked Questions */}
      <FaqSection />

      {/* 07: Support & Contact */}
      <ContactSection />

      {/* 08: Call To Action */}
      <CtaSection
        onRegisterClick={handleRegister}
        onBrowseClick={handleBrowse}
      />
    </div>
  )
}
