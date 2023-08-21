import { defineStore } from 'pinia'

type UserId = Brand<Id, 'UserId'>

interface UserState {
  id: UserId
  theme_id: Id
  name: string
  email: Email
  image: string
  bio: string
  theme: null
  colors: null
  allLinks: Url[] | null
  isMobile: boolean
  updatedLinkId: number
  addLinkOverlay: boolean
  isPreviewOverlay: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '' as UserId,
    theme_id: '',
    name: '',
    email: '',
    image: '',
    bio: '',
    theme: null,
    colors: null,
    allLinks: null,
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false
  }),
  getters: {},
  actions: {}
})
