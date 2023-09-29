import axios from '~/plugins/axios'
import { defineStore } from 'pinia'
import type { UserState } from './types'
import type { UserId, IUser } from '~/entities/user/model/types'
import { type Link } from '~~/shared/types'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '' as UserId,
    theme_id: -1,
    name: '',
    email: '',
    image: '',
    src: 'https://picsum.photos/id/4/300/320',
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
    async createUser(user: IUser) {
      const res = await $axios.post('/api/prisma/create-user', user)
      this.$state.id = res.data.userId
      this.getUser()
    },
    async getUser() {
      const supabase = useSupabaseClient()

      const user = await $axios.get(
        `/api/prisma/get-user-by-id/${this.$state.id}`
      )
      if (user) {
        this.$state.name = user.data.name
        this.$state.email = user.data.email
        this.$state.theme_id = user.data.theme_id
        this.$state.bio = user.data.bio
        this.$state.image = user.data.image

        const { data, error } = await supabase.storage
          .from('users')
          .download(this.$state.image)
        if (error) throw error

        this.$state.src = URL.createObjectURL(data)

        this.getUserTheme()
        this.getAllLinks()
      }
    },
    getUserTheme() {
      this.$state.colors.forEach((color) => {
        if (this.$state.theme_id === color.id) {
          this.$state.theme = color
        }
      })
    },
    async updateUserDetails(name: string, bio: string) {
      const user = await $axios.get(
        `/api/prisma/get-user-by-id/${this.$state.id}`
      )
      if (!user) return
      await $axios.patch(`/api/prisma/update-user-details/${user.data.id}`, {
        name: name,
        bio: bio
      })
    },
    async updateUserTheme(themeId: number) {
      const user = await $axios.get(
        `/api/prisma/get-user-by-id/${this.$state.id}`
      )
      if (!user) return
      const res = await $axios.patch(
        `/api/prisma/update-user-theme/${user.data.id}`,
        {
          theme_id: themeId
        }
      )
      this.$state.theme_id = res.data.theme_id
      this.getUserTheme()
    },
    async updateUserImage(path: string) {
      try {
        const user = await $axios.get(
          `/api/prisma/get-user-by-id/${this.$state.id}`
        )
        if (!user) return
        const supabase = useSupabaseClient()

        await $axios.patch(`/api/prisma/update-user-image/${user.data.id}`, {
          image: path
        })

        const { data, error } = await supabase.storage
          .from('users')
          .download(this.$state.image)
        if (error) throw error

        this.$state.src = URL.createObjectURL(data)
      } catch (error: any) {
        console.error('Error downloading image: ', error.message)
      }
    },
    async getAllLinks() {
      const supabase = useSupabaseClient()
      let links = []
      try {
        const res = await $axios.get(
          `/api/prisma/get-all-links-by-user/${this.$state.id}`
        )
        if (res.data) {
          const tasks = res.data.map(async (link: Link) => {
            if (link.image) {
              const { data, error } = await supabase.storage
                .from('users')
                .download(link.image)
              if (error) throw error

              return {
                ...link,
                src: URL.createObjectURL(data)
              }
            }
            return link
          })

          links = await Promise.all(tasks)
          this.$state.allLinks = links
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addLink(name: string, url: string) {
      await $axios.post('/api/prisma/add-link', {
        userId: this.$state.id,
        name: name,
        url: url
      })
    },
    async updateLink(id: number, name: string, url: string) {
      await $axios.patch(`/api/prisma/update-link/${id}`, {
        name: name,
        url: url
      })
    },
    async updateLinkImage(id: number, path: string) {
      try {
        await $axios.patch(`/api/prisma/update-link-image/${id}`, {
          image: path
        })
      } catch (error: any) {
        console.error('Error downloading image: ', error.message)
      }
    },
    async deleteLink(id: number) {
      await $axios.delete(`/api/prisma/delete-link/${id}`)
    },
    resetState() {
      this.$state.id = '' as UserId
      this.$state.name = ''
      this.$state.email = ''
      this.$state.image = ''
      this.$state.bio = ''
      this.$state.theme_id = -1
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
