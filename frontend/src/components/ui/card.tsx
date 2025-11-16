import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('p-6 border-b border-gray-200', className)}>{children}</div>
}

export function CardTitle({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>
}

export function CardContent({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('p-6', className)}>{children}</div>
}