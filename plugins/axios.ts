import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {
  if (NuxtApp) {
    axios.defaults.baseURL = useRuntimeConfig().public.apiBase
  }
  console.log('axios.defaults.baseURL', axios.defaults.baseURL)
  axios.defaults.withCredentials = true

  return {
    provide: {
      axios: axios
    }
  }
})
