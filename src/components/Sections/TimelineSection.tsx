import { motion } from 'framer-motion'
import { CheckCircle, Clock, Calendar, Rocket, CalendarDays } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { LAUNCH_TIMELINE } from '@/utils/constants'
import { scrollToElement } from '@/utils/helpers'

const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  upcoming: Calendar,
  planned: Rocket
}

const statusColors = {
  completed: 'text-green-500 bg-green-100',
  'in-progress': 'text-brand-orange bg-brand-orange/10',
  upcoming: 'text-blue-500 bg-blue-100',
  planned: 'text-purple-500 bg-purple-100'
}

const TimelineSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="timeline" className="section-padding bg-gradient-to-br from-brand-gray-light to-white overflow-hidden">
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
              className="inline-flex items-center px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium mb-6 border border-brand-orange/20"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Launch Timeline
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-brand-black mb-6"
            >
              Our Journey to
              <br />
              <span className="gradient-text">Launch</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed"
            >
              Follow our progress as we build the future of project documentation. 
              Each milestone brings us closer to revolutionizing your workflow.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-brand-orange to-gray-300"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {LAUNCH_TIMELINE.map((item, index) => {
                  const IconComponent = statusIcons[item.status as keyof typeof statusIcons]
                  const colorClasses = statusColors[item.status as keyof typeof statusColors]
                  
                  return (
                    <motion.div
                      key={index}
                      variants={timelineItemVariants}
                      className="relative flex items-start"
                    >
                      {/* Icon */}
                      <div className={`relative z-20 w-16 h-16 rounded-full flex items-center justify-center ${colorClasses} border-4 border-white shadow-lg`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="ml-8 flex-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <h3 className="text-xl font-display font-semibold text-brand-black">
                              {item.phase}
                            </h3>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                              </span>
                              <span className="ml-3 text-sm text-brand-gray-medium font-medium">
                                {item.date}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-brand-gray-dark leading-relaxed">
                            {item.description}
                          </p>

                          {/* Progress indicator for in-progress items */}
                          {item.status === 'in-progress' && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm text-brand-gray-medium mb-2">
                                <span>Progress</span>
                                <span>75%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div
                                  className="bg-brand-orange h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: '75%' }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-brand-orange/5 to-brand-orange/10 rounded-2xl border border-brand-orange/20">
              <h3 className="text-2xl font-display font-semibold text-brand-black mb-4">
                Don't Miss the Launch!
              </h3>
              <p className="text-brand-gray-dark mb-6 leading-relaxed">
                Be the first to experience Project Cam when we go live. Join our mailing list 
                for exclusive updates, beta access, and launch day notifications.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => scrollToElement('signup')}
                  className="btn-primary btn-lg"
                >
                  Get Launch Notifications
                </button>
                <button 
                  onClick={() => scrollToElement('signup')}
                  className="btn-outline btn-lg"
                >
                  Request Beta Access
                </button>
              </div>

              {/* Newsletter Signup Stats */}
              <div className="flex items-center justify-center mt-6 space-x-8 text-sm text-brand-gray-medium">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>2,500+ subscribers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mr-2"></div>
                  <span>Weekly updates</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>No spam, ever</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TimelineSection