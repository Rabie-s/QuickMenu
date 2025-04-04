import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import userAuthApiRoutes from './routes/v1/userAuthApi.js'
import menusApiRoutes from './routes/v1/menusApi.js'
import categoriesApiRoutes from './routes/v1/categoriesApi.js'
import menuItemsApiRoutes from './routes/v1/menuItemsApi.js'
router.group(() => {

    userAuthApiRoutes(router)

    router.group(() => {
        menusApiRoutes(router)
        categoriesApiRoutes(router)
        menuItemsApiRoutes(router)
    }).use(middleware.auth())

}).prefix('user/v1')






