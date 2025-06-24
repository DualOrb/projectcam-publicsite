import { useEffect } from 'react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import HeroSection from '@/components/Sections/HeroSection'
import VideoSection from '@/components/Sections/VideoSection'
import FeaturesSection from '@/components/Sections/FeaturesSection'
import PhoneMockupsSection from '@/components/Sections/PhoneMockupsSection'
import WebPortalSection from '@/components/Sections/WebPortalSection'
import EnterpriseSection from '@/components/Sections/EnterpriseSection'
import TimelineSection from '@/components/Sections/TimelineSection'
import SignupSection from '@/components/Sections/SignupSection'

const HomePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Project Cam - Smart Project Documentation'
    
    // Add comprehensive structured data for SEO
    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Project Cam',
        'applicationCategory': 'BusinessApplication',
        'applicationSubCategory': 'Project Management',
        'operatingSystem': ['iOS', 'Android', 'Web Browser'],
        'description': 'Revolutionary smart project documentation app with AI-powered voice recording, photo capture, automated reports, and team collaboration features for construction, inspection, and project management professionals.',
        'url': 'https://project-cam.com',
        'sameAs': [
          'https://www.facebook.com/projectcam',
          'https://twitter.com/projectcam',
          'https://www.linkedin.com/company/projectcam'
        ],
        'author': {
          '@type': 'Organization',
          'name': 'Project Cam Team',
          'url': 'https://project-cam.com'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Project Cam',
          'url': 'https://project-cam.com'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/ComingSoon',
          'validFrom': '2024-01-01',
          'category': 'Early Access'
        },
        'featureList': [
          'Voice Recording',
          'Photo Capture',
          'AI-Powered Reports',
          'Team Collaboration',
          'Project Documentation',
          'Mobile and Web Access',
          'Enterprise Solutions'
        ],
        'screenshot': 'https://project-cam.com/app-screenshot.jpg',
        'softwareVersion': '1.0.0',
        'datePublished': '2024-01-01',
        'dateModified': '2024-12-24',
        'inLanguage': 'en-US',
        'copyrightHolder': {
          '@type': 'Organization',
          'name': 'Project Cam Team'
        },
        'copyrightYear': '2024',
        'license': 'https://project-cam.com/terms'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Project Cam',
        'url': 'https://project-cam.com',
        'logo': 'https://project-cam.com/logo.png',
        'description': 'Revolutionary smart project documentation solutions for modern teams',
        'foundingDate': '2024',
        'sameAs': [
          'https://www.facebook.com/projectcam',
          'https://twitter.com/projectcam',
          'https://www.linkedin.com/company/projectcam'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'Customer Service',
          'availableLanguage': 'English'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Project Cam',
        'url': 'https://project-cam.com',
        'description': 'Smart project documentation app with voice recording, photo capture, and AI reports',
        'inLanguage': 'en-US',
        'isPartOf': {
          '@type': 'WebSite',
          'url': 'https://project-cam.com'
        },
        'about': {
          '@type': 'SoftwareApplication',
          'name': 'Project Cam'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Project Cam Team'
        }
      }
    ]

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
        <WebPortalSection />
        <EnterpriseSection />
        <TimelineSection />
        <SignupSection />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage