import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Clock, Shield, Zap, TrendingUp, Award, Users as UsersIcon } from 'lucide-react'
import { Camera, Brain, Users, Users2, MapPin, CheckSquare } from 'lucide-react'
import { scrollToElement } from '@/utils/helpers'

const iconMap = {
  Camera,
  Brain,
  Users,
  Users2,
  MapPin,
  CheckSquare
}

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  benefits: string[]
}

interface FeatureModalProps {
  feature: Feature | null
  isOpen: boolean
  onClose: () => void
}

const FeatureModal = ({ feature, isOpen, onClose }: FeatureModalProps) => {
  if (!feature) return null

  const IconComponent = iconMap[feature.icon as keyof typeof iconMap]

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const getFeatureDetails = (id: string) => {
    switch (id) {
      case 'smart-capture':
        return {
          overview: 'Transform your project documentation with our advanced capture technology that combines voice recording, high-resolution photography, and intelligent organization into one seamless workflow.',
          details: 'ProjectCam\'s Smart Capture technology uses advanced AI to automatically organize your voice notes and photos by location, date, and project context. Our proprietary voice-to-text engine is specifically trained for construction and contractor terminology, ensuring 95% accuracy even in noisy environments.',
          keyFeatures: [
            { icon: Zap, title: 'Instant Voice-to-Text', description: 'Industry-leading accuracy with construction terminology' },
            { icon: Camera, title: 'Professional Photo Quality', description: 'High-resolution capture with automatic enhancement' },
            { icon: Shield, title: 'Offline Sync Capability', description: 'Works without internet, syncs when connected' },
            { icon: TrendingUp, title: 'Smart Organization', description: 'AI-powered categorization and tagging' }
          ],
          useCases: [
            { title: 'Daily Progress Documentation', description: 'Capture daily work progress with voice narration and photos' },
            { title: 'Quality Control Inspections', description: 'Document QC findings with precise voice notes and visual evidence' },
            { title: 'Client Walkthroughs', description: 'Create professional walkthrough documentation in real-time' },
            { title: 'Issue Reporting & Tracking', description: 'Document problems with context and track resolution progress' }
          ],
          stats: [
            { value: '95%', label: 'Voice Recognition Accuracy' },
            { value: '10x', label: 'Faster Documentation' },
            { value: '50+', label: 'File Formats Supported' }
          ]
        }
      case 'ai-reports':
        return {
          overview: 'Generate professional, comprehensive reports in seconds using our advanced AI that analyzes your photos, voice notes, and project data to create client-ready documentation.',
          details: 'Our AI Report Generator leverages machine learning trained on thousands of contractor reports to understand project contexts, identify key milestones, and generate professional summaries that impress clients and streamline billing processes.',
          keyFeatures: [
            { icon: Brain, title: 'AI Analysis Engine', description: 'Advanced ML algorithms trained on contractor workflows' },
            { icon: Clock, title: 'Instant Generation', description: 'Professional reports ready in under 30 seconds' },
            { icon: Award, title: 'Custom Templates', description: 'Industry-specific templates for different project types' },
            { icon: TrendingUp, title: 'Data Visualization', description: 'Charts, graphs, and progress tracking visuals' }
          ],
          useCases: [
            { title: 'Weekly Progress Reports', description: 'Automated summaries of work completed, time spent, and next steps' },
            { title: 'Client Billing Summaries', description: 'Detailed breakdowns with photo evidence and time tracking' },
            { title: 'Project Completion Reports', description: 'Comprehensive final reports with before/after documentation' },
            { title: 'Compliance Documentation', description: 'Regulatory-compliant reports for inspections and audits' }
          ],
          stats: [
            { value: '30sec', label: 'Average Report Generation' },
            { value: '20+', label: 'Report Templates' },
            { value: '99%', label: 'Client Satisfaction Rate' }
          ]
        }
      case 'client-management':
        return {
          overview: 'Streamline your client relationships with automated invoicing, payment tracking, and professional communication tools designed specifically for contractors.',
          details: 'Our Client Management system integrates seamlessly with your project documentation to create automated invoices based on work completed, track payments, and provide clients with real-time project access through secure portals.',
          keyFeatures: [
            { icon: Zap, title: 'Automated Invoicing', description: 'Generate invoices automatically from project data' },
            { icon: TrendingUp, title: 'Payment Tracking', description: 'Real-time payment status and follow-up reminders' },
            { icon: Shield, title: 'Secure Client Portals', description: 'Professional client access to project progress' },
            { icon: UsersIcon, title: 'Communication Hub', description: 'Centralized client communication and file sharing' }
          ],
          useCases: [
            { title: 'Automated Invoice Generation', description: 'Create professional invoices based on completed work and materials' },
            { title: 'Payment Status Tracking', description: 'Monitor payment status and send automated follow-up reminders' },
            { title: 'Client Project Portals', description: 'Give clients secure access to view project progress and reports' },
            { title: 'Professional Communication', description: 'Maintain organized communication history with all clients' }
          ],
          stats: [
            { value: '40%', label: 'Faster Payment Collection' },
            { value: '60%', label: 'Reduction in Late Payments' },
            { value: '95%', label: 'Client Satisfaction Score' }
          ]
        }
      case 'team-collaboration':
        return {
          overview: 'Enterprise-grade team management and real-time collaboration tools designed for contractors managing multiple job sites and team members.',
          details: 'Keep your entire team connected with real-time messaging, task assignment, progress tracking, and performance analytics. Perfect for coordinating work across multiple job sites while maintaining accountability and efficiency.',
          keyFeatures: [
            { icon: UsersIcon, title: 'Real-time Messaging', description: 'Instant communication across all job sites' },
            { icon: CheckSquare, title: 'Task Management', description: 'Assign, track, and manage team tasks efficiently' },
            { icon: TrendingUp, title: 'Performance Analytics', description: 'Track team productivity and project efficiency' },
            { icon: Shield, title: 'Role-based Access', description: 'Secure permissions based on team member roles' }
          ],
          useCases: [
            { title: 'Multi-site Coordination', description: 'Coordinate work across multiple job sites from one central hub' },
            { title: 'Task Assignment & Tracking', description: 'Assign specific tasks to team members and track completion' },
            { title: 'Real-time Updates', description: 'Instant notifications about project changes and updates' },
            { title: 'Team Performance Insights', description: 'Analyze team productivity and identify improvement opportunities' }
          ],
          stats: [
            { value: '50%', label: 'Improvement in Team Efficiency' },
            { value: '80%', label: 'Reduction in Miscommunication' },
            { value: '24/7', label: 'Real-time Synchronization' }
          ]
        }
      case 'gps-tracking':
        return {
          overview: 'Advanced GPS tracking and location intelligence that automatically tags every photo and voice note with precise coordinates while providing powerful mapping and route optimization tools.',
          details: 'Our GPS Tracking system uses advanced location services to automatically tag all your project documentation with precise coordinates, create interactive project maps, and optimize travel routes between job sites for maximum efficiency.',
          keyFeatures: [
            { icon: MapPin, title: 'Precise Location Tagging', description: 'Automatic GPS coordinates for all photos and notes' },
            { icon: TrendingUp, title: 'Project Mapping', description: 'Interactive maps showing all project locations' },
            { icon: Zap, title: 'Route Optimization', description: 'Find the most efficient routes between job sites' },
            { icon: Award, title: 'Geographic Insights', description: 'Analyze project distribution and travel patterns' }
          ],
          useCases: [
            { title: 'Automatic Location Tagging', description: 'Every photo and voice note tagged with precise GPS coordinates' },
            { title: 'Interactive Project Maps', description: 'Visualize all your projects on interactive maps with detailed information' },
            { title: 'Route Optimization', description: 'Plan the most efficient routes between multiple job sites' },
            { title: 'Geographic Analytics', description: 'Analyze project distribution and identify expansion opportunities' }
          ],
          stats: [
            { value: '<3m', label: 'GPS Accuracy' },
            { value: '25%', label: 'Reduction in Travel Time' },
            { value: '100%', label: 'Documentation Coverage' }
          ]
        }
      case 'custom-workflows':
        return {
          overview: 'Create personalized checklists and workflows tailored to your specific processes, ensuring consistency, quality, and compliance across all your projects.',
          details: 'Our Custom Workflows system allows you to create standardized processes for inspections, quality control, and project management. Ensure every project meets your standards while maintaining compliance with industry regulations.',
          keyFeatures: [
            { icon: CheckSquare, title: 'Custom Checklists', description: 'Create detailed checklists for any process or inspection' },
            { icon: TrendingUp, title: 'Progress Tracking', description: 'Monitor completion status across all projects' },
            { icon: Shield, title: 'Quality Assurance', description: 'Ensure consistent quality standards on every project' },
            { icon: Award, title: 'Compliance Reporting', description: 'Generate compliance reports for regulatory requirements' }
          ],
          useCases: [
            { title: 'Custom Inspection Checklists', description: 'Create detailed inspection protocols for different project types' },
            { title: 'Quality Assurance Workflows', description: 'Standardize quality control processes across all projects' },
            { title: 'Compliance Verification', description: 'Ensure all projects meet regulatory and safety requirements' },
            { title: 'Process Standardization', description: 'Create consistent workflows that scale across your business' }
          ],
          stats: [
            { value: '90%', label: 'Reduction in Quality Issues' },
            { value: '100%', label: 'Compliance Rate' },
            { value: '45%', label: 'Faster Project Completion' }
          ]
        }
      default:
        return {
          overview: 'Powerful features designed to streamline your workflow and improve project outcomes.',
          details: 'Advanced tools and capabilities designed specifically for contractors and project management professionals.',
          keyFeatures: [
            { icon: Zap, title: 'Enhanced Productivity', description: 'Streamline your daily workflows' },
            { icon: TrendingUp, title: 'Better Organization', description: 'Keep your projects organized and accessible' },
            { icon: UsersIcon, title: 'Improved Communication', description: 'Better collaboration with clients and teams' }
          ],
          useCases: [
            { title: 'Enhanced Productivity', description: 'Streamline your daily workflows and processes' },
            { title: 'Better Organization', description: 'Keep all your project information organized and accessible' },
            { title: 'Improved Communication', description: 'Better collaboration with clients and team members' }
          ],
          stats: [
            { value: '100%', label: 'User Satisfaction' },
            { value: '24/7', label: 'Available Support' },
            { value: '∞', label: 'Possibilities' }
          ]
        }
    }
  }

  const { overview, details, keyFeatures, useCases, stats } = getFeatureDetails(feature.id)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 pb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-3xl">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-white/80 rounded-xl transition-colors duration-200 backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-start space-x-6">
                  <div className="feature-icon flex-shrink-0 transform scale-125">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-display font-bold text-brand-black mb-3">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-brand-gray-dark mb-4 leading-relaxed">
                      {overview}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mt-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-brand-orange">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Technical Details */}
                <div className="mb-10">
                  <h3 className="text-xl font-display font-bold text-brand-black mb-4 flex items-center">
                    <div className="w-1 h-6 bg-brand-orange rounded-full mr-3"></div>
                    How it Works
                  </h3>
                  <p className="text-brand-gray-dark leading-relaxed text-lg">
                    {details}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-10">
                  <h3 className="text-xl font-display font-bold text-brand-black mb-6 flex items-center">
                    <div className="w-1 h-6 bg-brand-orange rounded-full mr-3"></div>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyFeatures.map((keyFeature, index) => {
                      const FeatureIcon = keyFeature.icon
                      return (
                        <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FeatureIcon className="w-5 h-5 text-brand-orange" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-brand-black mb-1">{keyFeature.title}</h4>
                              <p className="text-sm text-brand-gray-dark">{keyFeature.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Core Benefits */}
                <div className="mb-10">
                  <h3 className="text-xl font-display font-bold text-brand-black mb-6 flex items-center">
                    <div className="w-1 h-6 bg-brand-orange rounded-full mr-3"></div>
                    Core Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-brand-gray-dark font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div className="mb-10">
                  <h3 className="text-xl font-display font-bold text-brand-black mb-6 flex items-center">
                    <div className="w-1 h-6 bg-brand-orange rounded-full mr-3"></div>
                    Real-World Applications
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {useCases.map((useCase, index) => (
                      <div key={index} className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <h4 className="font-semibold text-brand-black mb-2 flex items-center">
                          <div className="w-2 h-2 bg-brand-orange rounded-full mr-3" />
                          {useCase.title}
                        </h4>
                        <p className="text-sm text-brand-gray-dark leading-relaxed">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-brand-orange/5 to-brand-orange/10 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-brand-black mb-2">Ready to get started?</h4>
                    <p className="text-brand-gray-dark mb-4">Join the contractors already using ProjectCam to streamline their workflows.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => {
                          onClose()
                          scrollToElement('signup')
                        }}
                        className="btn-primary flex-1 py-3"
                      >
                        Get Early Access
                      </button>
                      <button 
                        onClick={() => {
                          onClose()
                          scrollToElement('features')
                        }}
                        className="btn-outline flex-1 py-3"
                      >
                        View All Features
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FeatureModal