import { api } from './client'

export type RegisterInput = { email: string; password: string }
export type RegisterResponse = {
  message: string
  user: { id: string; email: string; created_at: string }
}

export async function registerUser(input: RegisterInput): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>('/user/register', input)
  return data
}