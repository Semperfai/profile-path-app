import { UserId } from '../model/types'

export interface UserDto {
  id: UserId
  email: string
  user_metadata: {
    name: string
  }
  password: string
  created_at: string
}
