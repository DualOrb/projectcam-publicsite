import { useEffect } from 'react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import HeroSection from '@/components/Sections/HeroSection'
import VideoSection from '@/components/Sections/VideoSection'
import FeaturesSection from '@/components/Sections/FeaturesSection'
import PhoneMockupsSection from '@/components/Sections/PhoneMockupsSection'
import EnterpriseSection from '@/components/Sections/EnterpriseSection'
import TimelineSection from '@/components/Sections/TimelineSection'
import SignupSection from '@/components/Sections/SignupSection'

const HomePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Project Cam - Smart Project Documentation'
    
    // Add structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Project Cam',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'iOS, Android, Web',
      'description': 'Revolutionary app for project documentation with voice recording, photo capture, AI reports, and team collaboration.',
      'url': 'https://project-cam.com',
      'author': {
        '@type': 'Organization',
        'name': 'Project Cam Team'
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/ComingSoon'
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      // Cleanup structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <PhoneMockupsSection />
        <EnterpriseSection />
        <TimelineSection />
        <SignupSection />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage