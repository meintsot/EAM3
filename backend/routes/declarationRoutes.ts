import express from 'express'
import AuthMiddleware from '../middleware/authMiddleware'
import { type RetrieveDeclarationsRequest } from '../models/types/declaration'
import DeclarationController from '../controllers/declarationController'

const router = express.Router()

router.get('/declarations', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']),
    AuthMiddleware.queryParamsMiddleware<RetrieveDeclarationsRequest>, DeclarationController.retrieveDeclarations)
router.get('/declarations/:declarationId', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']), DeclarationController.retrieveDeclaration)
router.post('/declarations', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']), DeclarationController.submitDeclarationRequest)
router.put('/declarations/:declarationId/confirm', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']), DeclarationController.confirmDeclaration)

export default router
