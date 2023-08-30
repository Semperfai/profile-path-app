import { useUserStore } from '~~/stores/user/user.store'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (to.fullPath === '/' && userStore.id) {
    return navigateTo('/admin')
  }

  if (to.fullPath === '/register' && userStore.id) {
    return navigateTo('/admin')
  }
})
