import Link from 'next/link'
import { Job } from '@/types'
import PaymentFrequencyBadge from './PaymentFrequencyBadge'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      {job.metadata.featured_image && (
        <img
          src={`${job.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
          alt={job.metadata.job_title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {job.metadata.job_title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            {job.metadata.pay_rate}
          </span>
          <PaymentFrequencyBadge frequency={job.metadata.payment_frequency} size="sm" />
        </div>

        {job.metadata.platform && (
          <div className="flex items-center gap-2 mb-3">
            {job.metadata.platform.metadata.logo && (
              <img
                src={`${job.metadata.platform.metadata.logo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                alt={job.metadata.platform.metadata.platform_name}
                className="w-6 h-6 object-contain"
              />
            )}
            <span className="text-sm text-gray-600">
              {job.metadata.platform.metadata.platform_name}
            </span>
          </div>
        )}

        {job.metadata.category && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {job.metadata.category.metadata.category_name}
          </span>
        )}
      </div>
    </Link>
  )
}