import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true

  return {
    provide: {
      axios: axios
    }
  }
})
