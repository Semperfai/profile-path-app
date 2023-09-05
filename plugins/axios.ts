import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = process.env.API_BASE
  axios.defaults.withCredentials = true

  return {
    provide: {
      axios: axios
    }
  }
})
