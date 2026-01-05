import { getAllJobs, getAllCategories, getAllPlatforms } from '@/lib/cosmic'
import { Job, Category, Platform } from '@/types'
import JobCard from '@/components/JobCard'
import CategoryCard from '@/components/CategoryCard'
import PlatformCard from '@/components/PlatformCard'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [jobs, categories, platforms] = await Promise.all([
    getAllJobs(),
    getAllCategories(),
    getAllPlatforms(),
  ])

  const featuredJobs = (jobs as Job[]).slice(0, 6)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Paid Daily 💰
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find gig opportunities with instant, daily, and weekly pay
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {(categories as Category[]).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {category.metadata.category_name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Opportunities
            </h2>
            <Link
              href="/jobs"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(categories as Category[]).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Trusted Platforms
            </h2>
            <Link
              href="/platforms"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(platforms as Platform[]).map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Earning Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of people making money with flexible gig work
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Browse All Jobs
          </Link>
        </div>
      </section>
    </div>
  )
}