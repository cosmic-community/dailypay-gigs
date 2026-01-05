import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all jobs with relationships
export async function getAllJobs() {
  try {
    const response = await cosmic.objects
      .find({ type: 'jobs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch jobs')
  }
}

// Fetch jobs by category
export async function getJobsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'jobs',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch jobs by category')
  }
}

// Fetch jobs by platform
export async function getJobsByPlatform(platformId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'jobs',
        'metadata.platform': platformId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch jobs by platform')
  }
}

// Fetch single job by slug
export async function getJobBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'jobs', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch job')
  }
}

// Fetch all categories
export async function getAllCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch single category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Fetch all platforms
export async function getAllPlatforms() {
  try {
    const response = await cosmic.objects
      .find({ type: 'platforms' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch platforms')
  }
}

// Fetch single platform by slug
export async function getPlatformBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'platforms', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch platform')
  }
}