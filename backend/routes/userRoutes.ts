import express from 'express'
import UserController from '../controllers/userController'
import AuthMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.post('/auth/register', UserController.registerUser)
router.post('/auth/login', AuthMiddleware.loginJWTRequest, UserController.loginUser)
router.put('/user/profile', AuthMiddleware.authenticateJWT, UserController.updateUserProfile)
router.get('/user/history', AuthMiddleware.authenticateJWT, AuthMiddleware.queryParamsMiddleware<PaginationRequest>, UserController.retrieveUserHistory)

export default router
