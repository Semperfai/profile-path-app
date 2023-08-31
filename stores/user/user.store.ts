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
  actions: {
    hidePageOverflow(val: boolean, id: string): void {
      let el: HTMLElement | null = null

      el = document.getElementById(id)

      if (val) {
        document.body.style.overflow = 'hidden'
        if (id && el) {
          el.style.overflow = 'hidden'
        }
        return
      }

      document.body.style.overflow = 'visible'
      if (id && el) {
        el.style.overflow = 'hidden'
      }
    },
    allLowerCaseNoCaps(str: string): string {
      return str.split(' ').join('').toLowerCase()
    },
    async getUser(id: UserId) {
      this.$state.id = id
      console.log('getUser', id)
    },
    resetState() {
      this.$state.id = '' as UserId
      this.$state.name = ''
      this.$state.email = ''
      this.$state.image = ''
      this.$state.bio = ''
      this.$state.theme_id = ''
      this.$state.theme = null
      this.$state.colors = []
      this.$state.allLinks = []
      this.$state.isMobile = false
      this.$state.updatedLinkId = 0
      this.$state.addLinkOverlay = false
      this.$state.isPreviewOverlay = false
    }
  },
  persist: true
})
