import { type UserDto } from '../api/types'
import { type IUser } from '../model/types'

export function mapUser<T extends UserDto>(dto: T): IUser {
  return {
    userId: dto.id,
    email: dto.email,
    name: dto.user_metadata.name,
    password: dto.password,
    created_at: dto.created_at
  }
}
