import { getAllCategories } from '@/lib/cosmic'
import { Category } from '@/types'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60

export const metadata = {
  title: 'Job Categories - DailyPay Gigs',
  description: 'Browse job opportunities by category',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Categories
          </h1>
          <p className="text-xl text-gray-600">
            Find the right type of work for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(categories as Category[]).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}