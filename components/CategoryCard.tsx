import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {category.metadata.category_name}
      </h3>
      {category.metadata.description && (
        <p className="text-gray-600">
          {category.metadata.description}
        </p>
      )}
      <div className="mt-4 text-blue-600 font-semibold">
        Browse Jobs →
      </div>
    </Link>
  )
}