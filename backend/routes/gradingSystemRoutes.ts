import express from 'express'
import AuthMiddleware from '../middleware/authMiddleware'
import { type RetrieveGradingSystemRequest } from '../models/types/gradingSystem'
import GradingSystemController from '../controllers/gradingSystemController'

const router = express.Router()

router.get('/gradingSystems', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['teacher']),
    AuthMiddleware.queryParamsMiddleware<RetrieveGradingSystemRequest>, GradingSystemController.retrieveGradingSystems)
router.get('/gradingSystems/:gradingSystemId', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['teacher']), GradingSystemController.retrieveGradingSystem)
router.post('/gradingSystems', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['teacher']), GradingSystemController.submitGradingSystemRequest)
router.post('/gradingSystems/:gradingSystemId/confirm', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['teacher']), GradingSystemController.confirmGradingSystem)

export default router
