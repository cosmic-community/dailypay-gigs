import Link from 'next/link'
import { Platform } from '@/types'

interface PlatformCardProps {
  platform: Platform
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex items-start gap-4 mb-4">
        {platform.metadata.logo && (
          <img
            src={`${platform.metadata.logo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={platform.metadata.platform_name}
            className="w-16 h-16 object-contain"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {platform.metadata.platform_name}
          </h3>
          {platform.metadata.rating && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>⭐</span>
              <span>{platform.metadata.rating.toFixed(1)} / 5.0</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {platform.metadata.description}
      </p>

      {platform.metadata.payment_method && (
        <div className="text-sm">
          <span className="text-gray-500">Payment: </span>
          <span className="text-gray-900 font-medium">
            {platform.metadata.payment_method}
          </span>
        </div>
      )}
    </Link>
  )
}