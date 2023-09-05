export type UserId = Brand<Id, 'UserId'>

export interface IUser {
  userId: UserId
  email?: string
  name?: string
  created_at: string
}
