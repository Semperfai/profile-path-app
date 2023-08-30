import { useUserStore } from '~~/stores/user/user.store'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (!userStore.id) {
    return navigateTo('/')
  }
})
