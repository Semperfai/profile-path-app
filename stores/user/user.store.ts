import axios from '~/plugins/axios'
import { defineStore } from 'pinia'
import type { UserState } from './types'
import type { UserId } from '~/entities/user/model/types'

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
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response: any) => {
          return response
        },
        (error: any) => {
          switch (error.response.status) {
            case 401:
            case 419:
            case 503:
              this.resetState()
              window.location.href = '/'
              break
            case 500:
              alert('Oops, something went wrong!  The team has been notified.')
              break
            default:
              return Promise.reject(error)
          }
        }
      )
    },
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

    async createUser(user: any) {
      console.log(user)
      const newUser = await $axios.post('/api/prisma/create-user', user)
    },
    async getUser(id: UserId) {
      const user = await $axios.get(`/api/prisma/get-user-by-id/${id}`)
      if (user) {
        this.$state.id = id
      }
      console.log('getUser', user)
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
  }
  // persist: true
})
