import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Camera, Brain, Users, MapPin, Mic, Volume2, Image, Zap, MessageSquare, Navigation, ChevronRight, ArrowLeft, Plus, Clock, FileText, Settings, Search, Filter } from 'lucide-react'
import EmailSignupForm from '@/components/UI/EmailSignupForm'
import Button from '@/components/UI/Button'
import { scrollToElement } from '@/utils/helpers'

const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    { id: 1, name: 'Kitchen Renovation', client: 'Smith Family', progress: 75, photos: 24, notes: 8, lastUpdate: '2 hours ago' },
    { id: 2, name: 'Bathroom Remodel', client: 'Johnson Home', progress: 45, photos: 18, notes: 12, lastUpdate: '1 day ago' },
    { id: 3, name: 'Deck Installation', client: 'Miller Property', progress: 90, photos: 32, notes: 6, lastUpdate: '3 hours ago' }
  ]

  const recentPhotos = [
    { id: 1, title: 'Before - Kitchen Demo', time: '2h ago', project: 'Kitchen Renovation' },
    { id: 2, title: 'Electrical Rough-in', time: '4h ago', project: 'Bathroom Remodel' },
    { id: 3, title: 'Foundation Check', time: '1d ago', project: 'Deck Installation' },
    { id: 4, title: 'Tile Progress', time: '2d ago', project: 'Bathroom Remodel' }
  ]

  const voiceNotes = [
    { id: 1, title: 'Client requested cabinet change', duration: '1:24', project: 'Kitchen Renovation', time: '1h ago' },
    { id: 2, title: 'Electrical inspection notes', duration: '0:45', project: 'Bathroom Remodel', time: '3h ago' },
    { id: 3, title: 'Material delivery reminder', duration: '0:32', project: 'Deck Installation', time: '5h ago' }
  ]

  const navigateToPage = (page, data = null) => {
    setCurrentPage(page)
    if (data) setSelectedProject(data)
  }

  const goBack = () => {
    setCurrentPage('home')
    setSelectedProject(null)
  }

  const renderHomePage = () => (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Project Cam</h2>
        <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="space-y-4">
        {[
          { icon: Volume2, title: 'Voice Notes', count: '3 active', color: 'bg-purple-500', description: 'Record voice memos instantly', page: 'voice' },
          { icon: Image, title: 'Photos', count: '127 captured', color: 'bg-blue-500', description: 'Capture and organize job photos', page: 'photos' },
          { icon: Zap, title: 'AI Reports', count: '12 generated', color: 'bg-brand-orange', description: 'Auto-generate project reports', page: 'reports' }
        ].map((item, index) => {
          const IconComponent = item.icon
          const isActive = activeFeature === index
          return (
            <motion.button
              key={item.title}
              className={`w-full flex items-center p-4 rounded-2xl shadow-sm border transition-all duration-300 text-left ${
                isActive 
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border-brand-orange shadow-md' 
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              onClick={() => {
                setActiveFeature(index)
                navigateToPage(item.page)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mr-4 ${
                isActive ? 'shadow-lg' : ''
              }`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500">{isActive ? item.description : item.count}</div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                isActive ? 'text-brand-orange rotate-90' : 'text-gray-400'
              }`} />
            </motion.button>
          )
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <motion.button 
          className={`p-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
            isRecording 
              ? 'bg-red-500 text-white' 
              : 'bg-brand-orange text-white hover:bg-orange-600'
          }`}
          onClick={() => setIsRecording(!isRecording)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRecording ? (
            <>
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Recording...
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </>
          )}
        </motion.button>
        <motion.button 
          className="border border-gray-200 text-gray-700 p-4 rounded-xl text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
          onClick={() => navigateToPage('projects')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Projects
        </motion.button>
      </div>
    </div>
  )

  const renderProjectsPage = () => (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={goBack} className="mr-3 p-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        </div>
        <button className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <motion.button
            key={project.id}
            className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left"
            onClick={() => navigateToPage('project-detail', project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">{project.name}</h3>
              <span className="text-xs text-gray-500">{project.lastUpdate}</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">{project.client}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 text-xs text-gray-500">
                <span>{project.photos} photos</span>
                <span>{project.notes} notes</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                  <div 
                    className="bg-brand-orange h-1.5 rounded-full transition-all" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{project.progress}%</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )

  const renderPhotosPage = () => (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={goBack} className="mr-3 p-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Photos</h2>
        </div>
        <div className="flex space-x-2">
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      {/* Recent Photos */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 text-sm">Recent Photos</h3>
        {recentPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="flex items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
              <Image className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{photo.title}</div>
              <div className="text-xs text-gray-500">{photo.project} • {photo.time}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderVoicePage = () => (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={goBack} className="mr-3 p-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Voice Notes</h2>
        </div>
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isRecording ? 'bg-red-500' : 'bg-brand-orange'
          }`}
          onClick={() => setIsRecording(!isRecording)}
        >
          <Mic className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Voice Notes List */}
      <div className="space-y-3">
        {voiceNotes.map((note) => (
          <motion.div
            key={note.id}
            className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-10 h-10 bg-purple-500 rounded-xl mr-3 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{note.title}</div>
              <div className="text-xs text-gray-500">{note.project} • {note.time}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">{note.duration}</div>
              <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                <Play className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderReportsPage = () => (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={goBack} className="mr-3 p-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">AI Reports</h2>
        </div>
        <button className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Reports List */}
      <div className="space-y-3">
        {[
          { title: 'Weekly Progress Report', project: 'Kitchen Renovation', date: 'Mar 15, 2026', status: 'Ready' },
          { title: 'Safety Inspection Report', project: 'Bathroom Remodel', date: 'Mar 14, 2026', status: 'Generating...' },
          { title: 'Material Usage Report', project: 'Deck Installation', date: 'Mar 13, 2026', status: 'Ready' }
        ].map((report, index) => (
          <motion.div
            key={index}
            className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-10 h-10 bg-brand-orange rounded-xl mr-3 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{report.title}</div>
              <div className="text-xs text-gray-500">{report.project} • {report.date}</div>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-1 rounded-full ${
                report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {report.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'projects':
        return renderProjectsPage()
      case 'photos':
        return renderPhotosPage()
      case 'voice':
        return renderVoicePage()
      case 'reports':
        return renderReportsPage()
      default:
        return renderHomePage()
    }
  }

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

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 via-transparent to-blue-600/20" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-orange/30 to-red-500/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-500/25 to-purple-500/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
        />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgba(255,107,53,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating Tech Elements */}
        <motion.div
          className="absolute top-1/3 right-1/5 w-4 h-4 bg-brand-orange rounded-full"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-blue-400 rounded-full"
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full"
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-0.5 bg-brand-orange"></div>
              <span className="text-brand-orange font-medium tracking-wide uppercase text-sm">For Contractors</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-white"
            >
              Document Jobs.
              <br />
              <span className="bg-gradient-to-r from-brand-orange to-yellow-400 bg-clip-text text-transparent">
                Generate Reports.
              </span>
              <br />
              Get Paid Faster.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed max-w-lg"
            >
              The all-in-one mobile app that transforms how contractors capture, 
              organize, and report on job sites. From voice notes to client invoices.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-8 pt-4"
            >
              <div>
                <div className="text-2xl font-bold text-white">10x</div>
                <div className="text-sm text-gray-400">Faster Documentation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Early Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2026</div>
                <div className="text-sm text-gray-400">Launch Year</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button 
                onClick={() => scrollToElement('signup')}
                className="bg-gradient-to-r from-brand-orange to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-brand-orange/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Early Access
              </button>
              <button 
                onClick={() => scrollToElement('features')}
                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center group"
              >
                <ChevronRight className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Features
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Device Mockup */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative mx-auto w-80 h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-b from-gray-100 to-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-3 text-xs text-gray-800">
                    <span className="font-medium">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 border border-gray-800 rounded-sm">
                        <div className="w-3 h-1 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderCurrentPage()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Phone Details */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-brand-orange to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  )
}

export default HeroSection