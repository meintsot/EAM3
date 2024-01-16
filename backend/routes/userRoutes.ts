import express from 'express'
import UserController from '../controllers/userController'
import AuthMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.post('/auth/register', UserController.registerUser)
router.post('/auth/login', AuthMiddleware.loginJWTRequest, UserController.loginUser)
router.get('/user/history', AuthMiddleware.loginJWTRequest, UserController.RetrieveUserHistory)

export default router
