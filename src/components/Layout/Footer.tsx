import { Link } from 'react-router-dom'
import { Mail, Twitter, Linkedin, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils/helpers'
import LogoFooter from '@/assets/logo-footer.svg'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Features', sectionId: 'features' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Enterprise', sectionId: 'enterprise' },
    { label: 'Timeline', sectionId: 'timeline' },
    { label: 'Early Access', sectionId: 'signup' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ]

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: COMPANY_INFO.social.twitter 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: COMPANY_INFO.social.linkedin 
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: COMPANY_INFO.social.facebook 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: COMPANY_INFO.social.instagram 
    },
  ]

  return (
    <footer className="bg-brand-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={LogoFooter} 
                alt="ProjectCam" 
                className="h-8 w-auto"
              />
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Revolutionizing project documentation for contractors with smart capture, AI reports, and seamless team collaboration.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:nr.designs493@gmail.com"
                  className="hover:text-brand-orange transition-colors duration-200"
                >
                  nr.designs493@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-white">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.sectionId}>
                  <button
                    onClick={() => scrollToElement(link.sectionId)}
                    className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-white">
              Follow Us
            </h3>
            <div className="flex space-x-3 mb-8">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-brand-black-light rounded-lg flex items-center justify-center text-gray-300 hover:text-brand-orange hover:bg-brand-orange/10 transition-all duration-200"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
            </div>

            <h4 className="font-display font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brand-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brand-black-light pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>© {currentYear} ProjectCam. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with ❤️ for contractors</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer