export const Fetch = (path:string,opts:any)=>{
    const userAuthStore = useUserAuthStore()
    const config = useRuntimeConfig()
    return $fetch(path,{
        baseURL:config.public.apiBase,
        ...opts,
        headers: {
            ...(opts.headers || {}),
            ...(userAuthStore.token ? { authorization: `Bearer ${userAuthStore.token}` } : {}),
        },
    })
}