import type { HttpContext } from '@adonisjs/core/http'
import { createCategoryValidator,updateCategoryValidator } from '#validators/category'
import Category from '#models/category'

export default class CategoriesController {

  async index({ auth }: HttpContext) {
    const authenticatedUser = auth.user

    const menus = await authenticatedUser?.related('menus')
    .query()
    .preload('categories', (query) => {
      query.select('id', 'name')
    })

  const categories = menus.flatMap(menu => menu.categories)

  return categories;
  }


  async store({ auth, request, response }: HttpContext) {
    const authenticatedUser = auth.user
    const validatedData = await request.validateUsing(createCategoryValidator)

    // Find the menu that belongs to the authenticated user
    const menu = await authenticatedUser?.related('menus').query()
      .where('id', validatedData.menuId)
      .firstOrFail()

    // Create the new category under the selected menu
    await menu.related('categories').create(validatedData)

    return response.created({ message: 'Category created successfully' })
  }

  async show({ params, auth, response }: HttpContext) {
    const authenticatedUser = auth.user

    try {
      // Ensure the category belongs to one of the user's menus
      const category = await authenticatedUser?.related('menus').query()
        .preload('categories')
        .whereHas('categories', (query) => {
          query.where('id', params.id)
        })
        .firstOrFail()

      return category
    } catch (error) {
      return response.notFound({ message: 'Category not found.' })
    }
  }


  async update({ auth, params, request, response }: HttpContext) {
    const authenticatedUser = auth.user

    const validatedData = await request.validateUsing(updateCategoryValidator)

    const menu = await authenticatedUser?.related('menus').query()
      .where('id',params.menuId).first()

    const category = await menu.related('categories').query().where('id',params.categoryId).first()

    category.merge(validatedData)
    await category.save()

    return response.ok({ message: 'Category updated successfully' })
  }


  async destroy({ auth, params, response }: HttpContext) {
    const authenticatedUser = auth.user
    // Ensure the category belongs to one of the authenticated user's menus before deleting
    const menu = await authenticatedUser?.related('menus').query().firstOrFail(params.menuId)
    await menu.related('categories').query().where('id',params.categoryId).delete()

/*     const category = await Category.query().where('id',params.categoryId)
    .preload('menu',(menuQuery)=>{
      menuQuery.preload('user',(userQuery)=>{
        userQuery.where('id',authenticatedUser.id)
      })
    }).first() */

    return response.ok({ message: 'Category deleted successfully' })
  }
}
