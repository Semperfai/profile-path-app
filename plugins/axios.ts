import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = 'https://localhost:3000'
  axios.defaults.withCredentials = true

  return {
    provide: {
      axios: axios
    }
  }
})
