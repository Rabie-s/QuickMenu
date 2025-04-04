// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import vueDevTools from 'vite-plugin-vue-devtools'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss(), vueDevTools()] },
  modules: ['@nuxt/fonts', 'nuxt-toastify', '@pinia/nuxt','pinia-plugin-persistedstate/nuxt','nuxt-headlessui'],

  app: {
    head: {
      link
        : [{
          rel
            : 'stylesheet', href
            : 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
        }]
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3333' 
    }
  },

  toastify: {
    autoClose: 2000,
    position: 'top-right',
    theme: 'colored',
  },




})