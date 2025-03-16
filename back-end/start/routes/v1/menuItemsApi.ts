import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MenuItemsController = () => import('#controllers/User/menu_items_controller')

router.delete('menu-items/menuId/:menuId/categoryId/:categoryId/menuItemId/:menuItemId',[MenuItemsController,'destroy'])
.use(middleware.auth())

router.put('menu-items/menuId/:menuId/categoryId/:categoryId/menuItemId/:menuItemId',[MenuItemsController,'update'])
.use(middleware.auth())

router.post('menu-items/menuId/:menuId/categoryId/:categoryId',[MenuItemsController,'store'])
.use(middleware.auth())

router.resource('menu-items',MenuItemsController).except(['destroy','update','store'])
.use('*',middleware.auth())