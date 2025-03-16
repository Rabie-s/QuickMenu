import type { HttpContext } from '@adonisjs/core/http'
import { createMenuValidator, updateMenuValidator } from '#validators/menu'
import { upload, deleteFile } from '../../helpers/helpers.js'
export default class MenusController {

  async index({ auth, response }: HttpContext) {
    try {
      const authenticatedUser = auth.user
      const menu = await authenticatedUser?.related('menus').query()
      return menu
    } catch (error) {
      return response.notFound({ message: 'Menus not found.' })
    }

  }


  async store({ auth, request, response }: HttpContext) {
    const authenticatedUser = auth.user
    const validatedData = await request.validateUsing(createMenuValidator)
    const coverImage = request.file('cover_image')

    const imageName = await upload(coverImage)
    validatedData.cover_image = imageName

    authenticatedUser?.related('menus').create(validatedData)
    return response.created({ message: 'created successfully' })

  }


  async show({ params, auth, response }: HttpContext) {
    const authenticatedUser = auth.user
    try {
      const menu = await authenticatedUser?.related('menus').query()
        .where('id', params.id)
        .firstOrFail()
      return menu
    } catch (error) {
      return response.notFound({ message: 'Menu not found.' })
    }

  }


  async update({ params, auth, request, response }: HttpContext) {
    const authenticatedUser = auth.user
    const validatedData = await request.validateUsing(updateMenuValidator)
    const coverImage = request.file('cover_image')
    const menu = await authenticatedUser?.related('menus').query().where('id', params.id)
      .firstOrFail()
    if (coverImage) {
      deleteFile(menu.cover_image)
      const imageName = await upload(coverImage)
      validatedData.cover_image = imageName
    }
    menu.merge(validatedData)
    await menu.save()
    return response.ok({ message: 'Updated successfully' })
  }


  async destroy({ params, auth, response }: HttpContext) {

    const authenticatedUser = auth.user

    const menu = await authenticatedUser?.related('menus')
      .query().where('id', params.id).firstOrFail()
    await deleteFile(menu.cover_image)
    await menu.delete()

    return response.ok({ message: 'Menu deleted successfully' })

  }
}