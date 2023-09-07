import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {
  if (NuxtApp) {
    axios.defaults.baseURL = useRuntimeConfig().public.apiBase
  }
  axios.defaults.withCredentials = true

  return {
    provide: {
      axios: axios
    }
  }
})
