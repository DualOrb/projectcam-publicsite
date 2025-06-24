import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPANY_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils/helpers'
import LogoSvg from '@/assets/logo-perfect-dark.svg'
import LogoWhiteSvg from '@/assets/logo-perfect.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId)
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: 'Demo', sectionId: 'demo' },
    { label: 'Features', sectionId: 'features' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Enterprise', sectionId: 'enterprise' },
    { label: 'Timeline', sectionId: 'timeline' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isScrolled ? LogoSvg : LogoWhiteSvg} 
              alt="ProjectCam - Contractor Platform" 
              className="h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className={`hover:text-brand-orange transition-colors duration-200 font-medium ${
                  isScrolled ? 'text-brand-gray-dark' : 'text-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('signup')}
              className="btn-primary btn-sm"
            >
              Get Early Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-brand-black' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-black' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-100 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.sectionId}
                    onClick={() => handleNavClick(item.sectionId)}
                    className="block w-full text-left px-4 py-3 text-brand-gray-dark hover:text-brand-orange hover:bg-gray-50 transition-colors duration-200 font-medium rounded-lg"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <button
                    onClick={() => handleNavClick('signup')}
                    className="btn-primary w-full"
                  >
                    Get Early Access
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header