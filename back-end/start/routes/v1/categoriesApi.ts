import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


const CategoryController = () => import('#controllers/User/categories_controller')

router.delete('categories/menuId/:menuId/categoryId/:categoryId',[CategoryController,'destroy'])
.use(middleware.auth())

router.put('categories/menuId/:menuId/categoryId/:categoryId',[CategoryController,'update'])
.use(middleware.auth())

router.resource('categories',CategoryController).except(['destroy','update'])
.use('*',middleware.auth())