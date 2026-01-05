// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Payment frequency type
export type PaymentFrequencyKey = 'instant' | 'daily' | 'weekly'

export interface PaymentFrequency {
  key: PaymentFrequencyKey
  value: string
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    category_name: string
    description?: string
  }
}

// Platform interface
export interface Platform extends CosmicObject {
  type: 'platforms'
  metadata: {
    platform_name: string
    description: string
    website_url?: string
    rating?: number
    payment_method?: string
    logo?: {
      url: string
      imgix_url: string
    }
  }
}

// Job interface
export interface Job extends CosmicObject {
  type: 'jobs'
  metadata: {
    job_title: string
    description: string
    pay_rate: string
    payment_frequency: PaymentFrequency
    requirements?: string
    how_to_apply?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    platform?: Platform
    category?: Category
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Type guards
export function isJob(obj: CosmicObject): obj is Job {
  return obj.type === 'jobs'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

export function isPlatform(obj: CosmicObject): obj is Platform {
  return obj.type === 'platforms'
}