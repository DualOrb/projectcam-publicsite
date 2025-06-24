import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Maximize, Zap, Target, Users } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { scrollToElement } from '@/utils/helpers'

const VideoSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ triggerOnce: true })
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control the actual video
  }

  return (
    <section id="demo" className="section-padding bg-gradient-to-br from-brand-black via-brand-black-light to-brand-black overflow-hidden">
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
              Watch Demo
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
            >
              See Project Cam
              <br />
              <span className="gradient-text">In Action</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Watch how Project Cam transforms complex project documentation into 
              simple, streamlined workflows in just minutes
            </motion.p>
          </div>

          {/* Video Player */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <div 
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={handlePlayPause}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Video Placeholder - Replace with actual video */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                
                {/* Video Thumbnail/Preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent">
                  <div className="w-full h-full flex items-center justify-center">
                    
                    {/* Demo Content Mockup */}
                    <div className="text-center text-white p-8">
                      <div className="mb-8">
                        <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Project Cam Demo</h3>
                        <p className="text-gray-300">3 minutes • Product walkthrough</p>
                      </div>
                      
                      {/* Preview Screenshots */}
                      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto opacity-60">
                        <div className="h-20 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs">Voice Recording</span>
                        </div>
                        <div className="h-20 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs">Photo Capture</span>
                        </div>
                        <div className="h-20 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs">AI Reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center shadow-brand-lg group-hover:shadow-brand transform transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </motion.div>
                )}

                {/* Video Controls */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
                    showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlayPause()
                        }}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4" />
                        <div className="w-20 h-1 bg-white/30 rounded-full">
                          <div className="w-3/4 h-full bg-brand-orange rounded-full"></div>
                        </div>
                      </div>
                      
                      <span className="text-sm">1:23 / 3:45</span>
                    </div>
                    
                    <button className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full h-1 bg-white/30 rounded-full cursor-pointer">
                      <div className="w-1/3 h-full bg-brand-orange rounded-full relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-brand-orange rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Key Benefits */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              {[
                { 
                  icon: Zap, 
                  title: 'Save Hours Daily',
                  description: 'Reduce documentation time from hours to minutes with voice-to-text and smart organization'
                },
                { 
                  icon: Target, 
                  title: 'Never Miss Details',
                  description: 'Capture everything with GPS tracking, photos, and voice notes all in one place'
                },
                { 
                  icon: Users, 
                  title: 'Impress Clients',
                  description: 'Generate professional reports instantly and invoice clients seamlessly'
                }
              ].map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="text-white">
                    <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-semibold text-brand-orange mb-2">
                      {benefit.title}
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed">{benefit.description}</div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-6">
              Ready to transform how you manage projects?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToElement('signup')}
                className="btn-primary btn-lg"
              >
                Get Early Access
              </button>
              <button 
                onClick={() => scrollToElement('timeline')}
                className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-brand-black"
              >
                View Launch Timeline
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoSection