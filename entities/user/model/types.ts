export type UserId = Brand<Id, 'UserId'>

export interface IUser {
  userId: UserId
  email: Email
  name: string
  password: string
  created_at: string
}
