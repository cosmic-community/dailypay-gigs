import { PaymentFrequency } from '@/types'

interface PaymentFrequencyBadgeProps {
  frequency: PaymentFrequency
  size?: 'sm' | 'md'
}

export default function PaymentFrequencyBadge({ 
  frequency, 
  size = 'md' 
}: PaymentFrequencyBadgeProps) {
  const getBadgeColor = (key: string) => {
    switch (key) {
      case 'instant':
        return 'bg-green-100 text-green-800'
      case 'daily':
        return 'bg-blue-100 text-blue-800'
      case 'weekly':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'

  return (
    <span
      className={`inline-block rounded-full font-medium ${getBadgeColor(
        frequency.key
      )} ${sizeClasses}`}
    >
      {frequency.value}
    </span>
  )
}