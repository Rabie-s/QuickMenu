import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {

  async register({ request, response }: HttpContext) {

    try {
      const validatedData = await request.validateUsing(registerUserValidator)
      await User.create(validatedData)
      response.status(201).send('User created successfully')

    } catch (error) {
      return response.status(400).send({
        message: 'Validation failed',
        errors: error.messages,
      })
    }


  }

  async login({ request,response }: HttpContext) {

    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    // Delete existing tokens

    const token = await User.accessTokens.create(user)
    return response.status(200).send({
      user:user,
      token:token.value?.release()
    })
  }

  async logout({ auth }: HttpContext) {

    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }

  async me({ auth }: HttpContext) {
    return auth.user
  }

  async test({ response }: HttpContext) {
    const users = await User.all()
    //return response.status(500).json({ error: "Something went wrong" });
    return await new Promise((resolve) => setTimeout(() => resolve(users), 2000));
     
  }


}