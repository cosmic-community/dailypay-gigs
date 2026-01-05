import { getAllPlatforms } from '@/lib/cosmic'
import { Platform } from '@/types'
import PlatformCard from '@/components/PlatformCard'

export const revalidate = 60

export const metadata = {
  title: 'Gig Platforms - DailyPay Gigs',
  description: 'Browse trusted gig economy platforms',
}

export default async function PlatformsPage() {
  const platforms = await getAllPlatforms()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted Platforms
          </h1>
          <p className="text-xl text-gray-600">
            Discover reliable gig platforms with great ratings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(platforms as Platform[]).map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    </div>
  )
}