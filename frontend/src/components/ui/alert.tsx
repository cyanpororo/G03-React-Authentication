import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'destructive' | 'success'

export function Alert({
  variant = 'default',
  className,
  children,
}: PropsWithChildren<{ variant?: Variant; className?: string }>) {
  const styles: Record<Variant, string> = {
    default: 'bg-gray-50 text-gray-800 border-gray-200',
    destructive: 'bg-red-50 text-red-900 border-red-200',
    success: 'bg-green-50 text-green-900 border-green-200',
  }

  const role = variant === 'destructive' ? 'alert' : 'status'
  const ariaLive = variant === 'destructive' ? 'assertive' : 'polite'

  return (
    <div
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className={cn('w-full rounded-lg border p-3 text-sm', styles[variant], className)}
    >
      {children}
    </div>
  )
}