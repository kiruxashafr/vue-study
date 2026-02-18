export interface RegisterPayload {
  email: string
  password: string
  name: string
}
export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
}

export interface UserProfileResponse {
  id: string
  email: string
  name: string
  createdAt: Date
}
