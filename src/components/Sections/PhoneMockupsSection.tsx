import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { PHONE_MOCKUPS } from '@/utils/constants'
import { scrollToElement } from '@/utils/helpers'

const PhoneMockupsSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ triggerOnce: true })
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate through mockups
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHONE_MOCKUPS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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

  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + PHONE_MOCKUPS.length) % PHONE_MOCKUPS.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PHONE_MOCKUPS.length)
  }

  const activeMockup = PHONE_MOCKUPS[activeIndex]

  // Render different content for each phone mockup
  const renderPhoneContent = (_mockup: any, index: number) => {
    switch (index) {
      case 0: // Smart Capture
        return (
          <div className="w-full h-full flex flex-col">
            {/* App Header */}
            <div className="bg-brand-orange px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Project Cam</h3>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">📷</span>
              </div>
            </div>
            
            {/* Camera Viewfinder */}
            <div className="flex-1 bg-black relative flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-brand-orange rounded-lg flex items-center justify-center">
                <span className="text-brand-orange text-xs text-center">
                  Tap to Capture<br/>Photo
                </span>
              </div>
              
              {/* Recording indicator */}
              <div className="absolute top-4 left-4 flex items-center bg-red-500 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                <span className="text-white text-xs">REC 0:15</span>
              </div>
              
              {/* GPS indicator */}
              <div className="absolute top-4 right-4 flex items-center bg-green-500 px-2 py-1 rounded-full">
                <span className="text-white text-xs">📍 GPS</span>
              </div>
            </div>
            
            {/* Voice Recording Bar */}
            <div className="bg-white p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🎤</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Recording voice note...</div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-brand-orange h-1 rounded-full w-1/3"></div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">0:15</span>
              </div>
            </div>
            
            {/* Bottom Controls */}
            <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
              <button className="w-12 h-12 bg-gray-300 rounded-full"></button>
              <button className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📷</span>
              </button>
              <button className="w-12 h-12 bg-gray-300 rounded-full"></button>
            </div>
          </div>
        )
      
      case 1: // AI Reports
        return (
          <div className="w-full h-full flex flex-col bg-white">
            {/* App Header */}
            <div className="bg-brand-black px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">AI Reports</h3>
              <div className="text-white text-xs">🤖</div>
            </div>
            
            {/* Report Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Weekly Project Summary</h4>
              <p className="text-xs text-gray-600">Generated by AI • March 15, 2026</p>
            </div>
            
            {/* Stats Cards */}
            <div className="p-4 space-y-3 flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-600 font-bold text-lg">24</div>
                  <div className="text-green-700 text-xs">Tasks Complete</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-blue-600 font-bold text-lg">156</div>
                  <div className="text-blue-700 text-xs">Photos Taken</div>
                </div>
              </div>
              
              {/* Progress Chart */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-2">Project Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-orange h-2 rounded-full w-3/4"></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">75% Complete</div>
              </div>
              
              {/* Recent Activity */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700">Recent Activity</div>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Foundation inspection completed</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">12 photos uploaded to gallery</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Voice note: "Check electrical"</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Export Button */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full bg-brand-orange text-white py-2 rounded-lg text-sm font-medium">
                Export Report
              </button>
            </div>
          </div>
        )
      
      case 2: // Team Collaboration
        return (
          <div className="w-full h-full flex flex-col bg-white">
            {/* App Header */}
            <div className="bg-brand-black px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Team Chat</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-white text-xs">3 online</span>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">JD</span>
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">SM</span>
                </div>
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">RJ</span>
                </div>
                <div className="text-xs text-gray-600 self-center">+2 more</div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-hidden">
              {/* Message 1 */}
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">JD</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 p-2 rounded-lg rounded-tl-none">
                    <p className="text-xs text-gray-800">Foundation inspection done! ✅</p>
                  </div>
                  <span className="text-xs text-gray-500">John • 2:30 PM</span>
                </div>
              </div>
              
              {/* Message 2 - with image */}
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">SM</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 p-2 rounded-lg rounded-tl-none">
                    <div className="w-full h-12 bg-gray-300 rounded mb-1 flex items-center justify-center">
                      <span className="text-xs text-gray-600">📷 IMG_001.jpg</span>
                    </div>
                    <p className="text-xs text-gray-800">Electrical rough-in complete</p>
                  </div>
                  <span className="text-xs text-gray-500">Sarah • 2:45 PM</span>
                </div>
              </div>
              
              {/* Message 3 - Your message */}
              <div className="flex justify-end">
                <div className="bg-brand-orange p-2 rounded-lg rounded-tr-none max-w-xs">
                  <p className="text-xs text-white">Great work team! Moving to next phase tomorrow 🚀</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">You • 3:00 PM</span>
              </div>
            </div>
            
            {/* Task Assignment */}
            <div className="p-3 bg-yellow-50 border-t border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-yellow-800">New Task Assigned</div>
                  <div className="text-xs text-yellow-700">Plumbing inspection - Due tomorrow</div>
                </div>
                <button className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                  Accept
                </button>
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 text-xs p-2 border border-gray-300 rounded-full bg-gray-50"
                readOnly
              />
              <button className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
                <span className="text-white text-xs">➤</span>
              </button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-br from-brand-gray-light to-white overflow-hidden">
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
              <Smartphone className="w-4 h-4 mr-2" />
              See It In Action
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-brand-black mb-6"
            >
              Experience Project Cam
              <br />
              <span className="gradient-text">In Your Hands</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-brand-gray-dark max-w-3xl mx-auto leading-relaxed"
            >
              See how Project Cam transforms complex workflows into simple, intuitive experiences
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Phone Mockup */}
            <motion.div
              variants={phoneVariants}
              className="relative flex justify-center perspective-1000"
            >
              <div className="relative">
                {/* Phone Frame */}
                <div className="phone-mockup transform-preserve-3d">
                  <div className="phone-screen">
                    {/* Screen Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col relative overflow-hidden"
                      >
                        {renderPhoneContent(activeMockup, activeIndex)}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Phone Notch */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-brand-black rounded-full" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-brand-orange/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-6 h-6 bg-brand-orange/30 rounded-full"
                  animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Active Feature Info */}
              <div>
                <h3 className="text-3xl font-display font-bold text-brand-black mb-4">
                  {activeMockup.title}
                </h3>
                <p className="text-lg text-brand-gray-dark leading-relaxed mb-6">
                  {activeMockup.description}
                </p>

                {/* Feature Benefits */}
                <div className="space-y-3">
                  {activeMockup.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-brand-orange rounded-full mr-4" />
                      <span className="text-brand-gray-dark">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {PHONE_MOCKUPS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-brand-orange w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevious}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-gray-dark hover:text-brand-orange hover:border-brand-orange transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-gray-dark hover:text-brand-orange hover:border-brand-orange transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4">
                <button
                  onClick={() => scrollToElement('signup')}
                  className="btn-primary btn-lg"
                >
                  Try Project Cam
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PhoneMockupsSection