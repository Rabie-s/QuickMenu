
export const useUserAuthStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
        isAuth:false,
    }),
    persist: true,
    actions: {
        async login(data: any) {

            const res:any = await Fetch('user/v1/login', {
                method: 'POST',
                body: {
                    ...data
                },
            });
            this.user = res.user
            this.token = res.token
            this.isAuth = true
            return res

        },
        async logout() {

            const res:any = await Fetch('user/v1/logout', {
                method: 'DELETE',
            });
            this.user = null
            this.token = null
            this.isAuth = false 
            return res

        }
    },
    
})
