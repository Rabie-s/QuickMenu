import type { HttpContext } from '@adonisjs/core/http'
import { createMenuItemValidator,updateMenuItemValidator } from '#validators/menu_item'
import { upload, deleteFile } from '../../helpers/helpers.js'


export default class MenuItemsController {
  /**
   * Display a list of menu items for the authenticated user's menus.
   */
  async index({ auth, response }: HttpContext) {
    const authenticatedUser = auth.user


    // Fetch all menus with their categories and associated menu items
    const categories = await authenticatedUser?.related('menus').query().preload('categories', (categoryQuery) => {
      categoryQuery.preload('menuItems')
    })

    return response.ok(categories)

  }

  /**
   * Create a new menu item within a specific category.
   */
  async store({ auth, request, response, params }: HttpContext) {
    const authenticatedUser = auth.user
    const image = request.file('image')
    const validatedData = await request.validateUsing(createMenuItemValidator)
    const imageName = await upload(image)
    validatedData.image = imageName

    const menu = await authenticatedUser?.related('menus').query().where('id', params.menuId).firstOrFail()
    const category = await menu.related('categories').query().where('id', params.categoryId).firstOrFail()
    await category.related('menuItems').create(validatedData)

    return response.created({ message: 'Menu item created successfully' })

  }

  /**
   * Show details of a specific menu item.
   */
  async show({ params, auth, response }: HttpContext) {
    const authenticatedUser = auth.user

    // Ensure the menu item belongs to one of the user's menus
    const menuItem = await authenticatedUser?.related('menus').query()
      .preload('categories', (categoryQuery) => {
        categoryQuery.preload('menuItems', (menuItemQuery) => {
          menuItemQuery.where('id', params.id)
        })
      })
      .firstOrFail()

    // Extract and return the specific menu item
    const foundItem = menuItem.categories.flatMap(cat => cat.menuItems).find(item => item.id === Number(params.id))
    return response.ok(foundItem)

  }

  /**
   * Update an existing menu item.
   */
  async update({ auth, params, request, response }: HttpContext) {
    const authenticatedUser = auth.user

    const validatedData = await request.validateUsing(updateMenuItemValidator)
    const image = request.file('image')

    const menu = await authenticatedUser?.related('menus').query().where('id', params.menuId).firstOrFail()
    const category = await menu.related('categories').query().where('id', params.categoryId).firstOrFail()
    const menuItem = await category.related('menuItems').query().where('id',params.menuItemId).firstOrFail()
    if(image){
      deleteFile(menuItem.image)
      const imageName = await upload(image)
      validatedData.image = imageName 
    }
    
    await menuItem.merge(validatedData).save()

    return response.ok({ message: 'Menu item updated successfully'})

  }

  /**
   * Delete a menu item.
   */
  async destroy({ auth, params, response }: HttpContext) {
    const authenticatedUser = auth.user
    const menu = await authenticatedUser?.related('menus').query().firstOrFail(params.menuId)
    const category = await menu.related('categories').query().firstOrFail(params.categoryId)
    const menuItem = await category.related('menuItems').query().where('id', params.menuItemId).firstOrFail()

    await deleteFile(menuItem.image)
    await menuItem.delete()
    return response.ok({ message: 'Menu item deleted successfully' })

  }
}