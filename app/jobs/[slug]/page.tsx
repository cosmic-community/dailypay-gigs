import { getJobBySlug, getAllJobs } from '@/lib/cosmic'
import { Job } from '@/types'
import Link from 'next/link'
import PaymentFrequencyBadge from '@/components/PaymentFrequencyBadge'

export const revalidate = 60

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  
  return jobs.map((job) => ({
    slug: job.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJobBySlug(slug)
  
  if (!job) {
    return {
      title: 'Job Not Found',
    }
  }
  
  return {
    title: `${job.metadata.job_title} - DailyPay Gigs`,
    description: job.metadata.description.substring(0, 160),
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJobBySlug(slug) as Job | null
  
  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <Link href="/jobs" className="text-blue-600 hover:text-blue-700">
          ← Back to Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/jobs"
          className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
        >
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          {job.metadata.featured_image && (
            <img
              src={`${job.metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
              alt={job.metadata.job_title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {job.metadata.job_title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">
                {job.metadata.pay_rate}
              </span>
            </div>
            <PaymentFrequencyBadge frequency={job.metadata.payment_frequency} />
            {job.metadata.category && (
              <Link
                href={`/categories/${job.metadata.category.slug}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {job.metadata.category.metadata.category_name}
              </Link>
            )}
          </div>

          {job.metadata.platform && (
            <div className="border-t pt-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Available on</p>
              <Link
                href={`/platforms/${job.metadata.platform.slug}`}
                className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                {job.metadata.platform.metadata.logo && (
                  <img
                    src={`${job.metadata.platform.metadata.logo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={job.metadata.platform.metadata.platform_name}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {job.metadata.platform.metadata.platform_name}
                  </p>
                  {job.metadata.platform.metadata.rating && (
                    <p className="text-sm text-gray-600">
                      ⭐ {job.metadata.platform.metadata.rating.toFixed(1)} / 5.0
                    </p>
                  )}
                </div>
              </Link>
            </div>
          )}

          {job.metadata.how_to_apply && (
            <a
              href={job.metadata.how_to_apply}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now →
            </a>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Job Description
          </h2>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: job.metadata.description }}
          />
        </div>

        {/* Requirements */}
        {job.metadata.requirements && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="text-gray-700 whitespace-pre-line">
              {job.metadata.requirements}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}