import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold text-gray-900">
              DailyPay Gigs
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Jobs
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/platforms"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Platforms
            </Link>
          </nav>

          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </header>
  )
}