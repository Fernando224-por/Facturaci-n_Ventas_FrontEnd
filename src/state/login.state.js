import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware"
import Cookies from 'js-cookie'
import { loginRequest, logoutRequest, verifyRequest } from '../api/auth.js'

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        loading: true,
        user: undefined,
        loginUser: async (data) => {
          try {
            const res = await loginRequest(data)
            set({ isAuthenticated: true, user: res.data.info })
          } catch (error) {
            set({ isAuthenticated: false, user: undefined })
          }
        },
        logoutUser: async () => {
          try {
            const res = await logoutRequest()
            if (res.status === 200) {
              set({ isAuthenticated: false, user: undefined })
              Cookies.remove('token')
            }
          } catch (error) {
            console.error(error)
          }
        },
        verifyLogin: async () => {
          const clientToken = Cookies.get()
          if (!clientToken.token) {
            set({ isAuthenticated: false, loading: false })
            return
          }
          try {
            const res = await verifyRequest()
            if (!res.data) {
              set({ isAuthenticated: false, loading: false })
              return
            } else {
              set({ isAuthenticated: true, loading: false })
              return
            }
          } catch (error) {
            set({ isAuthenticated: false, loading: false })
          }
        }
      }), {
      name: 'user-Store'
    })
  )
)