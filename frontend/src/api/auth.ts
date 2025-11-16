import { api, setAccessToken, setRefreshToken, clearTokens } from './client'

export type LoginInput = { email: string; password: string }

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    role: string
  }
}

export type UserProfile = {
  id: string
  email: string
  role: string
  created_at: string
}

export async function login(input: LoginInput): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', input)
  
  // Store tokens
  setAccessToken(data.accessToken)
  setRefreshToken(data.refreshToken)
  
  // Broadcast login to other tabs
  const authChannel = typeof BroadcastChannel !== 'undefined' 
    ? new BroadcastChannel('auth_channel') 
    : null
  
  if (authChannel) {
    authChannel.postMessage({ type: 'login', timestamp: Date.now() })
    authChannel.close()
  }
  
  return data
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } finally {
    clearTokens()
  }
}

export async function getProfile(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>('/auth/profile')
  return data
}

export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
  const { data } = await api.post<{ accessToken: string }>('/auth/refresh', { refreshToken })
  return data
}