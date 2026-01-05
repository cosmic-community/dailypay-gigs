// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getJobsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Job } from '@/types'
import Link from 'next/link'
import JobCard from '@/components/JobCard'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category: Category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.metadata.category_name} Jobs - DailyPay Gigs`,
    description: category.metadata.description || `Browse ${category.metadata.category_name} opportunities`,
  }
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <Link href="/categories" className="text-blue-600 hover:text-blue-700">
          ← Back to Categories
        </Link>
      </div>
    )
  }

  const jobs = await getJobsByCategory(category.id)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/categories"
          className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
        >
          ← Back to Categories
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.metadata.category_name}
          </h1>
          {category.metadata.description && (
            <p className="text-xl text-gray-600">
              {category.metadata.description}
            </p>
          )}
          <p className="text-lg text-gray-500 mt-2">
            {jobs.length} {jobs.length === 1 ? 'opportunity' : 'opportunities'} available
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No jobs in this category yet</p>
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