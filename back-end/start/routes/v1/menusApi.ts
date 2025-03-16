import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MenuController = () => import('#controllers/User/menus_controller')

//menu router
router.resource('menus',MenuController).use('*',middleware.auth())