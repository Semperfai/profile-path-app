export interface UserDto {
  id: string
  email?: string
  user_metadata?: {
    name: string
  }
  created_at: string
}
