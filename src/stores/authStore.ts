import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const user = ref<any>(null)

  const isLogged = computed(() => !!accessToken.value && !!user.value)

  async function login(payload: any) {
    try {
      const { data } = await api.post('/auth/login', payload)

      accessToken.value = data.accessToken
      localStorage.setItem('accessToken', data.accessToken)

      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`

      await fetchProfile(data.accessToken)

      return true
    } catch (err) {
      logout()
      throw err
    }
  }

  async function fetchProfile(manualToken?: string) {
    const token = manualToken || accessToken.value
    if (!token) return

    const { data } = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    user.value = data
  }

  async function register(payload: any) {
    try {
      const { data } = await api.post('/auth/register', payload)
      accessToken.value = data.accessToken
      localStorage.setItem('accessToken', data.accessToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`

      await fetchProfile(data.accessToken)
      return true
    } catch (err) {
      throw err
    }
  }

  function logout() {
    accessToken.value = null
    user.value = null
    localStorage.removeItem('accessToken')
    delete api.defaults.headers.common['Authorization']
  }

  return { accessToken, user, isLogged, login, register, logout, fetchProfile }
})
