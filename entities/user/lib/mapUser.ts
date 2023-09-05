import { type IUser, UserId } from '../model/types'
import type { User } from '@supabase/gotrue-js/dist/module/lib/types.d.ts'

export function mapUser(dto: User): IUser {
  return {
    userId: dto.id as UserId,
    email: dto.email,
    name: dto.user_metadata?.name,
    created_at: dto.created_at
  }
}
