export interface EmailSignupData {
  email: string
  name?: string
  source?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  image?: string
  benefits: string[]
}

export interface PhoneMockup {
  id: string
  title: string
  description: string
  images: string[]
  features: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  tags: string[]
  featured: boolean
}