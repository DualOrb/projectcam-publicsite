import { motion } from 'framer-motion'
import { Monitor, Smartphone, Users, FileText, DollarSign, Settings, Calendar, BarChart3, Download, Zap } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { scrollToElement } from '@/utils/helpers'

const WebPortalSection = () => {
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

  const portalFeatures = [
    {
      icon: Users,
      title: 'Client Management',
      description: 'Organize client information, contact details, and project history in one place'
    },
    {
      icon: DollarSign,
      title: 'Billing & Invoicing',
      description: 'Generate professional invoices and track payments directly from project data'
    },
    {
      icon: FileText,
      title: 'Document Hub',
      description: 'Access all project documents, contracts, and reports from any device'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track business performance with detailed insights and reporting tools'
    },
    {
      icon: Calendar,
      title: 'Project Scheduling',
      description: 'Plan and manage project timelines with integrated calendar tools'
    },
    {
      icon: Settings,
      title: 'Team Management',
      description: 'Control user permissions and collaborate with your entire crew'
    }
  ]

  return (
    <section id="web-portal" className="section-padding bg-gradient-to-br from-brand-gray-light to-white overflow-hidden">
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
              <Monitor className="w-4 h-4 mr-2" />
              Complete Business Solution
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-brand-black mb-6"
            >
              Mobile App +
              <br />
              <span className="gradient-text">Web Portal</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed"
            >
              Capture everything on-site with your mobile app, then manage your entire business 
              from our powerful web dashboard
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            
            {/* Left - Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                {/* Laptop Mockup */}
                <div className="relative">
                  <div className="bg-gray-800 rounded-2xl p-1 shadow-2xl">
                    <div className="bg-white rounded-xl overflow-hidden">
                      {/* Browser Bar */}
                      <div className="bg-gray-100 px-4 py-3 flex items-center border-b border-gray-200">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-600">
                          projectcam.com/dashboard
                        </div>
                      </div>
                      
                      {/* Dashboard Content */}
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-white h-80">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold text-gray-800">ProjectCam Dashboard</h3>
                          <div className="flex space-x-2">
                            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                              <Monitor className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {[
                            { label: 'Active Projects', value: '12', icon: FileText, color: 'bg-blue-500' },
                            { label: 'This Month', value: '$24K', icon: DollarSign, color: 'bg-green-500' },
                            { label: 'Team Members', value: '8', icon: Users, color: 'bg-purple-500' }
                          ].map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                              <motion.div
                                key={index}
                                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                                    <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                                  </div>
                                  <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <IconComponent className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                        
                        {/* Recent Activity */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 text-sm">Recent Activity</h4>
                          {[
                            { title: 'Invoice sent to Smith Family', time: '2h ago', status: 'success' },
                            { title: 'Kitchen project photos synced', time: '4h ago', status: 'info' }
                          ].map((activity, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center p-3 bg-white rounded-lg border border-gray-100"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.5 + index * 0.1 }}
                            >
                              <div className={`w-2 h-2 rounded-full mr-3 ${
                                activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-800">{activity.title}</div>
                                <div className="text-xs text-gray-500">{activity.time}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone Mockup - Positioned beside laptop */}
                <motion.div
                  className="absolute -bottom-8 -right-8 w-32 h-64"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="w-full h-full bg-gray-800 rounded-2xl p-1 shadow-xl">
                    <div className="w-full h-full bg-gradient-to-b from-gray-100 to-white rounded-xl overflow-hidden">
                      {/* Phone Status Bar */}
                      <div className="flex justify-between items-center px-3 py-2 text-xs text-gray-800">
                        <span className="font-medium">9:41</span>
                        <div className="w-4 h-2 border border-gray-800 rounded-sm">
                          <div className="w-3 h-1 bg-green-500 rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* App Header */}
                      <div className="px-3 py-2 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-gray-800">Project Cam</h3>
                          <div className="w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
                            <Smartphone className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Sync Indicator */}
                      <div className="px-3 py-4 text-center">
                        <motion.div
                          className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Zap className="w-4 h-4 text-green-600" />
                        </motion.div>
                        <div className="text-xs text-gray-600">Synced to Web</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-brand-black mb-4">
                  Powerful Web Dashboard
                </h3>
                <p className="text-lg text-brand-gray-dark leading-relaxed mb-6">
                  While your mobile app handles field work, our web portal becomes your business command center. 
                  Manage everything from client relationships to financial reporting in one integrated platform.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portalFeatures.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-brand-orange" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-black text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-brand-gray-medium leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  onClick={() => scrollToElement('signup')}
                  className="btn-primary btn-lg"
                >
                  Get Early Access to Both
                </button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Feature Highlight */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 bg-gradient-to-r from-brand-orange/5 to-brand-orange/10 rounded-2xl border border-brand-orange/20"
          >
            <h3 className="text-2xl font-display font-semibold text-brand-black mb-4">
              Seamlessly Connected
            </h3>
            <p className="text-brand-gray-dark mb-6 leading-relaxed max-w-2xl mx-auto">
              Every photo, voice note, and project update from your mobile app automatically syncs 
              to your web dashboard. Start on-site, finish in the office.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-brand-gray-medium">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Cloud backup</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-orange rounded-full mr-2"></div>
                <span>Multi-device access</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WebPortalSection