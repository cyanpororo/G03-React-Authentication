import { useAuth } from '../../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function Dashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Account Status', value: 'Active', color: 'text-green-600' },
    { label: 'Member Since', value: new Date(user?.created_at || Date.now()).toLocaleDateString(), color: 'text-blue-600' },
    { label: 'Email Verified', value: 'Yes', color: 'text-purple-600' },
  ]

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                  {user?.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900">{user?.email}</div>
                  <div className="text-sm text-gray-500">Account Active</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Email Address</div>
                    <div className="font-medium text-gray-900">{user?.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Account Created</div>
                    <div className="font-medium text-gray-900">
                      {new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Update Profile</div>
                <div className="text-sm text-gray-500">Change your account details</div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Security Settings</div>
                <div className="text-sm text-gray-500">Manage your password</div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Preferences</div>
                <div className="text-sm text-gray-500">Customize your experience</div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}