export default defineNuxtRouteMiddleware((to, from) => {
    const userAuthStore = useUserAuthStore()
    if (!userAuthStore.isAuth === false) {
      return navigateTo('/user/auth/login')
    }
  })