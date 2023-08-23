import axios from '~/plugins/axios'
import { defineStore } from 'pinia'
import type { UserState, UserId } from './types'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '' as UserId,
    theme_id: '',
    name: '',
    email: '',
    image: '',
    bio: '',
    theme: null,
    colors: [],
    allLinks: [],
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false
  }),
  getters: {},
  actions: {},
  persist: true
})
