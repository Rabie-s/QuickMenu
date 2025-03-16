import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {

  async register({ request }: HttpContext) {

    const validatedData = await request.validateUsing(registerUserValidator)
    const user = await User.create(validatedData)

  }

  async login({ request }: HttpContext) {

    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    // Delete existing tokens

    const token = await User.accessTokens.create(user)

    return token.value?.release()
  }

  async logout({ auth }: HttpContext) {

    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }

  async me({ auth }: HttpContext) {
    return auth.user
  }

  async test({ auth }: HttpContext) {

    /*    await User.create({
         fullName: 'rabie',
         email: 'rabie@email.com',
         password: 'rabie@email.com',
         phoneNumber: '0772298958'
       }) */

    /*  const user = await User.query().preload('menus',(menuQuery)=>{

       menuQuery.preload('categories',(categoryQuery)=>{
         categoryQuery.preload('menuItems')
       })

     })
     return user */

/*     const user = await User.find(1)
    const menu = await user?.related('menus').query().first()
    const category = await menu.related('categories').query */

      const authUser =  auth.user
      authUser?.related('menus').create({
        name:'al-radwan',
        cover_image:'no3',
        is_available:false
      })






  }

}