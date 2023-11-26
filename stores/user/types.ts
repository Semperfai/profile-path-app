import { type Color, type Link, type Theme } from '~/shared/types'
import { type UserId } from '~~/entities/user/model/types'

export interface UserState {
  id: UserId
  theme_id: number
  name: string
  email: Email
  image: string
  src: string
  bio: string
  theme: Theme | null
  colors: Color[]
  allLinks: Link[]
  isMobile: boolean
  updatedLinkId: number
  addLinkOverlay: boolean
  isPreviewOverlay: boolean
}
