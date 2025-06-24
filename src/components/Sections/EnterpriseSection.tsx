import { motion } from 'framer-motion'
import { Shield, Users, BarChart3, Zap, CheckCircle, ArrowRight, Building } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { scrollToElement } from '@/utils/helpers'
import EmailSignupForm from '@/components/UI/EmailSignupForm'

const EnterpriseSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ triggerOnce: true })

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

  const enterpriseFeatures = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliance, SSO integration, and advanced encryption'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Role-based permissions, user provisioning, and access controls'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed reporting, performance metrics, and usage insights'
    },
    {
      icon: Zap,
      title: 'API Integration',
      description: 'Connect with existing tools and custom workflows'
    }
  ]

  const benefits = [
    'Centralized team collaboration',
    'Real-time project visibility',
    'Automated compliance reporting',
    'Custom workflow automation',
    'Advanced data analytics',
    'Priority support & training'
  ]

  return (
    <section id="enterprise" className="section-padding bg-brand-black text-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium mb-6 border border-brand-orange/30"
            >
              <Building className="w-4 h-4 mr-2" />
              Enterprise Ready
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
            >
              Built for Teams,
              <br />
              <span className="gradient-text">Scaled for Enterprise</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Empower your entire organization with advanced team management, 
              enterprise-grade security, and powerful analytics
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-semibold text-white mb-6">
                  Everything your team needs to succeed
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {enterpriseFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="p-4 bg-brand-black-light rounded-xl border border-gray-700 hover:border-brand-orange/50 transition-colors duration-300"
                    >
                      <feature.icon className="w-8 h-8 text-brand-orange mb-3" />
                      <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Key Enterprise Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 text-brand-orange mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content - CTA Card */}
            <motion.div variants={itemVariants}>
              <div className="p-8 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 rounded-2xl border border-brand-orange/20 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    Ready for Enterprise?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Get early access to enterprise features and priority onboarding 
                    when we launch
                  </p>
                </div>

                <EmailSignupForm
                  placeholder="Enter your work email"
                  buttonText="Get Enterprise Access"
                  showName={true}
                  source="enterprise"
                  className="mb-6"
                />

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Contact our enterprise team: <a href="mailto:enterprise@projectcam.com" className="text-brand-orange hover:text-brand-orange-light transition-colors duration-200">enterprise@projectcam.com</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-700"
          >
            {[
              { number: '500+', label: 'Teams Ready' },
              { number: '50K+', label: 'Projects Managed' },
              { number: '99.9%', label: 'Uptime SLA' },
              { number: '24/7', label: 'Enterprise Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-display font-bold text-brand-orange mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EnterpriseSection