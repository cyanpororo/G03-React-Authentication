import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from './ui/alert'

type Props = {
  children: React.ReactNode
  allowedRoles: string[]
}

export function RoleProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, isLoading, hasRole } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // Check roles first to show "Access Denied" instead of redirecting
  if (!hasRole(allowedRoles)) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Alert variant="destructive">
          <div className="font-semibold mb-1">Access Denied</div>
          <div>You don't have permission to view this page. Required role(s): {allowedRoles.join(', ')}</div>
        </Alert>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}