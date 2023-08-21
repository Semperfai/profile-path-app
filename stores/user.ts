import { defineStore } from 'pinia'

interface UserState {
  id: string
  theme_id: string
  name: string
  email: string
  image: string
  bio: string
  theme: null
  colors: null
  allLinks: null
  isMobile: boolean
  updatedLinkId: number
  addLinkOverlay: boolean
  isPreviewOverlay: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
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
