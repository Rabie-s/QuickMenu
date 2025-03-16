import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/User/auth_controller')
//user auth routes
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.group(()=>{
    router.post('/me', [AuthController, 'me'])
    router.delete('/logout', [AuthController, 'logout'])
    router.get('test',[AuthController,'test'])
}).use(middleware.auth())
//end auth router
