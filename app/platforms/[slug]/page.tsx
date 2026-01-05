import { getPlatformBySlug, getJobsByPlatform, getAllPlatforms } from '@/lib/cosmic'
import { Platform, Job } from '@/types'
import Link from 'next/link'
import JobCard from '@/components/JobCard'

export const revalidate = 60

export async function generateStaticParams() {
  const platforms = await getAllPlatforms()
  
  return platforms.map((platform) => ({
    slug: platform.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const platform = await getPlatformBySlug(slug)
  
  if (!platform) {
    return {
      title: 'Platform Not Found',
    }
  }
  
  return {
    title: `${platform.metadata.platform_name} Jobs - DailyPay Gigs`,
    description: platform.metadata.description,
  }
}

export default async function PlatformDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const platform = await getPlatformBySlug(slug) as Platform | null
  
  if (!platform) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Platform Not Found</h1>
        <Link href="/platforms" className="text-blue-600 hover:text-blue-700">
          ← Back to Platforms
        </Link>
      </div>
    )
  }

  const jobs = await getJobsByPlatform(platform.id)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/platforms"
          className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
        >
          ← Back to Platforms
        </Link>

        {/* Platform Info Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start gap-6">
            {platform.metadata.logo && (
              <img
                src={`${platform.metadata.logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={platform.metadata.platform_name}
                className="w-24 h-24 object-contain"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {platform.metadata.platform_name}
              </h1>
              {platform.metadata.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-semibold">
                    {platform.metadata.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              )}
              <p className="text-gray-700 mb-4">
                {platform.metadata.description}
              </p>
              {platform.metadata.payment_method && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Payment Method:</p>
                  <p className="font-medium text-gray-900">
                    {platform.metadata.payment_method}
                  </p>
                </div>
              )}
              {platform.metadata.website_url && (
                <a
                  href={platform.metadata.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Available Jobs */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Opportunities
          </h2>
          <p className="text-lg text-gray-600">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available on this platform
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-xl text-gray-600">No jobs available on this platform yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(jobs as Job[]).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}