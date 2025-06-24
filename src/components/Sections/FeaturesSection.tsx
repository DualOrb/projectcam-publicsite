import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Brain, Users, Users2, MapPin, CheckSquare, ArrowRight, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { FEATURES } from '@/utils/constants'
import { scrollToElement } from '@/utils/helpers'
import FeatureModal from '@/components/UI/FeatureModal'

const iconMap = {
  Camera,
  Brain,
  Users,
  Users2,
  MapPin,
  CheckSquare
}

const FeaturesSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ triggerOnce: true })
  const [selectedFeature, setSelectedFeature] = useState<typeof FEATURES[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLearnMore = (feature: typeof FEATURES[0]) => {
    setSelectedFeature(feature)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFeature(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const cardHoverVariants = {
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <section id="features" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium mb-6 border border-brand-orange/20"
          >
            <Star className="w-4 h-4 mr-2" />
            Powerful Features
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-display font-bold text-brand-black mb-6"
          >
            Everything You Need for
            <br />
            <span className="gradient-text">Project Success</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed"
          >
            From smart capture to AI-powered insights, Project Cam provides a complete suite 
            of tools designed for modern professionals
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                initial="hidden"
                animate={hasIntersected ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  whileHover="hover"
                  className="card-hover h-full p-8 cursor-pointer relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="feature-icon mb-6 group-hover:shadow-brand-lg transition-shadow duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-semibold text-brand-black mb-4 group-hover:text-brand-orange transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-brand-gray-dark mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2 mb-6">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-center text-sm text-brand-gray-dark"
                        >
                          <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Link */}
                    <button 
                      onClick={() => handleLearnMore(feature)}
                      className="flex items-center text-brand-orange font-medium text-sm group-hover:text-brand-orange-dark transition-colors duration-300 hover:underline"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-brand-orange/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-brand-orange/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 rounded-2xl border border-brand-orange/20">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-display font-semibold text-brand-black mb-2">
                Ready to transform your workflow?
              </h3>
              <p className="text-brand-gray-dark">
                Join thousands of professionals who trust Project Cam
              </p>
            </div>
            <button
              onClick={() => scrollToElement('demo')}
              className="btn-primary btn-lg whitespace-nowrap"
            >
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Modal */}
        <FeatureModal 
          feature={selectedFeature}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  )
}

export default FeaturesSection