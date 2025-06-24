import { motion } from 'framer-motion'
import { Mail, Star, Zap, Shield, Camera } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import EmailSignupForm from '@/components/UI/EmailSignupForm'

const SignupSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section id="signup" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={elementRef}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium mb-6 border border-brand-orange/20"
            >
              <Camera className="w-4 h-4 mr-2" />
              Early Access Program
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-brand-black mb-6"
            >
              Join the Future of
              <br />
              <span className="gradient-text">Project Documentation</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-brand-gray-dark max-w-2xl mx-auto leading-relaxed"
            >
              Be among the first contractors to experience ProjectCam when we launch in early 2026
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-brand-gray-light to-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left - Form */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-brand-black mb-6">
                    Get Early Access
                  </h3>
                  
                  <EmailSignupForm
                    placeholder="Enter your email address"
                    buttonText="Join Early Access"
                    showName={true}
                    source="signup-main"
                    className="mb-6"
                  />
                  
                  <div className="space-y-4">
                    <p className="text-sm text-brand-gray-medium">
                      Join 2,500+ contractors already signed up
                    </p>
                    
                    {/* Trust Indicators */}
                    <div className="flex items-center space-x-6 text-sm text-brand-gray-medium">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-green-600" />
                        <span>No spam</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1 text-blue-600" />
                        <span>Unsubscribe anytime</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Benefits */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-brand-black mb-4">
                    What you'll get:
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <div className="font-medium text-brand-black">First Access</div>
                        <div className="text-sm text-brand-gray-medium">Be the first to try ProjectCam when we launch</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <div className="font-medium text-brand-black">Exclusive Updates</div>
                        <div className="text-sm text-brand-gray-medium">Progress updates and behind-the-scenes content</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <div className="font-medium text-brand-black">Free Beta Access</div>
                        <div className="text-sm text-brand-gray-medium">Full access during beta testing phase</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-brand-orange">Q1 2026</div>
                        <div className="text-sm text-brand-gray-medium">Launch Date</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-brand-orange">100%</div>
                        <div className="text-sm text-brand-gray-medium">Free Beta</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SignupSection