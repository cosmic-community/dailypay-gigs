import { getAllJobs } from '@/lib/cosmic'
import { Job } from '@/types'
import JobCard from '@/components/JobCard'

export const revalidate = 60

export const metadata = {
  title: 'All Jobs - DailyPay Gigs',
  description: 'Browse all available gig opportunities with quick payment options',
}

export default async function JobsPage() {
  const jobs = await getAllJobs()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Job Opportunities
          </h1>
          <p className="text-xl text-gray-600">
            {jobs.length} opportunities available
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No jobs available at the moment</p>
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